const { db } = require("../utils/admin");
//  fetch all scream
exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(screams);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.message });
    });
};
/// add scream
exports.postOneScream = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    imageUrl: req.user.imageUrl,
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      let resScream = newScream;
      resScream.screamId = doc.id;
      return res.json(resScream);
    })
    .catch((error) => {
      console.error("error adding scream ", error);

      return res.status(500).json({ error: error.message });
    });
};

/// fetch one scream
exports.getScream = async (req, res) => {
  let screamData = {};

  try {
    const screamDoc = await db.doc(`screams/${req.params.screamId}`).get();

    if (!screamDoc.exists) {
      return res.status(404).json({ error: "scream not found" });
    }
    screamData = screamDoc.data();
    screamData.screamId = screamDoc.id;
    screamData.comments = [];
    const commentsCol = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .where("screamId", "==", req.params.screamId)
      .get();
    commentsCol.forEach((doc) => {
      screamData.comments.push(doc.data());
    });
    return res.json({ screamData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

///  comment on scream
exports.commentOnScream = async (req, res) => {
  try {
    if (!req.body.body.trim()) {
      return res.status(404).json({ comment: "Must not be empty" });
    }
    const newScream = {
      body: req.body.body,
      createdAt: new Date().toISOString(),
      screamId: req.params.screamId,
      userHandle: req.user.handle,
      imageUrl: req.user.imageUrl,
    };

    const screamRef = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!screamRef.exists) {
      return res.status(404).json({ error: "scream not found" });
    }
    await screamRef.ref.update({
      commentCount: screamRef.data().commentCount + 1,
    });
    await db.collection("comments").add(newScream);
    return res.json(newScream);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

/// like scream
exports.likeScream = async (req, res) => {
  try {
    const likeDocs = await db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("screamId", "==", req.params.screamId)
      .limit(1)
      .get();
    const screamDocs = await db.doc(`/screams/${req.params.screamId}`).get();
    let screamData;
    if (screamDocs.exists) {
      screamData = screamDocs.data();
      screamData.screamId = screamDocs.id;

      if (likeDocs.empty) {
        await db.collection("likes").add({
          screamId: req.params.screamId,
          userHandle: req.user.handle,
        });
        screamData.likeCount++;
        await db
          .doc(`/screams/${req.params.screamId}`)
          .update({ likeCount: screamData.likeCount });
      } else {
        return res.status(404).json({ error: "scream already liked" });
      }
    } else {
      return res.status(404).json({ error: "Scream not found" });
    }

    return res.json(screamData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/// unlike comment
exports.unlikeScream = async (req, res) => {
  try {
    const likeDocs = await db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("screamId", "==", req.params.screamId)
      .limit(1)
      .get();
    const screamDocs = await db.doc(`/screams/${req.params.screamId}`).get();
    let screamData;
    if (screamDocs.exists) {
      screamData = screamDocs.data();
      screamData.screamId = screamDocs.id;

      if (likeDocs.empty) {
        return res.status(404).json({ error: "scream not liked " });
      } else {
        await db.doc(`/likes/${likeDocs.docs[0].id}`).delete();

        screamData.likeCount--;
        await db
          .doc(`/screams/${req.params.screamId}`)
          .update({ likeCount: screamData.likeCount });
      }
    } else {
      return res.status(404).json({ error: "Scream not found" });
    }

    return res.json(screamData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/// delete scream

exports.deleteScream = async (req, res) => {
  const document = await db.doc(`/screams/${req.params.screamId}`).get();
  try {
    if (!document.exists) {
      return res.status(404).json({ error: "scream not found" });
    }
    if (req.user.handle !== document.data().userHandle) {
      return res.status(403).json({ error: "unauthorized" });
    } else {
      await db.doc(`/screams/${req.params.screamId}`).delete();
      const commentDocs = await db
        .collection("comments")
        .where("screamId", "==", req.params.screamId)
        .get();
      // remove also comment
      commentDocs.forEach(async (doc) => {
        await db.doc(`/comments/${doc.id}`).delete();
      });
      // remove also like
      const likeDocs = await db
        .collection("likes")
        .where("screamId", "==", req.params.screamId)
        .get();
      likeDocs.forEach(async (doc) => {
        await db.doc(`/likes/${doc.id}`).delete();
      });
    }
    return res.json({ message: "Scream deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
