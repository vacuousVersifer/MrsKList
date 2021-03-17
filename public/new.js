/* globals io */

$(document).ready(() => {
  const socket = io();
  
  const loginLink = $("#loginLink");
  const key = sessionStorage.getItem("key");
  let currentUser;

  if(key) {
    loginLink.text("Logout")

    socket.emit("get current user", key)
  }

  socket.on("got current user", recievedCurrentUser => {
    currentUser = recievedCurrentUser

    if(!currentUser) {
      $("#editBox").text("Please resign in");
    } else if(currentUser.type == "normal") {
      $("#editBox").text("")
      $("#editBox").append("<a href='/suggest'>Suggest an Anime</a>")
    } else if(currentUser.type == "admin") {
      $("#editBox").text("")
      $("#editBox").append("<a href='/suggest'>Suggest an Anime</a>")
      $("#editBox").append("<br>")
      $("#editBox").append("<a href='/review'>Review Suggestions</a>")
    }
  });

  socket.emit("get entries");
  socket.on("got entries", entries => {
    const table = $("#table");

    let rowIndex = 0;
    for (let key in entries) {
      if(key == "count") return;
      let entry = entries[key];
      rowIndex++;

      let progress = entry.watched;
      let name = entry.name;
      let must = entry.must;
      let funny = entry.funny;
      let commit = entry.commit;
      let scary = entry.scary;
      let notes = entry.notes;

      let rowData = [progress, name, "", "", "", "", notes];

      let lastRow = $("<tr/>").appendTo(table.find("tbody:last"));
      $.each(rowData, (colIndex, c) => {
        let newRow = $("<td/>").text(c);
        
        if(rowIndex % 2 == 0) {
          newRow.addClass("shadow");
        }
        
        if(colIndex == 2 && must) {
          newRow.addClass("must");
        } 
        if(colIndex == 3 && funny) {
          newRow.addClass("funny");
        } 
        if(colIndex == 4 && commit) {
          newRow.addClass("commit");
        } 
        if(colIndex == 5 && scary) {
          newRow.addClass("scary");
        } 
        
        lastRow.append(newRow);
      });
    }
  });
});
