var firebase = require("firebase");
const firebaseconfig = require("./firebaseconfig.js");

var firebaseLabels = [];

exports.initializeFirebase = () => firebase.initializeApp(firebaseconfig);

const linkLabels = () =>
  firebase
    .database()
    .ref(`users/${this.currentUser().uid}/labels`)
    .on("value", snapshot => {
      if (snapshot.val()) {
        firebaseLabels = Object.values(snapshot.val());
      }
    });

exports.labels = () => firebaseLabels;

exports.createAccount = ({ email, password }) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(_ => linkLabels())
    .then(r => "Account created succeeded.")
    .catch(e => e.message);

exports.signIn = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(_ => linkLabels())
    .then(r => "You signed in successfully.")
    .catch(e => e.message);

exports.currentUser = () => firebase.auth().currentUser;

exports.addArticle = ({ date, labels = [], message, title }) => {
  var user = firebase.auth().currentUser;
  const userPath = `users/${user.uid}`;
  const articlesPath = `/articles`;
  const labelsPath = `/labels`;

  // Get a new unique key for the article.
  var newPostKey = firebase
    .database()
    .ref(userPath + articlesPath)
    .push().key;

  const updates = {};
  const articleUpdate = { url: message, labels: {}, date, title };

  // Create the labels that do not exist in the DB yet.
  labels
    .filter(label => !firebaseLabels.includes(label))
    .map(label => ({
      label,
      labelKey: firebase
        .database()
        .ref(userPath + labelsPath)
        .push().key
    }))
    .forEach(labelObject => {
      updates[`${labelsPath}/${labelObject.labelKey}`] = labelObject.label;
    });

  // Put the labels in the article object.
  labels.forEach(l => (articleUpdate["labels"][l] = true));
  updates[`${articlesPath}/${newPostKey}`] = articleUpdate;

  return firebase
    .database()
    .ref(userPath)
    .update(updates);
};
