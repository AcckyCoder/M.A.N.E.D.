/**
 * Created by Natalya on 07.01.2015.
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

function getCityIdByName(name)
{
    return map[name].id;
}

function getCityNameById(id)
{
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

function carryOutAgitation(money,index_city,type_number){ //на агитацию  нужны деньги и указать где проходит. Агитация 2х видов
    //либо 1-организовать концерт,либо 2-повысить всем зарплаты
 var rest;//остаток
    //концерт
    if (type_number == 1) {
        rest = player.money - money;
        AddHappy(map[index_city],2);
        map[index_city].popularity+=10;


    } else {
        rest = player.money - money;
        AddHappy(map[index_city],5);
        map[index_city].salary+=money;
        map[index_city].popularity += 10;
        AddHealth(map[index_city],2);  //есть деньги, есть возможность купить лекарство
    }
    player.money=rest;

}
function StartAgitation(type)
{
    var id=GetSelectedCityId();

    if(type==2)
        carryOutAgitation(500,id,2);
    else
        carryOutAgitation(200,id,1);

    NextGameStep();
    UpdatePopupMenu(id);
}

function augmentTax(){

    var id=GetSelectedCityId();
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


    var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

    rand = Math.round(rand);

    while (rand == min - 1 || rand == max + 1) {

        var rand = (min - 1) + Math.random() * ((max + 1) - (min - 1));

        rand = Math.round(rand);

    }

    map[id].taxes+=1;

    map[id].happy-=rand;//никому от этого не весело :(
    if(map[id].happy<0){
        map[id].happy=0;
        map[id].owner="undefined";
    }



    if(map[id].taxes>100)
        map[id].taxes=100;

    NextGameStep();
    UpdatePopupMenu(id);


}

function setCityPlayer(){ //присвоить игроку город

    var id=GetSelectedCityId();

    if(map[id].happy==100){
    map[id].owner=player.name;
    }

    UpdatePopupMenu(id);
    console.log(isPlayerCell(id));
}




