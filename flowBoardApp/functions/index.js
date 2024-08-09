const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

initializeApp();

exports.createBoardData = onDocumentCreated(
  "users/{ui}/boards/{boardId}",
  async (event) => {
    const { uid, boardId } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
      tabs: {
        toDos: [],
        inProgress: [],
        completed: [],
      },
      lastUpdated: FieldValue.serverTimestamp(),
    });
  }
);
