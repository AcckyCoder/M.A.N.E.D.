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

function randomNotUserCities(){//возврашает случайный город не пренадлежаший игроку
    var cities=[];
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].type==resourceType.city.value){
        if(map[i].owner=='undefined'){
            cities[k] = i;
            k++;
        }
    }
    }
    var retCity = Math.floor(Math.random() * cities.length);
    console.log(map[cities[retCity]].cityName);
    return cities[retCity];
}
function randomUserCities(){//возврашает случайный город  пренадлежаший игроку
    var cities=[];
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].type==resourceType.city.value){
        if(map[i].owner==player.name){
            console.log(map[i].owner);
            cities[k] = i;
            k++;
        }
        }
    }
    var retCity = Math.floor(Math.random() * cities.length);
    console.log(map[cities[retCity]].cityName);
    return cities[retCity];
}
function userCitiesCount(){//возвращает количество городов, которые под контролем юзера
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].type==resourceType.city.value){
            if(map[i].owner==player.name){
                k++;
            }
        }
    }
    return k;
}

function economiCrizes(possible){///экономический кризис, забирает у игрока рандомное количество ресурсов,
                                    // но не больше чем у немго есть
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var coal = player.coal;
    var trees = player.tree;
    var wheat = player.wheat;
    var gas = player.gas;
    var rock = player.rock;
    if(pos%possible==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.coal -= Math.round(Math.random()*coal);
        player.tree-=Math.round(Math.random()*trees);
        player.wheat-=Math.round(Math.random()*wheat);
        player.gas-=Math.round(Math.random()*gas);
        player.rock-=Math.round(Math.random()*rock);
        //alert("THERA AA CRIZESSS");
        showEventPopup("КРИЗИС", eventType.negative);
    }
    showResInPanel();
    //else alert("Кризисс минул вас стороной");
}
function banding(possible){// нападение банды на случайный город пренадлежаший игроку,увеличивает преступность,
                            // уменьшает население и уровень здоровья
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
    if(pos%possible==0)
    {
        addCrime(map[id],c);
        map[id].popularity-=pop;
        addHealth(map[id],-heal);
        //alert("Напала банда");
        showEventPopup("На город "+map[id].cityName+ " напала банда из города "+map[randomNotUserCities()].cityName, eventType.neutral);
    }
}
function gumKonvoy(possible){//гуманитарынй конвой, бывает двух типов.
    var id =randomUserCities();
    var type =Math.random();
    var pos=Math.round(Math.random()*100);
    var crime = Math.round(Math.random()*20);
    var happy = Math.round(Math.random()*20);
    var pop=Math.round(Math.random()*100);
    var heal =Math.round(Math.random()*20);
    if(pos%possible==0){
        if(type<0.5)
        {
            addCrime(map[id],crime);
            map[id].popularity-=pop;
            addHealth(map[id],-heal);
            addHappy(map[id],happy);
        }
        else{
            addHealth(map[id],heal);
            addHappy(map[id],happy);
        }
    //alert("Пришол гуманитарный конвой");
    showEventPopup("В город "+map[id].cityName+" пришел гуманитарный конвой из города "+map[randomNotUserCities()].cityName, eventType.positive);
    }
}
function allCitiesAreUser()// присваеваем все города игроку
{
    for(var i=0; i<map.length;i++)
    {
        if(map[i].type==resourceType.city.value)
        map[i].owner=player.name;
    }
}
function police(money){//проверка города полицией, забирает деньги, уменшает преступность в городе, увеличивает счастья
    var id = getSelectedCityId();
    var rest = player.money-money;
    var crime = Math.round(map[id].crime*Math.random());
    addCrime(map[id],-crime);
    addHappy(map[id],1);
    nextGameStep();
    updateCityInfoPanel(id);
}
function envyToOtherCity(step){//зависть к другим городам которые под контролем юзера
    var citiesCount=userCitiesCount();
    console.log(citiesCount);
    var cities=[];
    var k=0;
    if(citiesCount>1){
        do{
            var city1=randomUserCities();
            var city2 = randomUserCities();
        }while(map[city1].cityName==map[city2].cityName);
       console.log(map[city1].cityName);
       console.log(map[city2].cityName);
        if(player.step%step==0){
            if(map[city1].happy>map[city2].happy || map[city2].happy>map[city1].happy||map[city2].taxes>map[city1].taxes||map[city1].taxes>map[city2].taxes)
            {
                var maxHappy;
                var maxTaxes;
                if(map[city1].happy>map[city2].happy){
                    maxHappy=map[city1].happy;
                    //map[city2].happy-=Math.round(Math.random()*maxHappy);
                }
                else {
                    maxHappy =map[city2].happy;
                    //map[city1].happy-=Math.round(Math.random()*maxHappy);
                }
                if(map[city1].taxes>map[city2].taxes){
                    map[city1].happy-=Math.round(Math.random()*maxHappy);
                }
                else {
                    map[city2].happy-=Math.round(Math.random()*maxHappy);
                }
                showEventPopup("Ваши города "+map[city1].cityName+ " и "+ map[city2].cityName+ " завидуют друг другу", eventType.negative);
            }
        }
    }
}
