const express = require("express");
const functions = require("firebase-functions");
const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, uploadImage, login } = require("./handlers/user");
const fbAuth = require("./utils/fbAuth");

const app = express();

/// helper  functions

// const isEmail = (email) => {
//   const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (email.match(Regex)) {
//     return true;
//   } else {
//     return false;
//   }
// };
// const isEmpty = (string) => {
//   if (string.trim() === "") {
//     return true;
//   } else {
//     return false;
//   }
// };
// screams
app.get("/screams", getAllScreams);
app.post("/scream", fbAuth, postOneScream);
// ///user
app.post("/signup", signup);
app.post("/user/image", fbAuth, uploadImage);

exports.api = functions.https.onRequest(app);
