/**
 * Created with JetBrains PhpStorm.
 * User: outdream
 * Date: 09.01.15
 * Time: 12:52
 * To change this template use File | Settings | File Templates.
 */
function showResInPanel(){
    document.getElementById('step').innerHTML = player.step;
    document.getElementById('trees').innerHTML=player.tree;
    document.getElementById('coal').innerHTML=player.coal;
    document.getElementById('wheat').innerHTML=player.wheat;
    document.getElementById('gas').innerHTML=player.gas;
    document.getElementById('rock').innerHTML=player.rock;
    document.getElementById('coin_out').innerHTML=player.money;
}

function randomNotUserCities(){
    var cities=[];
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].owner!=player.name){
            cities[k] = i;
            k++;
        }
    }
    var retCity = Math.floor(Math.random() * cities.length);
    return cities[retCity];
}
function randomUserCities(){
    var cities=[];
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].owner==player.name){
            console.log(map[i].owner);
            cities[k] = i;
            k++;
        }
    }
    var retCity = Math.floor(Math.random() * cities.length);
    return cities[retCity];
}

function economiCrizes(){
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var coal = player.coal;
    var trees = player.tree;
    var wheat = player.wheat;
    var gas = player.gas;
    var rock = player.rock;
    if(pos%20==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.coal -= Math.round(Math.random()*coal);
        player.tree-=Math.round(Math.random()*trees);
        player.wheat-=Math.round(Math.random()*wheat);
        player.gas-=Math.round(Math.random()*gas);
        player.rock-=Math.round(Math.random()*rock);
        //alert("THERA AA CRIZESSS");
        showEventPopup("THERA AA CRIZESSS", eventType.negative);
    }
    showResInPanel();
    //else alert("Кризисс минул вас стороной");
}
function banding(){
    var id =randomUserCities();
    var crime =map[id].crime;
    var c;
    if(crime<50){
       c= Math.round(crime*Math.random());
    }
    else c =Math.round((100-crime)*Math.random());
    var pos= Math.round(Math.random()*100);
    var pop=Math.round(Math.random()*c*100);
    var heal =Math.round(Math.random()*c);
    if(pos%30==0)
    {
        addCrime(map[id],c);
        map[id].popularity-=pop;
        addHealth(map[id],-heal);
        updateCityInfoPanel(id);
        //alert("Напала банда");
        showEventPopup("Напала банда", eventType.neutral);
    }
}
function gumKonvoy(){
    var id =randomUserCities();
    var type =Math.random();
    var pos=Math.round(Math.random()*100);
    var crime = Math.round(Math.random()*20);
    var happy = Math.round(Math.random()*20);
    var pop=Math.round(Math.random()*100);
    var heal =Math.round(Math.random()*20);
    if(pos%30==0){
        if(type<0.5)
        {
            addCrime(map[id],crime);
            map[id].popularity-=pop;
            addHealth(map[id],-heal);
            addHappy(map[id],happy);
            updateCityInfoPanel(id);

        }
        else{
            addHealth(map[id],heal);
            addHappy(map[id],happy);
            updateCityInfoPanel(id);
        }
    //alert("Пришол гуманитарный конвой");
    showEventPopup("Пришол гуманитарный конвой", eventType.positive);
    }

}

