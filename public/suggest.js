// /* globals io */

// $(document).ready(() => {
//   const socket = io();

//   const suggestResponce = $("#suggestResponce");

//   let token = localStorage.getItem("token");
//   let user;

//   socket.emit("get user info", token);
//   socket.on("get user info respond", userInfo => {
//     user = userInfo;
//   });

//   // Suggestion Input
//   const suggestForm = $("#suggestForm");
//   const suggestName = $("#suggestName");
//   const suggestMust = $("#suggestMust");
//   const suggestFunny = $("#suggestFunny");
//   const suggestCommit = $("#suggestCommit");
//   const suggestScary = $("#suggestScary");
//   const suggestAdult = $("#suggestAdult");
//   const suggestRomance = $("#suggestRomance");


//   suggestForm.submit(e => {
//     e.preventDefault();

//     let name = suggestName.val();
//     let must = suggestMust.is(":checked");
//     let funny = suggestFunny.is(":checked");
//     let commit = suggestCommit.is(":checked");
//     let scary = suggestScary.is(":checked");
//     let adult = suggestAdult.is(":checked");
//     let romance = suggestRomance.is(":checked");

//     let suggestion = {
//       name,
//       types: {
//         must,
//         funny,
//         commit,
//         scary,
//         adult,
//         romance
//       }, 
//       code: user.code,
//       watched: "Not started"
//     };

//     socket.emit("suggestion", suggestion);
//   });

//   socket.on("suggestion respond", result => {
//     if (result) {
//       suggestResponce.text("The show/anime has been suggested, and will hopefully appear shortly!");
//     } else {
//       $("#loginError").text("Something went wrong! File an issue (See main page for a how to on that)");
//     }
//   });
// });
