import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdcheEJXyyljN-edYZ5lVVErtTR0Jo9UA",
  authDomain: "file-upload-bf102.firebaseapp.com",
  projectId: "file-upload-bf102",
  storageBucket: "file-upload-bf102.appspot.com",
  messagingSenderId: "756842589942",
  appId: "1:756842589942:web:08c4315593e2c5e97086d7",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;
