import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

let app;

const credentials = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });
}

const adminDb = initFirestore({
  credential: admin.credential.cert(credentials),
});

const adminAuth = admin.auth(app);

export { adminDb, adminAuth };