/* globals io */

// When the document is loaded
$(document).ready(() => {
  const socket = io();

  // Login elements
  const loginForm = $("#loginForm");
  const loginCode = $("#loginCode");
  const loginPassword = $("#loginPassword");

  // When the user submits the login form
  loginForm.submit(e => {
    e.preventDefault();

    // Wrap the submitted credentials into an object
    let submittedCredentials = {
      code: loginCode.val(),
      password: loginPassword.val()
    };

    // Clears the form
    loginCode.val("");
    loginPassword.val("");

    // Submits to the server
    socket.emit("login", submittedCredentials);
  });

  socket.on("login respond", results => {
    let found = results.found;
    let token = results.token;

    if (found) {
      localStorage.setItem("token", token);
      window.location.replace("/");
    } else {
      $("#loginError").text("Sorry, those credentials are invalid!");
    }
  });
});
