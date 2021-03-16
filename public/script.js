/* globals io */

$(document).ready(() => {
  const socket = io()

  socket.emit("get clicks");
  socket.on("got clicks", clicks => {
    $("#timesVisited").text(`This list has been visited ${clicks} times!`)
  });
  
  $("#link").click(() => {
    socket.emit("clicked");
  })
})