const { error } = require("firebase-functions/logger");
const { admin, db } = require("./admin");
const functions = require("firebase-functions/v1");
module.exports = async (req, res, next) => {
  let idToken;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    functions.logger.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:"
    );
    res.status(403).send("Unauthorized");
    return;
  }

  ///
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("no token found");

    return res.status(403).json({ error: "Unauthorized " });
  }

  let decodedToken;
  let userDoc;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    userDoc = await db
      .collection("users")
      .where("userId", "==", decodedToken.uid)
      .limit(1)
      .get();
    req.user.handle = userDoc.docs[0].data().handle;
    req.user.imageUrl = userDoc.docs[0].data().imageUrl;

    return next();
  } catch (error) {
    console.error(error);

    return res.status(403).json({ error: "unauthorized" });
  }

  // admin
  //   .auth()
  //   .verifyIdToken(idToken)
  //   .then((decodedToken) => {
  //     req.user = decodedToken;
  //     console.log(decodedToken);
  //     return db
  //       .collection("users")
  //       .where("userId", "==", req.user.uid)
  //       .limit(1)
  //       .get();
  //   })
  //   .then((data) => {
  //     req.user.handle = data.docs[0].data().handle;
  //     console.log(data);

  //     next();
  //     return;
  //   })
  //   .catch((error) => {
  //     console.error("error while verifying token", error);
  //     return res.status(403).json({ error: "unauthorized last" });
  //   });
};
