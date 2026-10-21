import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const emailConfig = {
  apiKey: process.env.REACT_APP_NEWSLETTER_FIREBASE_API_KEY, 
  authDomain: process.env.REACT_APP_NEWSLETTER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_NEWSLETTER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_NEWSLETTER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_NEWSLETTER_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_NEWSLETTER_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_NEWSLETTER_FIREBASE_MEASUREMENT_ID,
};


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const emailApp = initializeApp(emailConfig, "emailApp"); 

// Initialize Firebase
const analytics = getAnalytics(app);
logEvent(analytics, 'app_initialized');

const db = getFirestore(app);
const emaildb = getFirestore(emailApp);

export { db,emaildb };