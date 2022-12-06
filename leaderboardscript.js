var rowCount = 0;
var playerInfo;
var sorted_leaderboard;
var httpRequest;
var value;
let sortDir = ""; //ASC or DESC
let sortCol = "";
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

function sort_single_column(sortCol, sortDir) {
    console.log("in sort_single_column");
    httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { // check if the object was properly created
      // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    console.log("Column is: "+sortCol);

    console.log("Direction is: "+sortDir);

    //form creation
    fd = new FormData();
    fd.append("attribute", get_sort_single_col_param(sortCol)); //post the attribute
    fd.append("direction", sortDir); //post the kind of sort

    console.log(typeof(get_sort_single_col_param(sortCol)));

    //send form to server side
    httpRequest.onreadystatechange = getFromDB_single; //call back function
    httpRequest.open('POST','order_by.php');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(fd);
}
  
function getFromDB_single() { //callback function for sorting leaderboard
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log("server status: "+httpRequest.status);
          //console.log("server response: "+httpRequest.responseText);
          sorted_leaderboard = JSON.parse(httpRequest.responseText);
          //console.log("henlo");
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

function flip(event){ //sorts clicked column ASC -> DESC -> NEITHER
  console.log("EVENT: ",event.target.id);
  let col = event.target.id;

  if(!sortCol){ //if no column is clicked
    sortDir = "ASC"; //default ASC
  }
  else if(sortCol === col){ //if col is clicked
    if(sortDir === "ASC"){ //check if already ASC
      sortDir = "DESC"; //switch to DESC
    }
    else{ //sort on neither
      sortDir = "";
    }
  }
  else if(sortCol !== col){ //if other column is clicked
    sortDir = "ASC";
  }
  sortCol = col;
  sort_single_column(sortCol, sortDir); //pass to database
}

//returns what attribute will be sorted
function get_sort_single_col_param(x){
  switch (x){
    case "totGame":
      return "total_games";
    case "wins":
      return "wins";
    case "timePlayed":
      return "time_played";
    case "turnCount":
      return "turn_count";
  }
  console.log("Something went wrong in returning string");
}


putIntoPage();