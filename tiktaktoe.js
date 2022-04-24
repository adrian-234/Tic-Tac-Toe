var alakzat = "X"
var alak_hly;
var mapsize = 3;
var cel = 3;
var mode = "pvp";
var clickable = true;
var mehet = true;

function player_move(sor,oszlop) {
    if (alak_hly[sor][oszlop] == 0 && clickable) {
        document.getElementById("mezo" + sor + oszlop).innerHTML = alakzat;
        document.getElementById("mezo" + sor + oszlop).style.color = "rgb(0,255,255)";
        alak_hly[sor][oszlop] = alakzat;
        if (alakzat == "X") {
            alakzat = "O";
        } else {
            alakzat = "X";
        }
        document.getElementById("aktiv_player").innerHTML = alakzat;
        if (!win_check() && mode == "pve") {
            clickable = false;
            alakzat = "X";
            bot();
        }
    } 
}

function win_check() {
    for (let i = 0; i < alak_hly.length; i++) {
        for (let k = 0; k < alak_hly[i].length; k++) {
            db = 0;
            while (alak_hly[i][k + db] == alak_hly[i][k] && alak_hly[i][k] != 0) {
                db += 1;
                if (k+db >= alak_hly.length) {
                    break;
                }
            }
            if (db == cel) {
                console.log("vízszintes win");
                for (let x = 0; x < cel; x++) {
                    document.getElementById("mezo" + i + (k+x)).style.backgroundColor = "rgb(224, 41, 41)";
                }
                for (let x = 0; x < alak_hly.length; x++) {
                    for (let y = 0; y < alak_hly[x].length; y++) {
                        document.getElementById("mezo" + x + y).setAttribute("onclick","map_updater()");
                    }
                }
                return true;
            }
            db = 0;
            while (alak_hly[i + db][k] == alak_hly[i][k] && alak_hly[i][k] != 0) {
                db += 1;
                if (i+db >= alak_hly.length) {
                    break;
                }
            }
            if (db == cel) {
                console.log("függőleges win");
                for (let x = 0; x < cel; x++) {
                    document.getElementById("mezo" + (i+x) + k).style.backgroundColor = "rgb(224, 41, 41)";
                }
                for (let x = 0; x < alak_hly.length; x++) {
                    for (let y = 0; y < alak_hly[x].length; y++) {
                        document.getElementById("mezo" + x + y).setAttribute("onclick","map_updater()");
                    }
                }
                return true;
            }
            db = 0;
            while (alak_hly[i + db][k + db] == alak_hly[i][k] && alak_hly[i][k] != 0) {
                db += 1;
                if (k+db >= alak_hly.length || i+db >= alak_hly.length) {
                    break;
                }
            }
            if (db == cel) {
                console.log("balról jobbra le win");
                for (let x = 0; x < cel; x++) {
                    document.getElementById("mezo" + (i+x) + (k+x)).style.backgroundColor = "rgb(224, 41, 41)";
                }
                for (let x = 0; x < alak_hly.length; x++) {
                    for (let y = 0; y < alak_hly[x].length; y++) {
                        document.getElementById("mezo" + x + y).setAttribute("onclick","map_updater()");
                    }
                }
                return true;
            }
            db = 0;
            while (alak_hly[i + db][k - db] == alak_hly[i][k] && alak_hly[i][k] != 0) {
                db += 1;
                if (k-db < 0 || i+db >= alak_hly.length) {
                    break;
                }
            }
            if (db == cel) {
                console.log("jobbról balra le win");
                for (let x = 0; x < cel; x++) {
                    document.getElementById("mezo" + (i+x) + (k-x)).style.backgroundColor = "rgb(224, 41, 41)";
                }
                for (let x = 0; x < alak_hly.length; x++) {
                    for (let y = 0; y < alak_hly[x].length; y++) {
                        document.getElementById("mezo" + x + y).setAttribute("onclick","map_updater()");
                    }
                }
                return true;
            }
        }
    }
    if (!find(0)) {
        for (let x = 0; x < alak_hly.length; x++) {
            for (let y = 0; y < alak_hly[x].length; y++) {
                document.getElementById("mezo" + x + y).setAttribute("onclick","map_updater()");
            }
        }
    }
}

