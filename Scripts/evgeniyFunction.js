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
    var ncities=[];
    var retCity;
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].owner=='undefined'){
            ncities[k] = i;
            k++;
        }
    }
    if(ncities.length==1){
        retCity =0;
    }else retCity = Math.round(Math.random() * ncities.length);
    while(!map[ncities[retCity]].cityName)
    {
        randomNotUserCities();
    }
    console.log(!map[ncities[retCity]].cityName);
    return ncities[retCity];
}
function randomUserCities(){
    var cities=[];
    //cities.length=0;
    var k = 0;
    var retCity=0;
    do{
    for(var i=0;i<map.length;i++){
        if(map[i].owner==player.name){
            console.log(map[i].owner);
            cities[k] = i;
            k++;
        }
    }
    console.log(cities.length);
    console.log(k);
        if(cities.length==1){
            retCity =0;
        }else retCity = Math.round(Math.random() * cities.length);
    console.log(map[cities[retCity]].cityName);
    }while(!map[cities[retCity]].cityName);

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
    if(pos%25==0)
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
    var pos=Math.round(Math.random()*100);
    var pop=Math.round(Math.random()*c*100);
    var heal =Math.round(Math.random()*c);
    if(pos%35==0)
    {
        addCrime(map[id],c);
        map[id].popularity-=pop;
        addHealth(map[id],-heal);
      // updateCityInfoPanel(id);
        //alert("Напала банда");
        showEventPopup("На город "+map[id].cityName +" напала банда из города "+map[randomNotUserCities()].cityName, eventType.neutral);
    }
   // updateCityInfoPanel(id);
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
            //updateCityInfoPanel(id);

        }
        else{
            addHealth(map[id],heal);
            addHappy(map[id],happy);
           //updateCityInfoPanel(id);
        }
    //alert("Пришол гуманитарный конвой");
    showEventPopup("В город "+map[id].cityName+ " пришол гуманитарный конвой из города "+map[randomNotUserCities()].cityName, eventType.positive);
    }
}
function cityResourcesNeeds(){
    var id = getSelectedCityId();
    document.getElementById('cityTrees').innerHTML = map[id].treeNeeds;
    document.getElementById('cityCoals').innerHTML=map[id].coalNeeds;
    document.getElementById('cityWheats').innerHTML=map[id].wheatNeeds;
    document.getElementById('cityGas').innerHTML=map[id].gasNeeds;
    document.getElementById('cityRocks').innerHTML=map[id].rockNeeds;
}

