/**
 * Created by Marry on 07.01.2015.
 */


function first_city_id(){
    var found_city=[];
    var k = 0;
    for(var i=0;i<map.length;i++){
        if(map[i].type == "city") {
            found_city[k] = i;
            k++;

        }
    }
    var first = Math.floor(Math.random() * found_city.length);
    console.log(map[found_city[first]].cityName);
    return found_city[first];
}



function getCityNameById(id){
    return map[id].cityName;
}

function startstep(){
  document.getElementById('step').innerText=player.step;
}

function showResourse(){
    document.getElementById('coin_out').innerText= player.money;
    document.getElementById('nameplayer').innerHTML= player.name;
    document.getElementById('step').innerHTML = player.step;
} //показать текущие ресурсы юзера


function StartAgitation(type) {
    var id = getSelectedCityId();
    switch (type) {
        case agitatonType.concert: makeConcert(500, id);
            break;
        case agitatonType.charity: makeCharity(2500,id);
            break;
        case agitatonType.addSalary: makeAddSalary(20, id);
            break;
        case agitatonType.humanitarianRelief:makeHumanitarian(2000,id) //TODO:Добавить функцию гуманитарной помощи
            break;
    }

    nextGameStep();
}


function makeHumanitarian(money, index_city){

    var rest;
    var newHappy;
    var newHealth;

    newHealth=Randomfactors(4,6);
    newHappy=Randomfactors(3,9);
    rest = player.money - money;
    addHappy(map[index_city],newHappy);
    addHealth(map[index_city],newHealth);
}

function makeConcert(money, index_city){
    var rest;
    var newHappy;

    newHappy=Randomfactors(3,9);

    rest = player.money - money;
    addHappy(map[index_city],newHappy);
   // map[index_city].popularity+=10;
    player.money=rest;
}

function makeCharity(money, index_city){
    var rest;
    var newHappy;
    var newHealth;
    newHealth=Randomfactors(4,6);
    newHappy=Randomfactors(5,10);
    rest = player.money - money;
    addHappy(map[index_city],newHappy);
    addHealth(map[index_city],newHealth);


}

function makeAddSalary(money, index_city){ //добавить зарплату

    var rest = player.money - money;
    var newPopul;
    var newHappy;
    var newHealth;
    newHappy=Randomfactors(5,8);
    newPopul =Randomfactors(10,20);
    newHealth=Randomfactors(4,6);

    addHappy(map[index_city],newHappy);
    map[index_city].salary+=money;
    map[index_city].popularity += newPopul;
    addHealth(map[index_city],newHealth);  //есть деньги, есть возможность купить лекарство
    player.money=rest;
}

function Randomfactors(min,max){ //генерация числа в заданном диапазоне

    var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

    rand = Math.round(rand);

    while (rand == min - 1 || rand == max + 1) {

        var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

        rand = Math.round(rand);

    }
    return rand;
}

function augmentTax(){

    var id=getSelectedCityId();
    var start_tax=map[id].taxes;

    if(start_tax<=15)  //больше налог, больше недовольства !
    {
        var min = 1;
        var max = 5;
    }
   else
    {
        var min = 5;
        var max = 8;

    }

    var rand=Randomfactors(min,max);


    map[id].taxes+=1;

    map[id].happy-=rand;
  //  addHappy(map[index_city],-rand);//никому от этого не весело :(
    if(map[id].happy<0){
        map[id].happy=0;
        map[id].owner="undefined";
        if(!isPlayerHasMoreCities())
        {
            gameOver(gameOverReason.youHaveNoMoreCities);
        }
    }

    if(map[id].taxes>100)
        map[id].taxes=100;

    nextGameStep();
    updateCityInfoPanel(id);


}

function setCityPlayer() { //присвоить игроку город

    var id = getSelectedCityId();
    map[id].owner = player.name;
    updateCityInfoPanel(id);
    console.log(isPlayerCell(id));
    if (isNoMoreFreeCities()) {
        gameOver(gameOverReason.winner);
    }

}




