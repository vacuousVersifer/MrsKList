// Requirements
const dotenv = require("dotenv");

// Constants
dotenv.config();
const PORT = process.env.PORT;

// Database
const { Entries, Users, Suggestions, Tokens } = require("./dbObjects");

// Server
const Server = require("./server"),
      Socket = require("./socket");

const server = new Server(PORT);
const connector = new Socket(server);

server.listen();
server.serveStatic("public");
server.serve("/", "index.html");
server.serve("/login", "login.html");
server.serve("/register", "register.html");

connector.bind("send log", (socket, data) => {
  console.log(`Log from client (${socket.id})\n>> ${data.log}`)
})

connector.connect(socket => {
  console.log(`New connection (${socket.id})`)
})

// // All of the processes external files
// const loginHandler = require("./modules/login.js");
// const tokenHandler = require("./modules/token.js");
// const suggestionHandler = require("./modules/suggestion.js");
// const userHandler = require("./modules/user.js");

// io.on("connection", socket => {
//   socket.on("token verify", token => {
//     // Verifies that a token is valid
//     socket.emit("token verify respond", tokenHandler.process(token, tokens));
//   });

//   socket.on("get entries", () => {
//     // Gets all entries
//     socket.emit("got entries", entries.getItemAll());
//   });

//   socket.on("get suggestions", () => {
//     // Gets all suggestions
//     socket.emit("got suggestions", suggestions.getItemAll());
//   });

//   socket.on("judge suggestion", suggestionUpdate => {
//     // Processes a suggestions judgement
//     socket.emit(
//       "judge suggestion respond",
//       suggestionHandler.judge(
//         suggestionUpdate.name,
//         suggestionUpdate.status,
//         suggestions,
//         entries
//       )
//     );
//   });

//   // Processes a login attempt
//   socket.on("login", credentials => {
//     socket.emit("login respond", loginHandler.process(credentials, users, tokens));
//   });

//   // Current Users: Get
//   socket.on("get user info", token => {
//     let tokenUser = tokenHandler.process(token, tokens);
//     let user = userHandler.getUser(tokenUser.code, users);

//     let info = {
//       type: user.type,
//       code: user.code
//     };

//     socket.emit("get user info respond", info);
//   });

//   // Users: Post
//   socket.on("register user", newCredentials => {
//     let newUser = userHandler.register(newCredentials, users);
//     if(newUser !== -1) {
//       socket.emit("register user completed");
//     } else {
//       socket.emit("register user code taken");
//     }
//   });

//   socket.on("suggestion", suggestion => {
//     suggestions.addItem(suggestion);

//     socket.emit("suggestion respond", true);
//   });
// });

// // Listener
// const listener = server.listen(Port, () => {
//   console.log(`Listening on port ${listener.address().port}`);
// });