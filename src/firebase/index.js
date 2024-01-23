import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb00ulfJhFaJu0-RRWobAI4ukdgibIUbM",
  authDomain: "blueberry-3a0b0.firebaseapp.com",
  projectId: "blueberry-3a0b0",
  storageBucket: "blueberry-3a0b0.appspot.com",
  messagingSenderId: "34107376140",
  appId: "1:34107376140:web:3579d04eba5d12a1672429",
  measurementId: "G-KMV7DFER8R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage();
export const firestore = getFirestore(app);

export const customRef = (path) => {
  return ref(storage, path);
};

export const uploadImage = (imageName, file) => {
  return uploadBytes(customRef(`images/${imageName}`), file);
};

export const getImageURL = (imageName) => {
  return getDownloadURL(customRef(`images/${imageName}`));
};