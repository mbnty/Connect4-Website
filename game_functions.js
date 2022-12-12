var Player1Wins = 0;
var player1TurnCount = 0;
var player2TurnCount = 0;
var time_played;
var total_games;

var xhr;

var ColorP = ["play", "play2", "play3", "play4", "play5", "play6",];
var Color = ["red", "yellow", "green", "orange", "blue", "purple",];
var p1Color = 0;
var p1ColorID = ColorP[p1Color];
var p2Color = 1;
var p2ColorID = ColorP[p2Color];;

var ColorT = ["blue", "green", "maroon", "black"];
var ColorTID = ["tab", "tab2","tab3", "tab4"];
var tableColor = 0;
var tableID = ColorTID[tableColor];

var turnNumber = 0;

var gameDone = false;

var typeboard = 7;

var timeStart;
var timeEnd;

var currentplayer; // player turn Player 1: 1 and Player 2: 0
var gameStart = false;

var player1 = "play";
var player2 = "play2";
var player1Power = true;
var player2Power = true;

const tablePos = []; //index of positions
const tableValues = []; //moves made based on index

var boardinfo = [];

var GAMEROWS;
var GAMECOL;

var colorSec = document.getElementById("colors");
var space = document.getElementById("tablespace");
var buttonSec = document.getElementById("buttonSpace");
var player = document.getElementById("currplayer");
var begtime = document.getElementById("startTime");
var lasttime = document.getElementById("endTime");
var play1Stat = document.getElementById("player1Stats");
var play1Stat4 = document.getElementById("player1Stats4");
var play2Stat = document.getElementById("player2Stats");
var play2Stat4 = document.getElementById("player2Stats4");

var power = document.getElementById("powerups");
var pMessage = document.getElementById("powerMessage");
var rbutton = document.getElementById("restart");

function reset(){
    turnNumber = 0;
    gameDone = false;
    typeboard = 7;
    timeStart = new Date();
    timeEnd = 0;
    gameStart = false;
    currentplayer = Math.random() % 2;
    player1Power = true;
    player2Power = true;
    for(let i = 0; i < GAMECOL; i++){
        clearcolumn(i);
    }
    removeElements(space);
    removeElements(buttonSec);
    removeElements(player);
    removeElements(begtime);
    removeElements(lasttime);
    removeElements(play1Stat);
    removeElements(play1Stat4);
    removeElements(play2Stat);
    removeElements(play2Stat4);
    removeElements(power);
    removeElements(pMessage);
    removeElements(rbutton);
    removeElements(colorSec);
}

function startTime(){
    timeStart = new Date();
    return(timeStart);
}

function endTime(){ //returns end time - start time
    timeEnd = new Date() - timeStart;
    return timeEnd; //miliseconds
}

function checkID(the_id){
    console.log(the_id);
}

function checkColumn(the_id){
    let num = String(the_id);
    let val = num[1];
    //console.log("Column number = " + val);
}

function displayStartTime(){
    timeSpace = document.getElementById("startTime");
    removeElements(timeSpace);
    var time = document.createElement("p");
    time.innerHTML = "Game Started: " + startTime();
    time.setAttribute("id", "ST");
    timeSpace.appendChild(time);
}

function displayEndTime(){
    timeSpace = document.getElementById("endTime");
    removeElements(timeSpace);
    var time = document.createElement("div");
    time.innerHTML = "Game Ended in " + (endTime()/60) + "seconds";
    time.setAttribute("id", "ET");
    timeSpace.appendChild(time);
}

function findOpenRow(the_id){
    var row = the_id[1];
    var col = the_id[4];
    let columnStats = [];

    for(let i = 0; i < GAMEROWS; i++){ //looks at if column is filled
        let temp = document.getElementById("["+i+"]["+col+"]");
        if (temp.hasChildNodes() == false){
            columnStats.push('0');
        }else{
            columnStats.push('1');
        }
    }
    for(let j = columnStats.length - 1; j >= 0; j--){ //actually piece placement
        //console.log(columnStats[j] == String(0));
        if(columnStats[j] === String(0)){
            if(columnStats[j+1] === String(0)){
                continue;
            }else{
                placePiece("["+j+"]["+col+"]");
                return;
            }
        }
    }                
}

