const socketio = require("socket.io");

module.exports = class Socket {
  constructor(server) {
    this.server = server;
    this.io = socketio(this.server.httpServer);

    this.bindings = [];
  }

  bind(inPhrase, clbk) {
    const newBind = {
      inPhrase,
      clbk
    }

    this.bindings.push(newBind);
  }

  connect(clbk, disconnectClbk) {
    this.io.on("connection", socket => {
      clbk(socket);

      for(let i = 0; i < this.bindings.length; i++) {
        const { inPhrase, clbk } = this.bindings[i]
        
        socket.on(inPhrase, data => clbk(socket, data))
      }
    });
  }
}