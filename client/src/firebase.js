import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9sHY4ueMlgWz-44gQEXscvjnJh9kt_Tg",
    authDomain: "simple100-site.firebaseapp.com",
    projectId: "simple100-site",
    storageBucket: "simple100-site.appspot.com",
    messagingSenderId: "891654696846",
    appId: "1:891654696846:web:b83f06e717bbe524003edf"
};


firebase.initializeApp(firebaseConfig);

export default firebase;