const express = require("express");
const functions = require("firebase-functions");
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  uploadImage,
  login,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/user");
const fbAuth = require("./utils/fbAuth");
const { db } = require("./utils/admin");

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
app.get("/scream/:screamId", getScream); // fetch one scream
app.delete("/scream/:screamId", fbAuth, deleteScream); //  delete scream
app.post("/scream/:screamId/comment", fbAuth, commentOnScream); // comment on the scream
app.get("/scream/:screamId/like", fbAuth, likeScream); /// like scream
app.get("/scream/:screamId/unlike", fbAuth, unlikeScream); /// like scream

/// user

app.post("/signup", signup); // ///  sign up
app.post("/user/image", fbAuth, uploadImage); // upload profile image
app.post("/user", fbAuth, addUserDetails); //  add user details
app.get("/user", fbAuth, getAuthenticatedUser); // get authenticated user
app.get("/user/:handle", fbAuth, getUserDetails); /// fetch any user's details
app.post("/notifications", fbAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

/// create notifications on like

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(async (snapShot) => {
    try {
      const screamDoc = await db
        .doc(`/screams/${snapShot.data().screamId}`)
        .get();
      console.log(screamDoc);
      console.log(snapShot.data());

      if (screamDoc.exists) {
        db.doc(`/notifications/${snapShot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: screamDoc.data().userHandle,
          sender: snapShot.data().userHandle,
          type: "like",
          read: false,
          screamId: screamDoc.id,
        });
      }
    } catch (error) {
      console.error("error creating notification on like", error);
      return;
    }
  });

/// delete notification when like and after unlike

exports.deleteNotificationOnUnlike = functions.firestore
  .document("/likes/{id}")
  .onDelete(async (snapShot) => {
    try {
      db.doc(`/notifications/${snapShot.id}`).delete();
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  });

/// create notification on comment

exports.createNotificationOnComment = functions.firestore
  .document("/comments/{id}")
  .onCreate(async (snapShot) => {
    try {
      const doc = await db.doc(`/screams/${snapShot.data().screamId}`).get();
      if (doc.exists) {
        db.doc(`/notifications/${snapShot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: screamDoc.data().userHandle,
          sender: snapShot.data().userHandle,
          type: "comment",
          read: false,
          screamId: doc.id,
        });
      }
    } catch (error) {
      console.error(error);
      return;
    }
  });
