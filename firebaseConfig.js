// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collectManifestSchemes } from "expo-linking";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCraYgO-hYJflhZgAOcacLKq_0SR8ffMDQ",
  authDomain: "kafchat.firebaseapp.com",
  projectId: "kafchat",
  storageBucket: "kafchat.appspot.com",
  messagingSenderId: "642336281966",
  appId: "1:642336281966:web:19b6fed8a8daf7857f9d7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const userRef = collection(db, 'user');
export const roomRef = collection(db, 'rooms');