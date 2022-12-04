var turnNumber = 0;

var timeStart;
var timeEnd;

var currentplayer = 1; // player turn Player 1: 1 and Player 2: 0
var gameStart = false;

var player1 = "coin";
var player2 = "coin2";

const tablePos = []; //index of positions
const tableValues = []; //moves made based on index

var boardinfo = [];

var GAMEROWS;
var GAMECOL;

var space = document.getElementById("tablespace");

function startTime(){
    timeStart = new Date();
    return(timeStart);
}

function endTime(){
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
        y = document.createElement("div");
        y.setAttribute("class", "coin");
        y.innerHTML = turnNumber;
        x.appendChild(y);
        currentplayer = 0;
    }else{
        y = document.createElement("div");
        y.setAttribute("class", "coin2");
        y.innerHTML = turnNumber;
        x.appendChild(y);
        currentplayer = 1
    }
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

function pickSize(){
    var place = document.getElementById("buttonSpace");

    var buttonSmall = document.createElement("button");
    buttonSmall.innerHTML = "Board Size 6x7"
    buttonSmall.setAttribute("onclick", "makeTable(6,7)");
    place.appendChild(buttonSmall);

    var buttonBig = document.createElement("button");
    buttonBig.innerHTML = "Board Size 8x9"
    buttonBig.setAttribute("onclick", "makeTable(8,9)");
    place.appendChild(buttonBig);
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
    powerSpace.appendChild(p1button);

    var p2button = document.createElement("button");
    p2button.innerHTML = "Player 2: Flip Board";
    p2button.setAttribute("onclick","UsePowerUp(0)")
    powerSpace.appendChild(p2button);  
}

function readBoard(){ //use this to find wins
    var tableTest = [];
    for(let i = 0; i < GAMEROWS; i++){
        var testrow = new Array ();
        for(let j = 0; j < GAMECOL; j++){
            let test = document.getElementById("["+i+"]["+j+"]");
            if(test.firstChild != null){
                if(test.firstChild.classList.contains(player1)){
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
        for(let j = 0; j < GAMECOL-3;j++){
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
    if(OneWins > 0 || TwoWins > 0){
        console.log(endTime());
    }
}
            
function readcolumn(column){
    let columnStats = [];
    for(let i = 0; i < GAMEROWS; i++){
        let currCell = document.getElementById("["+i+"]["+column+"]");
        if(currCell.firstChild != null){
            if(currCell.firstChild.classList.contains(player1)== true){
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
            currCell.appendChild(piece);
        }else if(tempCol[k] == 2){
            let piece = document.createElement("div");
            piece.setAttribute("class","coin2");
            currCell.appendChild(piece);
        }
    }
}

function UsePowerUp(player){
    var messageSpace = document.getElementById("powerMessage");
    if(player == currentplayer){
        for(let i = 0; i <= GAMEROWS; i++){
            autoplace(i, clearcolumn(i));
        }
    }else{
        messageSpace.innerHTML = "Player " + player + ", it is not your turn."
    }
}
            
function makeTable(Grow, Gcolumn){
    GAMEROWS = Grow;
    GAMECOL = Gcolumn;
    var table = document.createElement("table");
                
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
    space.appendChild(table);
    //console.log(tableValues);
    //console.log(tablePos);
    console.log(startTime());
    setplayer();
    makepowerups();
}