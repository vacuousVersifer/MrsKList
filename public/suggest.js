/* globals io */

$(document).ready(() => {
  const socket = io();

  const suggestResponce = $("#suggestResponce");

  const key = sessionStorage.getItem("key");

  if (key) {
    socket.emit("get current user", key);
  }

  let currentUser;
  socket.on("got current user", recievedCurrentUser => {
    currentUser = recievedCurrentUser;

    if (!currentUser) {
      suggestResponce.text("You must login first!");
    }
  });

  // Suggestion Input
  const suggestForm = $("#suggestForm");
  const suggestName = $("#suggestName");
  const suggestMust = $("#suggestMust");
  const suggestFunny = $("#suggestFunny");
  const suggestCommit = $("#suggestCommit");
  const suggestScary = $("#suggestScary");

  suggestForm.submit(e => {
    e.preventDefault();

    let name = suggestName.val();
    let must = suggestMust.is(":checked");
    let funny = suggestFunny.is(":checked");
    let commit = suggestCommit.is(":checked");
    let scary = suggestScary.is(":checked");

    let suggestion = {
      name,
      must,
      funny,
      commit,
      scary,
      code: currentUser.code
    };

    if (currentUser) {
      socket.emit("suggestion", suggestion);
    }
  });

  socket.on("suggestion respond", result => {
    if (result) {
      suggestResponce.text("The anime has been suggested, and will hopefully appear shortly!");
    } else {
      $("#loginError").text("Something went wrong! File an issue (See main page for a how too on that)");
    }
  });
});
