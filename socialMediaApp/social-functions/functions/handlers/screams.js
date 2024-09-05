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
  // console.log(req);

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` });
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
      return res.json({ screamData });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
