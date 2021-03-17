/* globals io */

$(document).ready(() => {
  const socket = io();

  socket.emit("get suggestions");
  socket.on("got suggestions", suggestions => {
    const table = $("#table");

    let rowIndex = 0;
    for (let key in suggestions) {
      if (key == "count") continue;
      let suggestion = suggestions[key];
      rowIndex++;

      let name = suggestion.name;
      let must = suggestion.must;
      let funny = suggestion.funny;
      let commit = suggestion.commit;
      let scary = suggestion.scary;
      let code = suggestion.code;

      let rowData = ["APPROVE/DENY", name, "", "", "", "", code];

      let lastRow = $("<tr/>").appendTo(table.find("tbody:last"));
      $.each(rowData, (colIndex, c) => {
        let newRow;
        if (c != "APPROVE/DENY") {
          newRow = $("<td/>").text(c);
        } else {
          let approveButton = $("<button>Approve</button>");
          let denyButton = $("<button>Deny</button>");

          approveButton.click(() => {
            socket.emit("update suggestion", {
              name,
              status: "approve"
            });
          });

          denyButton.click(() => {
            socket.emit("update suggestion", {
              name,
              status: "deny"
            });
          });

          newRow = $("<td/>").append(approveButton);
          newRow.append(denyButton);
        }

        if (rowIndex % 2 == 0) {
          newRow.addClass("shadow");
        }

        if (colIndex == 2 && must) {
          newRow.addClass("must");
        }
        if (colIndex == 3 && funny) {
          newRow.addClass("funny");
        }
        if (colIndex == 4 && commit) {
          newRow.addClass("commit");
        }
        if (colIndex == 5 && scary) {
          newRow.addClass("scary");
        }

        lastRow.append(newRow);
      });
    }
  });

  socket.on("suggestion denied", name => {
    console.log(name + " has been denied");
  });
  
  socket.on("suggestion approved", name => {
    console.log(name + " has been approved");
  });
  
  var array = [];

$("tr.item input").each(function() {
    array.push({
        name: $(this).attr('class'),
        value: $(this).val()
    });
});

console.log(array);​
});
