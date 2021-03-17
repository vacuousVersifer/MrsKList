/* globals io */

$(document).ready(() => {
  const socket = io();
  
  // Login
  const loginForm = $("#loginForm");
  const loginCode = $("#loginCode");
  const loginPassword = $("#loginPassword");
  
  // Register
  const registerForm = $("#registerForm");
  const registerName = $("#registerName")
  const registerCode = $("#registerCode");
  const registerPassword = $("#registerPassword");
  const registerPasswordConfirm = $("#registerPasswordConfirm");
  
  loginForm.submit(e => {
    e.preventDefault();
    
    let submittedCredentials = {
      code: loginCode.val(),
      password: loginPassword.val()
    };
    
    loginCode.val("");
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
  
  let submittedCredentials
  
  registerForm.submit(e => {
    e.preventDefault();

    $("#registerError").text("");

    let code = registerCode.val();
    let password = registerPassword.val();
    let passwordConfirm = registerPasswordConfirm.val();
    let name = registerName.val();

    let codeValid = true;
    let passwordValid = (password == passwordConfirm);
    let nameValid = (!name.length < 1);

    if(!nameValid) {
      $("#registerError").text("You must enter a value for your name");
    }

    if(!(password && passwordConfirm)) {
      $("#registerError").text("You must enter values for your passwords");
    }

    if(!passwordValid) {
      $("#registerError").text("Your passwords do not match");
    }

    for(let i = 0; i < code.length; i++) {
      if(!Number.isInteger(parseInt(code[i]))) codeValid = false;
    }

    if(!codeValid) {
      $("#registerError").text("Your code should be a continuous string of numbers, with no spaces");
    }

    if(code.length < 1) {
      codeValid = false;
      $("#registerError").text("You need to enter something for your code");
    }

    if(codeValid && passwordValid && nameValid) {
      let newCredentials = {
        code,
        password,
        name
      }

      submittedCredentials = {
        code,
        password
      };

      registerCode.val("");
      registerPassword.val("");
      registerPasswordConfirm.val("");
      registerName.val("");

      socket.emit("register user", newCredentials)
    }
  })
  
  socket.on("register user completed", () => {
    socket.emit("login attempt", submittedCredentials)
  })
  
  socket.on("register user code taken", () => {
    $("#registerError").text("That code is already taken!");
  })
});
