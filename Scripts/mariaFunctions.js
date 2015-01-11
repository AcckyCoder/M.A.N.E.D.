/**
 * Created by Marry on 07.01.2015.
 */
    //код,отвечающий за движение облаков
$(document).ready(function () {
    $('#far-clouds').pan({fps: 30, speed: 0.7, dir: 'left', depth: 30});
    window.actions = {
        walkingClouds: function () {
            $('#far-clouds').spSpeed(2);
            return $('#far-clouds').backgroundPosition();
        }
    };
});


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
    var city = getSelectedCity();
    switch (type) {
        case agitatonType.concert: makeConcert(500, city);
            break;
        case agitatonType.charity: makeCharity(2500,city);
            break;
        case agitatonType.addSalary: makeAddSalary(500, city);
            break;
        case agitatonType.humanitarianRelief:makeHumanitarian(2000, city);
            break;
    }

    nextGameStep();
}


function makeHumanitarian(money, city){

    var rest;
    var newHappy;
    var newHealth;

    newHealth=Randomfactors(4,6);
    newHappy=Randomfactors(3,9);
    rest = player.money - money;
    addHappy(city,newHappy);
    addHealth(city,newHealth);
    return "humanitarian";
}

function makeConcert(money, city){
    var rest;
    var newHappy;

    newHappy=Randomfactors(3,9);

    rest = player.money - money;
    addHappy(city,newHappy);
   // map[index_city].popularity+=10;
    player.money=rest;
    return "concert";

}

function makeCharity(money, city){
    var rest;
    var newHappy;
    var newHealth;
    newHealth=Randomfactors(4,6);
    newHappy=Randomfactors(5,10);

    rest = player.money - money;
    addHappy(city,newHappy);
    addHealth(city,newHealth);


}

function makeAddSalary(money, city){ //добавить зарплату

    var rest = player.money - money;
    city.salary+=money;

    var newPopul;
    var newHappy;
    var newHealth;
    newHappy=Randomfactors(5,8);
    newPopul =Randomfactors(10,20);
    newHealth=Randomfactors(4,6);

    addHappy(city,newHappy);
  //  city.popularity += newPopul;
    addHealth(city,newHealth);  //есть деньги, есть возможность купить лекарство
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
    var city = getSelectedCity();
    var start_tax=city.taxes;

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


    city.taxes+=1;

    city.happy-=rand;
  //  addHappy(map[index_city],-rand);//никому от этого не весело :(
    if(city.happy<0){
        city.happy=0;
        city.owner="undefined";
        if(!isPlayerHasMoreCities())
        {
            gameOver(gameOverReason.youHaveNoMoreCities);
        }
    }

    if(city.taxes>100)
        city.taxes=100;

    nextGameStep();
    updateCityInfoPanel(getSelectedCityId());

}

function setCityPlayer() { //присвоить игроку город
    var city = getSelectedCity();
    city.owner = player.name;
    updateCityInfoPanel(getSelectedCityId());
    console.log(isPlayerCell(getSelectedCityId()));
}





