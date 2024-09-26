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
const { db, admin } = require("./utils/admin");
const {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} = require("firebase-functions/firestore");

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
exports.createNotificationOnLike = onDocumentCreated(
  "/likes/{id}",
  async (snapShot) => {
    try {
      const screamDoc = await db
        .doc(`/screams/${snapShot.data().screamId}`)
        .get();
      console.log(screamDoc);
      console.log(snapShot.data());

      if (
        screamDoc.exists &&
        screamDoc.data().userHandle !== snapShot.data().userHandle
      ) {
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
  }
);
// exports.createNotificationOnLike = functions.firestore
//   .document("likes/{id}")
//   .onCreate(async (snapShot) => {

//   });

/// delete notification when like and after unlike

// exports.deleteNotificationOnUnlike = functions.firestore
//   .document("likes/{id}")
//   .onDelete(async (snapShot) => {
//     try {
//       db.doc(`/notifications/${snapShot.id}`).delete();
//       return;
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   });

/// create notification on comment

exports.createNotificationOnComment = onDocumentCreated(
  "/comments/{id}",
  async (snapShot) => {
    try {
      const doc = await db.doc(`/screams/${snapShot.data().screamId}`).get();
      if (
        doc.exists &&
        screamDoc.data().userHandle !== snapShot.data().userHandle
      ) {
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
  }
);

// /// change profile image

exports.onUserImageChange = onDocumentUpdated(
  "/users/{userId}",
  async (change) => {
    try {
      console.log(change.before.data());
      console.log(change.after.data());

      if (change.before.data().imageUrl !== change.after.data().imageUrl) {
        console.log("image has changed");

        const batch = db.batch();
        const data = await db
          .collection("screams")
          .where("userHandle", "==", change.before.data().handle)
          .get();
        data.forEach((doc) => {
          const scream = db.doc(`/screams/${doc.id}`);
          batch.update(scream, { imageUrl: change.after.data().imageUrl });
        });
        return await batch.commit();
      }
    } catch (error) {
      console.error(error);
    }
  }
);

/// on scream delete
exports.onScreamDelete = onDocumentDeleted(async (snapShot, context) => {
  try {
    const screamId = context.params.screamId;
    const batch = db.batch();
    // deleting related comment
    const comments = await db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get();
    comments.forEach((doc) => {
      batch.delete(db.doc(`/comments/${doc.id}`));
    });
    // deleting related likes
    const likes = await db
      .collection("likes")
      .where("screamId", "==", screamId)
      .get();
    likes.forEach((doc) => {
      batch.delete(db.doc(`/likes/${doc.id}`));
    });
    const notifications = await db
      .collection("notifications")
      .where("screamId", "==", screamId)
      .get();
    notifications.forEach((doc) => {
      batch.delete(db.doc(`/notifications/${doc.id}`));
    });
    return batch.commit();
  } catch (error) {
    console.error(error);
  }
});
