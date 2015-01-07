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
  var firststep=1;
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
 var current_balance;//текущий баланс юзера
 current_balance=player.money;

    if (type_number == 1) {
        rest = current_balance - money;
        map[index_city].happy=+50;
        map[index_city].popularity=+10;


    } else {
        rest = current_balance - money;
        map[index_city].happy+=50;
        map[index_city].salary+=money;
        map[index_city].popularity+=10;
        map[index_city].helth+=10;  //есть деньги, есть возможность купить лекарство

    }
    player.money=rest;

}


function StartAgitation()
{
    var id=GetSelectedCityId();
    carryOutAgitation(400,id,2);
    NextGameStep();
    UpdatePopupMenu(id);
}
