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

function showResourse(){




}