const { allowedNodeEnvironmentFlags } = require("process");
const { db, admin } = require("../utils/admin");
const {
  validateSignupData,
  reduceUserDetails,
} = require("../utils/validators");
const { firebaseConfig } = require("../utils/config");
const { log } = require("console");

exports.signup = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  try {
    const defaultImg = "default.jpeg";
    const { errors, valid } = validateSignupData(newUser);
    if (valid) {
      return res.status(400).json(errors);
    }
    const doc = await db.doc(`/users/${newUser.handle}`).get();
    if (doc.exists) {
      return res.status(400).json({ handle: "This handle is already taken" });
    } else {
      const userCredentials = await admin
        .auth()
        .createUser({ email: newUser.email, password: newUser.password });

      db.doc(`/users/${newUser.handle}`).set({
        email: userCredentials.email,
        handle: req.body.handle,
        createdAt: new Date().toISOString(),
        userId: userCredentials.uid,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${defaultImg}?alt=media`,
      });
      let customToken = await admin
        .auth()
        .createCustomToken(userCredentials.uid);
      return res.status(201).json({ token: customToken });
    }
  } catch (error) {
    console.error("error during signup");
    return res.status(500).json({ error: error.message });
  }
};

// add user details
exports.addUserDetails = async (req, res) => {
  try {
    const userDetails = reduceUserDetails(req.body);
    await db.doc(`/users/${req.user.handle}`).update(userDetails);
    return res.status(201).json({ message: "details added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// get any user's details

exports.getUserDetails = async (req, res) => {
  try {
    let userData = {};
    const userDoc = await db.doc(`/users/${req.params.handle}`).get();

    if (userDoc.exists) {
      userData.user = userDoc.data();
      userData.screams = [];
      const userScream = await db
        .collection("screams")
        .where("userHandle", "==", req.params.handle)
        .orderBy("createdAt", "desc")
        .get();
      userScream.forEach((doc) => {
        userData.screams.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id,
        });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

/// get own user credentials
exports.getAuthenticatedUser = async (req, res) => {
  const userData = {};

  try {
    const userRef = await db.doc(`/users/${req.user.handle}`).get();
    if (userRef.exists) {
      userData.credentials = userRef.data();
    }
    userData.likes = [];
    const likeRef = await db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .get();
    if (likeRef.exists) {
      likeRef.forEach((doc) => {
        userData.likes.push(doc.data());
      });
    }

    const notRef = await db
      .collection("notifications")
      .where("recipient", "==", req.user.handle)
      .orderBy("createdAt", "desc")
      .get();

    userData.notifications = [];
    notRef.forEach((doc) => {
      userData.notifications.push({
        createdAt: doc.data().createdAt,
        recipient: doc.data().recipient,
        sender: doc.data().sender,
        type: doc.data().type,
        read: doc.data().read,
        screamId: doc.data().screamId,
        notificationId: doc.id,
      });
    });
    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
// upload user profile image
exports.uploadImage = (req, res) => {
  const busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const bb = busboy({ headers: req.headers });
  let imageFileName;
  let imageToBeUploaded = {};
  let imageExtension;
  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    if (mimeType !== "image/jpeg" || mimeType !== "image/png") {
      return res.status(400).json({ error: "wrong image type submitted" });
    }
    imageExtension = filename.split(".").pop();
    imageFileName = `${Math.round(
      Math.random() * 1000000000
    )}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimeType };
    file.pipe(fs.createWriteStream(filePath));
  });

  bb.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            "Content-Type": imageToBeUploaded.mimeType,
          },
        },
      })
      .then(() => {
        const bucket = admin.storage().bucket(firebaseConfig.storageBucket);
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        res.status(201).send({ message: "Image uploaded successfully" });
      })
      .catch((error) => {
        console.error("error uploading image", error);
        res.status(500).json({ error: error.message });
      });
  });
  bb.end(req.rawBody);
};

/// mark notification read

exports.markNotificationsRead = (req, res) => {
  const butch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notification/${notificationId}`);
    butch.update(notification, { read: true });
  });
  butch
    .commit()
    .then(() => {
      return res.json({ message: "notification marked read" });
    })
    .catch(() => {
      console.error(error);
      return res.status(500).json({ error: error.message });
    });
};
