const express  = require("express"),
      http     = require("http");

module.exports = class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.httpServer = http.createServer(this.app);
  }

  listen() {
    this.listener = this.httpServer.listen(this.port, () => {
      console.log(`Listening on port ${this.listener.address().port}`)
    })
  }

  serveStatic(path) {
    this.app.use(express.static(path));
  }

  serve(path, file) {
    this.app.get(path, (req, res) => {
      res.sendFile(`${__dirname}/views/${file}`);
    });
  }
}