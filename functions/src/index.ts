import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp({
  // Insert certificate before deploying
  credential: admin.credential.cert({}),
});

export const removeUser = functions.firestore.document("/users/{uid}")
    .onDelete((snapshot, context) => {
      const authId = snapshot.data().authId
      return admin.auth().deleteUser(authId);
    });
