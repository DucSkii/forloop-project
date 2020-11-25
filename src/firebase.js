import firebase from "firebase"

firebase.initializeApp({
  apiKey: "AIzaSyBwsscvgdE6jkrH96EYiMcqGLn3Fu9nlN0",
  authDomain: "forloop-project.firebaseapp.com",
  databaseURL: "https://forloop-project.firebaseio.com",
  projectId: "forloop-project",
  storageBucket: "forloop-project.appspot.com",
  messagingSenderId: "139990358964",
  appId: "1:139990358964:web:e63c4fda46c232953070e1",
  measurementId: "G-PN3RL729VC"
})

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }