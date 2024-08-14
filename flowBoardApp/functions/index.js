const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");

initializeApp();

exports.createBoardData = onDocumentUpdated(
  "boards/{boardId}",
  async (event) => {
    const { boardId } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`boardsData/${boardId}`).set({
      tabs: {
        toDos: [],
        inProgress: [],
        completed: [],
      },
      lastUpdated: FieldValue.serverTimestamp(),
      boardId: boardId,
    });
  }
);
