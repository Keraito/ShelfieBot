var firebase = require("firebase");
const firebaseconfig = require("../firebaseconfig.js");

exports.initializeFirebase = () => firebase.initializeApp(firebaseconfig);

exports.createAccount = ({ email, password }) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(r => "User Creation Succeeded")
    .catch(e => e.message);

exports.signIn = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(r => "You signed in successfully!")
    .catch(e => e.message);

exports.currentUser = () => firebase.auth().currentUser;

exports.addArticle = ({ message }) => {
  var user = firebase.auth().currentUser;
  var newPostKey = firebase
    .database()
    .ref(`articles/${user.uid}`)
    .push().key;

  return firebase
    .database()
    .ref(`articles/${user.uid}/${newPostKey}`)
    .update({ url: message });
};