function reset() {
    for (let i = 0; i < alak_hly.length; i++) {
        for (let k = 0; k <alak_hly[i].length; k++) {
            document.getElementById("mezo" + i + k).innerHTML = "";
            document.getElementById("mezo" + i + k).style.backgroundColor = "rgba(0,0,0,0)";
        }
    }
    alak_hly = []
    for (let i = 0; i < mapsize; i++) {
        alak_hly.push([]);
        for (let k = 0; k < mapsize; k++) {
            alak_hly[i].push(0);
        }
    }
    //document.getElementById("table_mezok").setAttribute("onclick","");
    clickable = true;
    alakzat = "X";
    mehet = true;
}

function settings() {
    if (document.getElementById("settings").offsetWidth == "50") {
        document.getElementById("settings_wheel").style.transform = "rotate(180deg)";
        document.getElementById("settings").style.width = "450px";
        document.getElementById("settings").style.height = "250px";
        document.getElementById("settings_inner").style.display = "block";
    } else {
        if (mode != document.getElementById("mode").value || mapsize != Number(document.getElementById("mapsize").value)) {
            mode = document.getElementById("mode").value;
            mapsize = Number(document.getElementById("mapsize").value);
            console.log("Mód: ",mode,"      Mapsize: ",mapsize);        //debug*/
            map_updater();
        }
        document.getElementById("settings_wheel").style.transform = "rotate(-180deg)";
        document.getElementById("settings").style.width = "38px";
        document.getElementById("settings").style.height = "60px";
        document.getElementById("settings_inner").style.display = "none";
    }
}

function map_updater() {
    const table = document.getElementById("table_mezok"); 
    let tr_elem = table.insertRow();
    let td_elem = tr_elem.insertCell();
    alak_hly = [];
    alakzat = "X";
    clickable = true;
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < mapsize; i++) {
        tr_elem = table.insertRow();
        alak_hly.push([]);
        for (let k = 0; k < mapsize; k++) {
            td_elem = tr_elem.insertCell();
            td_elem.setAttribute("id","mezo" + i + k);
            td_elem.setAttribute("onclick","player_move(" + i + "," + k + ")");
            //td_elem.setAttribute("onmouseenter","show_move(" + i + "," + k + ")");
            //td_elem.setAttribute("onmouseleave","show_move(" + i + "," + k + ")");
            td_elem.setAttribute("width", 900 / mapsize);       //itt lehet gond ha átméretezem a  táblázatot
            td_elem.setAttribute("height", 900 / mapsize);       //itt lehet gond ha átméretezem a  táblázatot
            alak_hly[i].push(0);
        }
        table.appendChild(tr_elem);
    }
    if (mapsize == 3) {
        cel = 3;
    } else if (mapsize == 5) {
        cel = 4;
    } else {
        cel = 5;
    }
}

