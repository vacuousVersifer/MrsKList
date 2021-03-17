/* globals io */

$(document).ready(() => {
  const socket = io();
  
  const loginLink = $("#loginLink");
  const key = sessionStorage.getItem("key");
  if(key) {
    loginLink.text("Logout")

    socket.emit("get current user", key)
  }

  socket.on("got current user", currentUser => console.log(currentUser));

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
