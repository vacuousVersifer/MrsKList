/* globals io */

$(document).ready(() => {
  const socket = io();
  
  // Login
  const loginForm = $("#loginForm");
  const loginUsername = $("#loginUsername");
  const loginPassword = $("#loginPassword");
  
  // Register
  const registerForm = $("#registerForm");
  const registerName = $("#registerName")
  const registerUsername = $("#registerUsername");
  const registerPassword = $("#registerPassword");
  const registerPasswordConfirmm = $("registerPasswordConfirm");
  
  loginForm.submit(e => {
    e.preventDefault();
    
    let submittedCredentials = {
      username: loginUsername.val(),
      password: loginPassword.val()
    };
    
    loginUsername.val("");
    loginPassword.val("");
    
    socket.emit("login attempt", submittedCredentials)
  })
  
  socket.on("login respond", results => {
    let result = results.result;
    let key = results.key;
    
    if(result) {
      sessionStorage.setItem("key", key);
      window.location.replace("/new");
    } else {
      $("#loginError").text("Sorry, those credentials are invalid!")
    }
  })
  
  registerForm.submit(e => {
    e.preventDefault();
  })
});