function placePiece(the_id){
    //checkID(the_id);
    //checkColumn(the_id);
    let x = document.getElementById(the_id);
    turnNumber++;

    if(currentplayer == 1){
        player1TurnCount++;
        y = document.createElement("div");
        y.setAttribute("class", "coin");
        y.setAttribute("id", p1ColorID);
        y.innerHTML = turnNumber;
        x.appendChild(y);
        currentplayer = 0;
    }else{
        player2TurnCount++;
        y = document.createElement("div");
        y.setAttribute("class", "coin");
        y.setAttribute("id", p2ColorID);
        y.innerHTML = turnNumber;
        x.appendChild(y);
        currentplayer = 1
    }
    detectConnects();
    findWin(currentplayer);
    setplayer();
}

function setplayer(){
    if(gameStart == false){
        currentplayer = Math.random() % 2;
        gameStart = true;
    }
    var playerspace = document.getElementById("currplayer");
    if(currentplayer == 1){
        playerspace.innerHTML = "Go Player 1";
    }else{
        playerspace.innerHTML = "Go Player 2";
    }
}

function pickColor(){
    if(gameStart == true){
        return;
    }else{

    var player1ColorButton = document.createElement("div");
    player1ColorButton.setAttribute("id", "coinbox");
    player1ColorButton.setAttribute("onclick", "changeColorP1()");
    var player1BT = document.createElement("p");
    player1BT.setAttribute("id","Player1ColorText");
    player1BT.innerHTML = "Player 1 Color";
    player1ColorButton.appendChild(player1BT);

    var player2ColorButton = document.createElement("div");
    player2ColorButton.setAttribute("id", "coinbox2");
    player2ColorButton.setAttribute("onclick", "changeColorP2()");
    var player2BT = document.createElement("p");
    player2BT.setAttribute("id","Player2ColorText");
    player2BT.innerHTML = "Player 2 Color";
    player2ColorButton.appendChild(player2BT);

    var tableColorButton = document.createElement("div");
    tableColorButton.setAttribute("id","tablebox");
    tableColorButton.setAttribute("onclick", "changeTableColor()");
    var tableBT = document.createElement("p");
    tableBT.setAttribute("id","TableColorText");
    tableBT.innerHTML = "Table Color";
    tableColorButton.appendChild(tableBT);

    var okay = document.createElement("button");
    okay.innerHTML = "Okay";
    okay.setAttribute("onclick", "pickSize()");


    colorSec.appendChild(player1ColorButton);
    colorSec.appendChild(player2ColorButton);
    colorSec.appendChild(tableColorButton);
    colorSec.appendChild(okay);
    }
}

function changeColorP1(){
    p1Color++;
    if(p1Color > 6){
        p1Color = 0;
    }
    document.getElementById("coinbox").style.backgroundColor = Color[p1Color];
    p1ColorID = ColorP[p1Color];
}

function changeColorP2(){
    p2Color++;
    if(p2Color > 6){
        p2Color = 0;
    }
    document.getElementById("coinbox2").style.backgroundColor = Color[p2Color];
    p2ColorID = ColorP[p2Color];
}

function changeTableColor(){
    tableColor++;
    if(tableColor > 4){
        tableColor = 0;
    }
    document.getElementById("tablebox").style.backgroundColor = ColorT[tableColor];
    //document.getElementById("board2").style.backgroundColor = ColorT[tableColor];
    tableID = ColorTID[tableColor];
}

function pickSize(){
    var place = document.getElementById("buttonSpace");

    removeElements(place);

    var buttonSmall = document.createElement("button");
    buttonSmall.innerHTML = "Board Size 6x7"
    buttonSmall.setAttribute("onclick", "makeTable(6,7)");
    place.appendChild(buttonSmall);

    var buttonBig = document.createElement("button");
    buttonBig.innerHTML = "Board Size 8x9"
    buttonBig.setAttribute("onclick", "makeTable(8,9)");
    place.appendChild(buttonBig);
}

