const { Composer, Scene, Stage, log, session } = require("micro-bot");
const {
  addArticle,
  createAccount,
  currentUser,
  initializeFirebase,
  labels,
  signIn
} = require("./src/firebase.js");

initializeFirebase();

// Firebase Username Scene
const firebaseUsernameScene = new Scene("firebaseUsername");
firebaseUsernameScene.enter(({ reply }) => reply("Hey, shoot me your email!"));
firebaseUsernameScene.on("message", ({ message, scene, session }) => {
  session.email = message.text;
  scene.enter("firebasePassword");
});
// firebaseUsernameScene.leave(({ reply }) => reply("Left username scene."));

// Firebase Password Scene
const firebasePasswordScene = new Scene("firebasePassword");
firebasePasswordScene.enter(({ reply }) => reply("And give me a password!"));
firebasePasswordScene.on("message", ({ message, reply, scene, session }) => {
  firebaseFunction =
    (session.command === signupCommandString && createAccount) ||
    (session.command === signinCommandString && signIn);

  firebaseFunction({
    email: session.email,
    password: message.text
  }).then(r => reply(r));

  scene.leave();
});
// firebasePasswordScene.leave(({ reply }) => reply("Left password scene."));

// Create and register the firebase setup scenes.
const stage = new Stage();
stage.register(firebaseUsernameScene);
stage.register(firebasePasswordScene);

// Give the bot all it needs.
const bot = new Composer();
bot.use(log());
bot.use(session());
bot.use(stage.middleware());

// Command names.
const signupCommandString = "signup";
const signinCommandString = "signin";

// Commands.
bot.command("labels", ({ reply }) => reply(labels()));
bot.command(signupCommandString, ({ scene, session }) => {
  session.command = signupCommandString;
  scene.enter("firebaseUsername");
});
bot.command(signinCommandString, ({ scene, session }) => {
  session.command = signinCommandString;
  scene.enter("firebaseUsername");
});
bot.command("username", ({ reply, session }) => reply(session.email));
bot.command("user", ({ reply }) =>
  reply(currentUser() ? "You're signed in." : "No user found.")
);

// Enter the scene of signing up in firebase when starting the bot.
bot.start(({ scene }) => {
  scene.enter("firebaseUsername");
});

bot.hears(/https:\/\//, ({ reply, message }) => {
  const [link, ...labels] = message.text.split(" ");
  addArticle({ message: link, labels });
  reply(link);
});

module.exports = bot;
