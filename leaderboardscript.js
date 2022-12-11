var playerInfo;
var httpRequest;
var value;
let sortDir = ""; //ASC or DESC
let sortCol = "";
var leaderboard_space = document.getElementById("append-here");

function insertDummy(){ //populates data with dummy data
  httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = getFromDB;
  httpRequest.open('GET', 'insert_dummy_data.php');
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send();
}

function putIntoPage() {
    // console.log("in putIntoPage");
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
          // console.log("server status: "+httpRequest.status);
          // console.log("server response: "+httpRequest.responseText);
          playerInfo = JSON.parse(httpRequest.responseText);
          makeTable();
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
      console.log('Caught Exception: ', e);
    }
}

function sort_single_column(sortCol, sortDir) {
    // console.log("in sort_single_column");
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
          // console.log("server status: "+httpRequest.status);
          // console.log("server response: "+httpRequest.responseText);
          playerInfo = JSON.parse(httpRequest.responseText);
          makeTable();
          showDir(sortCol, sortDir);
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
    catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
      console.log('Caught Exception: ' + e.description);
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

function makeTable(){
    var tableBody = document.getElementById("append-here");

    tableBody.innerHTML = "";
    var tr;
    var td;
    let fancyTime;
    for(let item of playerInfo){
        tr = document.createElement("tr");
        for(let field in item){
          if(field == "TimePlayed"){
            fancyTime = intToTime(item[field]);
            item[field] = fancyTime; //override the value to fancy time
          }
          td = document.createElement("td");
          td.innerText = item[field];
          tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
}

function flip(event){ //sorts clicked column ASC -> DESC -> NEITHER
  //console.log("EVENT: ",event.target.id);
  let col = event.target.id;

  if(!sortCol || !sortDir){ //if no column is clicked
    sortDir = "ASC"; //default ASC
  }
  else if(sortCol === col){ //if col is clicked
    if(sortDir === "ASC"){ //check if already ASC
      sortDir = "DESC"; //switch to DESC
    }
    else if(sortDir === "DESC"){ //sort on neither
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

function showDir(sortCol,sortDir){ //adds arrow to column
  let orig = document.getElementById(sortCol);
  let symbol = orig.innerHTML.slice(-1);
  let str = "";
  let newSym = sortDir == 'ASC' ? '\u2193' : sortDir == 'DESC' ? '\u2191' : "";
  if(symbol == '\u2193' || symbol == '\u2191'){ //ASC or DESC
    str = orig.innerHTML.slice(0,-1) + newSym;
  }
  else{
    str = orig.innerHTML + " " + newSym;
  }

  orig.innerHTML = str;
}

insertDummy();
putIntoPage();