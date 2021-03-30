// Server setup
const express = require("express"),
  app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Enviromental Constants
const dotenv = require("dotenv");
dotenv.config();

const Port = process.env.PORT;

const EntriesPath = process.env.ENTRIES_PATH;
const UsersPath = process.env.USERS_PATH;
const SuggestionsPath = process.env.SUGGESTIONS_PATH;
const TokensPath = process.env.TOKENS_PATH;

// Listener
const listener = server.listen(Port, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

// Static Files
app.use(express.static("public"));

// Serves all the pages
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.get("/:path", (req, res) => {
  res.sendFile(`${__dirname}/views/${req.params.path}.html`);
});

// Databases
let DB = require("./modules/db.js");

let entries = new DB(EntriesPath);
let users = new DB(UsersPath);
let suggestions = new DB(SuggestionsPath);
let tokens = new DB(TokensPath);

// All of the processes external files
const loginHandler = require("./modules/login.js");
const tokenHandler = require("./modules/token.js");
const suggestionHandler = require("./modules/suggestion.js");
const userHandler = require("./modules/user.js");

io.on("connection", socket => {
  socket.on("token verify", token => {
    // Verifies that a token is valid
    socket.emit("token verify respond", tokenHandler.process(token, tokens));
  });

  socket.on("get entries", () => {
    // Gets all entries
    socket.emit("got entries", entries.getItemAll());
  });

  socket.on("get suggestions", () => {
    // Gets all suggestions
    socket.emit("got suggestions", suggestions.getItemAll());
  });

  socket.on("judge suggestion", suggestionUpdate => {
    // Processes a suggestions judgement
    socket.emit(
      "judge suggestion respond",
      suggestionHandler.judge(
        suggestionUpdate.name,
        suggestionUpdate.status,
        suggestions,
        entries
      )
    );
  });

  // Processes a login attempt
  socket.on("login", credentials => {
    socket.emit("login respond", loginHandler.process(credentials, tokens));
  });

  // Current Users: Get
  socket.on("get user info", token => {
    let tokenUser = tokenHandler.process(token, tokens);
    let user = userHandler.getUser(tokenUser.code, users);

    let info = {
      type: user.type,
      code: user.code
    };

    socket.emit("get user info respond", info);
  });

  // Users: Post
  socket.on("register user", newCredentials => {
    let newUser = userHandler.register(newCredentials, users);
    console.log(newUser);
    if(newUser !== -1) {
      socket.emit("register user completed");
    } else {
      socket.emit("register user code taken");
    }
  });

  socket.on("suggestion", suggestion => {
    suggestions.addItem(suggestion);

    socket.emit("suggestion respond", true);
  });
});