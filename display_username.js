var user = "";
var params = "";
var xhr;
var insert_slot = "";

function getUser(){
    //console.log("trying getUser <br>");
    params = "?username=set";

    xhr = new XMLHttpRequest
    xhr.open("GET", "check_connection.php" + params);
            
    xhr.onreadystatechange = setUser;
    xhr.send();
}

document.addEventListener("DOMContentLoaded", ()=>{
     //console.log("Inside event listener <br>");
    getUser();
})

function goodRequest(){
    return xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200;
}

function setUser(){
    if(goodRequest()){
        //console.log("request is good");
        user = xhr.response; //gets username from echo in check_login.php
        console.log(user);
        if(checkUsernameDisplay("user_home_page")){
            document.getElementById("user_home_page").innerText = "Welcome: " + user;
        }
        else if(checkUsernameDisplay("user_game_page")){
            document.getElementById("user_game_page").innerText = user;
        }
        else{
            console.log("HTML id does not exist")
        }
    }
    else if(xhr.status == 401){
         window.location.replace("logout_mysql.php");
    }
}

function checkUsernameDisplay(insert_slot){
    if((document.getElementById(insert_slot)) != null){
        return true;
    }
    else{
        false;
    }
}
getUser();
setUser();