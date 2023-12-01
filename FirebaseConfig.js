import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2x31PMyjB2wTchBPQbT8EIKyPOa3HhlY",
  authDomain: "gigtrack-83799.firebaseapp.com",
  projectId: "gigtrack-83799",
  storageBucket: "gigtrack-83799.appspot.com",
  messagingSenderId: "641190212518",
  appId: "1:641190212518:web:0a0ed79fe2f9f84e301567",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