function resetbutton(){
    var resetSpace = document.getElementById("restart");

    var reButton = document.createElement("button");
    reButton.setAttribute("onclick", "reset()");
    reButton.innerHTML = "Restart";

    resetSpace.appendChild(reButton);
}

function removeElements(space){
    while(space.firstChild){
        space.removeChild(space.firstChild);
    }
    return space;
}

function resetTable(){
    boardinfo = [];
}

function makepowerups(){
    var powerSpace = document.getElementById("powerups");
    
    var p1button = document.createElement("button");
    p1button.innerHTML = "Player 1: Flip Board";
    p1button.setAttribute("onclick","UsePowerUp(1)")
    p1button.setAttribute("id", "P1PB");
    powerSpace.appendChild(p1button);

    var p2button = document.createElement("button");
    p2button.innerHTML = "Player 2: Flip Board";
    p2button.setAttribute("onclick","UsePowerUp(0)")
    p2button.setAttribute("id", "P2PB");
    powerSpace.appendChild(p2button);  
}

function readBoard(){ //use this to find wins
    var tableTest = [];
    for(let i = 0; i < GAMEROWS; i++){
        var testrow = new Array ();
        for(let j = 0; j < GAMECOL; j++){
            let test = document.getElementById("["+i+"]["+j+"]");
            if(test.firstChild != null){
                if(String(test.firstChild.id) == p1ColorID){
                    testrow.push(1);
                }else{
                    testrow.push(2);
                }
            }else{
                testrow.push(0);
            }
        }
        tableTest.push(testrow);
    }
    return tableTest;
}
function findWin(player){
    var OneWins = 0;
    var TwoWins = 0;
    let tableStats = readBoard();
    tableStats = tableStats.reverse();
    console.log(tableStats);

    for(let i=0; i < GAMEROWS; i++){ //horizontal
        for(let j = 0; j < GAMECOL-3;j++){
            if(tableStats[i][j]==1 && tableStats[i][j+1]==1 && tableStats[i][j+2]==1 && tableStats[i][j+3]==1){
                OneWins++;
                console.log("Player 1 Win");
            }
            if(tableStats[i][j]==2 && tableStats[i][j+1]==2 && tableStats[i][j+2]==2 && tableStats[i][j+3]==2){
                TwoWins++;
                console.log("Player 2 Win");
            }
        }
    }

    for(let i=0; i < GAMEROWS-3; i++){ //vertiacal
        for(let j = 0; j < GAMECOL;j++){
            if(tableStats[i][j]==1 && tableStats[i+1][j]==1 && tableStats[i+2][j]==1 && tableStats[i+3][j]==1){
                OneWins++;
                console.log("Player 1 Win");
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j]==2 && tableStats[i+2][j]==2 && tableStats[i+3][j]==2){
                TwoWins++;
                console.log("Player 2 Win");
            }
        }
    }

    for(let i=0; i < GAMEROWS-3; i++){ //postive slope
        for(let j = 0; j < GAMECOL-3;j++){
            if(tableStats[i][j]==1 && tableStats[i+1][j+1]==1 && tableStats[i+2][j+2]==1 && tableStats[i+3][j+3]==1){
                OneWins++;
                console.log("Player 1 Win");
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j+1]==2 && tableStats[i+2][j+2]==2 && tableStats[i+3][j+3]==2){
                TwoWins++;
                console.log("Player 2 Win");
            }
        }
    }   
    for(let i=0; i < GAMEROWS; i++){ //negative slope
        for(let j = 0; j < GAMECOL;j++){
            //console.log("["+i+"]["+j+"]");
            if(tableStats[i][j]==1 && tableStats[i+1][j-1]==1 && tableStats[i+2][j-2]==1 && tableStats[i+3][j-3]==1){
                OneWins++;
                console.log("Player 1 Win");
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j-1]==2 && tableStats[i+2][j-2]==2 && tableStats[i+3][j-3]==2){
                TwoWins++;
                console.log("Player 2 Win");
            }
        }
    }
    displayConnections4(OneWins,TwoWins);

    if(OneWins > 0){
        total_games = 1;
        Player1Wins++;
        time_played = (parseInt(endTime()))/1000; //seconds
        console.log(player1TurnCount);
        sendToLeaderboard(total_games, Player1Wins, time_played, player1TurnCount);
        displayEndTime();
        /*
        GAME WINNER WINDOW WITH OK BUTTON HERE
        PRESSING OK RESET PAGE
        */
    }else if (TwoWins > 0){
        total_games = 1;
        Player1Wins = 0;
        time_played = (parseInt(endTime()))/1000; //seconds
        player1TurnCount;
        sendToLeaderboard(total_games, Player1Wins, time_played, player1TurnCount);
        displayEndTime();
        /*
        SAME AS PLAYER 1 AFTER TIME ENDS DISPLAY
        */   
    }
}

