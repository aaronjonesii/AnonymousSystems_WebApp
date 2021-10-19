import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
export const addPostID = functions.firestore
.document('posts/{postID}')
.onCreate((snapshot, context) => {
    if (snapshot.data()) {
      let updates = { date_added: Date.now(), id: context.params.postID }
      return admin.firestore().doc(`posts/${context.params.postID}`).update(updates)
    } else { return null }
  })


// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

