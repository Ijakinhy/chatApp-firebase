const { allowedNodeEnvironmentFlags } = require("process");
const { db, admin } = require("../utils/admin");
const { validateSignupData } = require("../utils/validators");
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
