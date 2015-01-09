/**
 * Created by Natalya on 07.01.2015.
 */

var player =
    {
        "name": "vanya",
        "color": "red",
        "money": 50000,
        "tree": 50000,
        "coal": 50000,
        "wheat": 50000,
        "gas": 50000,
        "rock": 50000,
        "step": 1
    }
    ;

function setPlayerName(){
    player.name = document.getElementById("player_one");
    map[first_city_id()].owner = player.name;
    showResInPanel();
    startstep();
    createHexGrid();

}