function detectConnects(){
    var OneConnection = 0;
    var TwoConnection = 0;
    let tableStats = readBoard();
    tableStats = tableStats.reverse();
    //console.log(tableStats);

    for(let i=0; i < GAMEROWS; i++){ //horizontal
        for(let j = 0; j < GAMECOL-3;j++){
            if(tableStats[i][j]==1 && tableStats[i][j+1]==1 && tableStats[i][j+2]==1){
                OneConnection++;
            }
            if(tableStats[i][j]==2 && tableStats[i][j+1]==2 && tableStats[i][j+2]==2){
                TwoConnection++;
            }
        }
    }
    for(let i=0; i < GAMEROWS-3; i++){ //vertiacal
        for(let j = 0; j < GAMECOL;j++){
            if(tableStats[i][j]==1 && tableStats[i+1][j]==1 && tableStats[i+2][j]==1){
                OneConnection++;
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j]==2 && tableStats[i+2][j]==2){
                TwoConnection++;
            }
        }
    }
    for(let i=0; i < GAMEROWS-3; i++){ //postive slope
        for(let j = 0; j < GAMECOL-3;j++){
            if(tableStats[i][j]==1 && tableStats[i+1][j+1]==1 && tableStats[i+2][j+2]==1){
                OneConnection++;
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j+1]==2 && tableStats[i+2][j+2]==2){
                TwoConnection++;
            }
        }
    }
    for(let i=0; i < GAMEROWS; i++){ //negative slope
        for(let j = 0; j < GAMECOL;j++){
            if(tableStats[i][j]==1 && tableStats[i+1][j-1]==1 && tableStats[i+2][j-2]==1){
                OneConnection++;
            }
            if(tableStats[i][j]==2 && tableStats[i+1][j-1]==2 && tableStats[i+2][j-2]==2){
                TwoConnection++;
            }
        }
    }
    displayConnections3(OneConnection, TwoConnection);
}

function displayConnections3(P1number, P2number){
    var P1Space = document.getElementById("player1Stats");
    var P2Space = document.getElementById("player2Stats");

    removeElements(P1Space);
    removeElements(P2Space);

    var P1Stats = document.createElement("div");
    var P2Stats = document.createElement("div");

    P1Stats.innerHTML = "Player 1's 3 connections " + P1number;
    P2Stats.innerHTML = "Player 2's 3 connections " + P2number;

    P1Space.appendChild(P1Stats);
    P2Space.appendChild(P2Stats);
}

function displayConnections4(P1number, P2number){
    var P1Space = document.getElementById("player1Stats4");
    var P2Space = document.getElementById("player2Stats4");

    removeElements(P1Space);
    removeElements(P2Space);

    var P1Stats = document.createElement("div");
    var P2Stats = document.createElement("div");

    P1Stats.innerHTML = "Player 1's 4 connections " + P1number;
    P2Stats.innerHTML = "Player 2's 4 connections " + P2number;

    P1Space.appendChild(P1Stats);
    P2Space.appendChild(P2Stats);
}
            
