/* globals io */

$(document).ready(() => {
  const socket = io();

  const loginLink = $("#loginLink");
  const editBox = $("#editBox");

  let token = localStorage.getItem("token");
  
  loginLink.text("Logout");
  socket.emit("get user info", token);
  socket.on("get user info respond", user => {
    switch(user.type) {
    case "normal":
      editBox.text("").append("<a href='/suggest'>Suggest an Anime</a>");
      break;
    case "admin":
      editBox.text("").append("<a href='/suggest'>Suggest an Anime</a><br><a href='/review'>Review Suggestions</a>");
      break;
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
      let must = entry.types.must;
      let funny = entry.types.funny;
      let commit = entry.types.commit;
      let scary = entry.types.scary;
      let adult = entry.types?.adult;
      let romance = entry.types?.romance;

      let rowData = [progress, name, "", "", "", "", "", ""];

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
        if(colIndex == 6 && adult) {
          newRow.addClass("adult");
        } 
        if(colIndex == 7 && romance) {
          newRow.addClass("romance");
        } 
        
        lastRow.append(newRow);
      });
    }
  });
});
