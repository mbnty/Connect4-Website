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
    fd.append("col", get_sort_single_col_param(sortCol)); //post the attribute
    fd.append("dir", sortDir); //post the kind of sort

    for (var key of fd.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    //send form to server side
    httpRequest.onreadystatechange = getFromDB_single; //call back function
    httpRequest.open('POST','order_by.php');
    httpRequest.send(fd);
}
  
function getFromDB_single() { //callback function for sorting leaderboard
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log("server status: "+httpRequest.status);
          console.log("server response: "+httpRequest.responseText);
          sorted_leaderboard = JSON.parse(httpRequest.responseText);
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

function intToTime(totalSeconds){
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  let timeStr = hours + ":" + minutes + ":" + seconds;
  return timeStr;
}

function updateTable(){
    var table = document.getElementById("leaderboard");

    table.innerHTML = "";
    var row;
    var cell;
    for(let item of sorted_leaderboard){
        row = document.createElement("tr");
        for(let field in item){
          if(field == "TimePlayed"){
            fancyTime = intToTime(item[field]);
            item[field] = fancyTime; //override the value to fancy time
          }
            cell = document.createElement("td");
            cell.innerText = item[field];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    leaderboard_space.appendChild(table);
}

function makeTable(){
    var table = document.getElementById("leaderboard");

    table.innerHTML = "";
    var row;
    var cell;
    let fancyTime;
    for(let item of playerInfo){
        row = document.createElement("tr");
        for(let field in item){
          if(field == "TimePlayed"){
            fancyTime = intToTime(item[field]);
            item[field] = fancyTime; //override the value to fancy time
          }
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