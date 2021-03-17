const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const dotenv = require("dotenv");
dotenv.config();

const Port = process.env.PORT;
const SecretKey = process.env.SECRET_KEY;
const EntriesPath = process.env.ENTRIES_PATH;
const UsersPath = process.env.USERS_PATH;

const listener = server.listen(Port, () => {
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
let entries = JSON.parse(fs.readFileSync(EntriesPath, "utf-8"));
let users = JSON.parse(fs.readFileSync(UsersPath, "utf-8"));

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

      let decryptedPassword = decrypt({content: user.password, iv: user.id});
      
      let codeCorrect = (credentials.code == user.code);
      let passwordCorrect = (credentials.password == decryptedPassword);
      
      if(codeCorrect && passwordCorrect) {
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
    let hash = encrypt(newCredentials.password);
    let newUser = {
      name: newCredentials.name,
      code: newCredentials.code,
      password: hash.content,
      id: hash.iv
    };

    users.count++;
    users[users.count] = newUser;
    fs.writeFileSync(UsersPath, JSON.stringify(users, null, 2));
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

const Algorithm = process.env.ALGORITHM;

function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(Algorithm, SecretKey, iv);

  let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex")
  };
};

function decrypt(hash) {
    let decipher = crypto.createDecipheriv(Algorithm, SecretKey, Buffer.from(hash.iv, "hex"));

    let decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);

    return decrpyted.toString();
};