function readcolumn(column){
    let columnStats = [];
    for(let i = 0; i < GAMEROWS; i++){
        let currCell = document.getElementById("["+i+"]["+column+"]");
        if(currCell.firstChild != null){
            if(String(currCell.firstChild.id) == p1ColorID){
                columnStats.push(1);
            }
            else{
                columnStats.push(2);
            }
        }else{
            columnStats.push(0);
        }
    }
    return columnStats;
}

function clearcolumn(column){
    var currentColumn = [];
    currentColumn = readcolumn(column);
    for(let i = 0; i < GAMECOL; i++){
        let currCell = document.getElementById("["+i+"]["+column+"]");
        if(currCell == null){
            break;
        }
        removeElements(currCell);
    }
    return currentColumn;
}

function autoplace(column, columnArray){
    var tempCol = [];
    for(let i = 0; i < columnArray.length; i++){ //adding values
        if(columnArray[i] != 0){
            tempCol.push(columnArray[i]);
        }
    }
    for(let i = 0; i < columnArray.length; i++){ //placeing 0 on rest of values
        if(tempCol.length == columnArray.length){
            break;
        }
        tempCol.push(0);
        
    }
    tempCol = tempCol.reverse();
    for(let k = 0; k < tempCol.length; k++){
        let currCell = document.getElementById("["+k+"]["+column+"]");
        if(tempCol[k] == 1){
            let piece = document.createElement("div");
            piece.setAttribute("class","coin");
            piece.setAttribute("id", p1ColorID);
            currCell.appendChild(piece);
        }else if(tempCol[k] == 2){
            let piece = document.createElement("div");
            piece.setAttribute("class","coin");
            piece.setAttribute("id", p2ColorID);
            currCell.appendChild(piece);
        }
    }
}

function UsePowerUp(player){
    var messageSpace = document.getElementById("powerMessage");
    console.log(player + " and " + currentplayer);
    if(player == currentplayer && player2Power == true){
        for(let i = 0; i <= GAMEROWS; i++){
            autoplace(i, clearcolumn(i));
        }
        player2Power = false;
    }else if(player == currentplayer && player1Power == true){
        for(let i = 0; i <= GAMEROWS; i++){
            autoplace(i, clearcolumn(i));
        }
        player1Power = false;
    }
    else{
        messageSpace.innerHTML = "Player " + player + ", cannot use power";
    }
}
            
function makeTable(Grow, Gcolumn){
    GAMEROWS = Grow;
    GAMECOL = Gcolumn;
    var table = document.createElement("table");

    if(Grow == 8 && Gcolumn == 9){
        typeboard = 8;
    }
                
    removeElements(space); //removes preivious  table

    var tableArea = new Array(Gcolumn); 
    for(let i; i < Grow; i++){
        table[i] = new Array(Grow);
    }
                

    for(let i = 0; i < Grow; i++){
        var row = document.createElement("tr");
        for(let j = 0; j < Gcolumn; j++){
            var cell = document.createElement("td");
            //cell.innerHTML = j
            tablePos.push("["+String(i)+"]"+"["+String(j)+"]");
            tableValues.push("0");
            cell.setAttribute("id", "["+String(i)+"]"+"["+String(j)+"]");
            cell.setAttribute("onclick", "findOpenRow(this.id)");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    if(Grow == 6 && Gcolumn == 7){
        table.setAttribute("id", "board");
    }else{
        table.setAttribute("id", "board2");
    }
    table.setAttribute("class",tableID);
    space.appendChild(table);
    removeElements(colorSec);
    removeElements(buttonSec);
    resetbutton();
    displayStartTime();
    setplayer();
    makepowerups();
}

//update leaderboard information
function sendToLeaderboard(total_games, Player1Wins, time_played, player1TurnCount){

    fd = new FormData();
    fd.append("totGames", total_games);
    fd.append("victories", Player1Wins);
    fd.append("playTime", time_played);
    fd.append("turns", player1TurnCount);

    xhr = new XMLHttpRequest();
    xhr.open("POST", "game_rdbms.php");
    xhr.send(fd)//send the form
}