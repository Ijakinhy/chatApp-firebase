const { db } = require("../utils/admin");

exports.getAllScreams = (req, res) => {
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
};

exports.postOneScream = (req, res) => {
  // console.log(req);

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((error) => {
      console.error("error adding scream ", error);

      return res.status(500).json({ error: error.message });
    });
};
