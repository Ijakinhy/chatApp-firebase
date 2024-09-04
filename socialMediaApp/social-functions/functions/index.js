const express = require("express");
const functions = require("firebase-functions");
const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup } = require("./handlers/user");

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

app.get("/screams", getAllScreams);

//   let idToken;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     idToken = req.headers.authorization.split("Bearer ")[1];
//   } else {
//     console.error("no token found");

//     return res.status(403).json({ error: "Unauthorized" });
//   }

//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       req.user = decodedToken;
//       console.log(decodedToken);
//       return db
//         .collection("users")
//         .where("userId", "==", req.user.uid)
//         .limit(1)
//         .get();
//     })
//     .then((data) => {
//       req.user.handle = data.docs[0].data().userHandle;
//       return next();
//     })
//     .catch((error) => {
//       console.error("error while verifying token", error);
//       return res.status(403).json({ error: "unauthorized" });
//     });
// };

app.post("/scream", postOneScream);

app.post("/signup", signup);

exports.api = functions.https.onRequest(app);
