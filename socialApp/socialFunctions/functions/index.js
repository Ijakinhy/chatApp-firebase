const express = require("express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = express();
const firebaseConfig = {
  apiKey: "AIzaSyC9oXhUophuGGoLOnKo8U8jvt_8TRcaWTs",
  authDomain: "social-media-app-ijakinhy.firebaseapp.com",
  projectId: "social-media-app-ijakinhy",
  storageBucket: "social-media-app-ijakinhy.appspot.com",
  messagingSenderId: "667272735323",
  appId: "1:667272735323:web:7f02f0e5ec742f8cb06d7e",
};
admin.initializeApp(firebaseConfig);

const db = admin.firestore();

db.settings({
  host: "localhost:",
  ssl: false,
});
app.get("/screams", (req, res) => {
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
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
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
});

exports.api = functions.https.onRequest(app);
