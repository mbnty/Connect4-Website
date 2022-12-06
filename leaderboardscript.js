var rowCount = 0;
var playerInfo;
var sorted_leaderboard;
var httpRequest;
var value;
var leaderboard_space = document.getElementById("information");


function putIntoPage() {
    console.log("in putIntoPage");
    httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { // check if the object was properly created
      // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = getFromDB; // we assign a function to the property onreadystatechange (callback function)
    httpRequest.open('GET','get_data_mysql.php');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(); // GET = send with no parameter !
}
  
function getFromDB() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log("server status: "+httpRequest.status);
          console.log("server response: "+httpRequest.responseText);
              playerInfo = JSON.parse(httpRequest.responseText);
              rowCount = playerInfo.length;
              console.log("length of player array: "+rowCount);
              console.log("PLAYER NAME IS: "+playerInfo[0].Name);

              makeTable();
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
      alert('Caught Exception: ' + e.description);
    }
}

function sort_single_column(value) {
    console.log("in sort_single_column");
    httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { // check if the object was properly created
      // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    let choice = "";
    console.log("value is: "+value);

    if(value > 0){
        choice = "DESC";
    }
    else{
        choice = "ASC";
    }

    console.log("Choice is: "+choice);
    fd = new FormData();
    fd.append("order_by", choice);
    fd.append("order", choice)

    httpRequest.onreadystatechange = getFromDB_single; // we assign a function to the property onreadystatechange (callback function)
    httpRequest.open('POST','order_by.php');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(fd);
}
  
function getFromDB_single() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log("server status: "+httpRequest.status);
          console.log("server response: "+httpRequest.responseText);
              sorted_leaderboard = JSON.parse(httpRequest.responseText);
              rowCount = sorted_leaderboard.length;
              console.log("length of player array: "+rowCount);
              console.log("PLAYER NAME IS: "+sorted_leaderboard[0].Name);
              updateTable();
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
      alert('Caught Exception: ' + e.description);
    }
}

function updateTable(){
    console.log("I'M IN MAKE TABLE");
    var table = document.getElementById("leaderboard");

    table.innerHTML = "";
    var row;
    var cell;
    for(let item of sorted_leaderboard){
        row = document.createElement("tr");
        for(let field in item){
            cell = document.createElement("td");
            cell.innerText = item[field];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    leaderboard_space.appendChild(table);
}

function makeTable(){
    console.log("I'M IN MAKE TABLE");
    var table = document.getElementById("leaderboard");

    table.innerHTML = "";
    var row;
    var cell;
    for(let item of playerInfo){
        row = document.createElement("tr");
        for(let field in item){
            cell = document.createElement("td");
            cell.innerText = item[field];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    leaderboard_space.appendChild(table);
}


function flip(header_column){
    //default sort on desc
    console.log("INSIDE FLIP: " + header_column);
    let flipflop = header_column * -1; //switch between desc or asc
        if(flipflop == -1 || flipflop == 1){
            console.log(flipflop);
            sort_single_column(flipflop);
        }
        if(flipflop == -2 || flipflop == 2){
            console.log(flipflop);
            sort_single_column(flipflop);
        }
        if(flipflop == -2 || flipflop == 2){
            console.log(flipflop);
            sort_single_column(flipflop);
        }
        if(flipflop == -2 || flipflop == 2){
            console.log(flipflop);
            sort_single_column(flipflop);
        }
}


putIntoPage();