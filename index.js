const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const listener = server.listen(4130, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.get("/new", (req, res) => {
  res.sendFile(`${__dirname}/views/new.html`);
});
app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/views/login.html`);
});

const fs = require("fs");
const crypto = require("crypto");

let currentUsers = [];

let clicks = parseInt(fs.readFileSync("clicks.txt", "utf-8"), 10);
let entries = JSON.parse(fs.readFileSync("entries.json", "utf-8"));
let users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

// let newEntry = {
//   name: "Attack on Titan",
//   watched: "NOT_STARTED",
//   types: {
//     must: true,
//     funny: false,
//     commit: false,
//     scary: true
//   },
//   notes: "(Weird huge titans attack a city? Idk, another cousin watches this)"
// };

// entries.count++
// entries[entries.count] = newEntry;

// fs.writeFileSync("./entries.json", JSON.stringify(entries, null, 2))

io.on("connection", socket => {
  console.log(`User ${socket.id} has connected`);
  currentUsers.push({ id: socket.id });

  socket.on("get clicks", () => {
    socket.emit("got clicks", clicks);
  });

  socket.on("clicked", () => {
    clicks++;
    fs.writeFileSync("clicks.txt", clicks);
  });
  
  socket.on("get entries", () => {
    socket.emit("got entries", entries)
  });
  
  socket.on("login attempt", credentials => {
    let found = false;
    for(let i = 1; i <= users.count; i++) {
      let user = users[i];
      
      if(credentials.username == user.code && credentials.password == user.password) {
        found = true;
      }
    }
    
    crypto.randomBytes(48, (err, buffer) => {
      let results = {
        result: found,
        key: buffer.toString("hex")
      }
      
      socket.emit("login respond", results)
    })
  });

  socket.on("register user", newCredentials => {
    console.log(newCredentials);
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has disconnected`);
    for (let i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i].id == socket.id) {
        currentUsers.splice(i, 1);
      }
    }
  });
});
