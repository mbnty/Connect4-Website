var httpRequest;

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