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

exports.uploadImage = async (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  let imageFileName;
  let imageToBeUploaded = {};

  const busBoy = new BusBoy({ headers: req.headers });
  busBoy.on("file", (fieldname, file, filename, encoding, mimeType) => {
    log(file);
    log(filename);
    log(mimeType);
    log(encoding);
    log(fieldname);
    const imageExtension = filename.split(".").pop();
    imageFileName = `${Math.round(
      Math.random() * 10000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimeType };

    file.pipe(fs.createWriteStream(filepath));
  });
  busBoy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          contentType: imageToBeUploaded.mimeType,
        },
      })
      .then(() => {
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imgUrl });
      })
      .then(() => {
        return res.status(201).json({ message: "image uploaded successfully" });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ error: "error while uploading an image" });
      });
  });
  busBoy.end(req.rawBody);
};
