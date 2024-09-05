const express = require("express");
const functions = require("firebase-functions");
const {
  getAllScreams,
  postOneScream,
  getScream,
} = require("./handlers/screams");
const {
  signup,
  uploadImage,
  login,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/user");
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
app.get("/screams", getAllScreams); //  get all scream
app.post("/scream", fbAuth, postOneScream); //  add one scream
app.get("/scream/:screamId", getScream);
/// user

app.post("/signup", signup); // ///  sign up
app.post("/user/image", fbAuth, uploadImage); // upload profile image
app.post("/user", fbAuth, addUserDetails); //  add user details
app.get("/user", fbAuth, getAuthenticatedUser); // get authenticated user
exports.api = functions.https.onRequest(app);
