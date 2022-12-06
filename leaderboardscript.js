var rowCount = 0;
var playerInfo;
var httpRequest;
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

function sort_single_column() {
    console.log("in putIntoPage");
    httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { // check if the object was properly created
      // issues with the browser, example: old browser
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = getFromDB_single; // we assign a function to the property onreadystatechange (callback function)
    httpRequest.open('POST','order_by.php');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(); // GET = send with no parameter !
}
  
function getFromDB_single() {
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
    let flipflop = -1;
    switch(header_column){ //do a specific post on a specific column click
        case (header_column > 0 || header_column < 0):
            break;
        case 2:
            flipflop * -1;
            break;
        case 3:
            flipflop * -1;
            break;
        case 4:
            flipflop * -1;
            break;
    }
    header_column * flipflop; //switch between asec or desec
}


putIntoPage();