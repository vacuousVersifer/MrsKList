/* globals io */

$(document).ready(() => {
  const socket = io();

  socket.emit("send log", { log: "test"})

  // // Gets token and page destination
  // let token = localStorage.getItem("token");
  // let destination = sessionStorage.getItem("destination");

  // // Only continue if we are not on the login page
  // if (destination !== "login") {
  //   if (token) {
  //     socket.emit("token verify", token);
  //     socket.on("token verify respond", responce => {
  //       if(responce === -1) {
  //         sessionStorage.setItem("destination", "login");
  //         window.location.replace("/login");
  //       }
  //     });
  //   } else {
  //     sessionStorage.setItem("destination", "login");
  //     window.location.replace("/login");
  //   }
  // }
});