function bot() {
    let poz = mxhossz("X");
    let ved1;
    let ved2;
    if (poz[0] >= cel - 2) {         //védekezés
        if (alak_hly[poz[1]][poz[2]] == 0) {
            alak_hly[poz[1]][poz[2]] = "O";
            console.log("csere helye: ","mezo" + poz[1] + (poz[2]));
            document.getElementById("mezo" + poz[1] + (poz[2])).innerHTML = "O";
        } else if (alak_hly[poz[3]][poz[4]] == 0){
            alak_hly[poz[3]][poz[4]] = "O";
            document.getElementById("mezo" + poz[3] + (poz[4])).innerHTML = "O";
        }
    } else {        //támadás
        poz = mxhossz("O");
        if (!find("O")) {      //kezdő lépés
            while (!find("O")) {
                ved1 = Math.floor(Math.random()*mapsize);
                ved2 = Math.floor(Math.random()*mapsize);
                if (alak_hly[ved1][ved2] == 0) {
                    alak_hly[ved1][ved2] = "O";
                    document.getElementById("mezo" + ved1 + ved2).innerHTML = "O";
                }
            }
        } else {        //ha tudja folytatja a saját lépéseit
            if (alak_hly[poz[1]][poz[2]] == 0) {
                alak_hly[poz[1]][poz[2]] = "O";
                document.getElementById("mezo" + poz[1] + (poz[2])).innerHTML = "O";
            } else if (alak_hly[poz[3]][poz[4]] == 0){
                alak_hly[poz[3]][poz[4]] = "O";
                document.getElementById("mezo" + poz[3] + (poz[4])).innerHTML = "O";
            } 
        }
    }
    clickable = true;
    win_check();
}
function mxhossz(alak) {
    let ki = [0,0,0,0,0,""];       //[max hossz, elso blokkolas i, elso blokkolas k, masodik blokkolas i , masodik blokkolas k, irány]
    let db;
    for (let i = 0; i < alak_hly.length; i++) {
        for (let k = 0; k <alak_hly[i].length; k++) {
            if (alak_hly[i][k] == alak) {
                db = 0;
                for (let x = k; x < alak_hly.length; x++) {     //vízsintes keresés
                    if (alak_hly[i][x] == alak) {
                        db += 1;
                    } else {
                        break;
                    }
                }
                if (((k != 0 && alak_hly[i][k-1] == 0) || (k+db < alak_hly.length && alak_hly[i][k+db] == 0)) && db > ki[0]) {
                    ki[0] = db;
                    ki[1] = i;
                    ki[2] = k - 1;
                    ki[3] = i;
                    ki[4] = k + db;
                    ki[5] = "v";
                }
                db = 0;
                for (let x = i; x < alak_hly.length; x++) {     //függőleges keresés
                    if (alak_hly[x][k] == alak) {
                        db += 1;
                    } else {
                        break;
                    }
                }
                if (((i != 0 && alak_hly[i - 1][k] == 0) || (i + db < alak_hly.length && alak_hly[i + db][k] == 0)) && db > ki[0]) {
                    ki[0] = db;
                    ki[1] = i - 1;
                    ki[2] = k;
                    ki[3] = i + db;
                    ki[4] = k;
                    ki[5] = "f";
                }
                db = 0;
                for (let x = 0; x < alak_hly.length - i; x++) {     //balról jobbra le keresés
                    if (alak_hly[i + x][k + x] == alak) {
                        db += 1;
                    } else {
                        break;
                    }
                }
                if (((i != 0 && k != 0 && alak_hly[i - 1][k - 1] == 0) || (i+db < alak_hly.length && k+db < alak_hly.length && alak_hly[i + db][k + db] == 0)) && db > ki[0]) {
                    ki[0] = db;
                    ki[1] = i - 1;
                    ki[2] = k - 1;
                    ki[3] = i + db;
                    ki[4] = k + db;
                    ki[5] = "bj";
                }
                db = 0;
                for (let x = 0; x < alak_hly.length - i; x++) {     //jobbról balra le keresés
                    if (alak_hly[i + x][k - x] == alak) {
                        db += 1;
                    } else {
                        break;
                    }
                }
                if (((i != 0 && k != 0 && alak_hly[i - 1][k + 1] == 0) || (i+db <alak_hly.length && k-db >= 0 && alak_hly[i + db][k - db] == 0)) && db > ki[0]) {
                    ki[0] = db;
                    ki[1] = i - 1;
                    ki[2] = k + 1;
                    ki[3] = i + db;
                    ki[4] = k - db;
                    ki[5] = "jb";
                }
            }
        }
    }
    for (let i = 1; i < ki.length; i++) {
        if (ki[i] < 0) {
            ki[i] -= ki[i];
        } else if (ki[i] >= alak_hly.length) {
            ki[i] -= 1;
        }
    }
    console.log(ki);
    return ki
}

function show_move(sor,oszlop) {
    if (alak_hly[sor][oszlop] == 0 && clickable && document.getElementById("mezo" + sor + oszlop).innerHTML == "") {
        document.getElementById("mezo" + sor + oszlop).style.color = "rgba(0,255,255,0.25)";
        document.getElementById("mezo" + sor + oszlop).innerHTML = alakzat;
    } else if (alak_hly[sor][oszlop] == 0 && clickable && document.getElementById("mezo" + sor + oszlop).innerHTML == alakzat) {
        document.getElementById("mezo" + sor + oszlop).innerHTML = "";
    }
    
}

function find(alak) {
    for (let i = 0; i < alak_hly.length; i++) {
        for (let k = 0; k < alak_hly[i].length; k++) {
            if (alak_hly[i][k] == alak) {
                return true;
            }
        }
    }
    return false;
}

function test() {
    console.log(mxhossz("X"));
}
