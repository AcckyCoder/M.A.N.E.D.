function crashInSawmill(){// авария на лесопилке
    var id= randomUserCities();
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var trees = player.tree;
    var city = map[id];
    var happy = Randomfactors(3,6);
    if(pos%20==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.tree-=Math.round(Math.random()*trees);
        addHappy(city,-happy);
        KillSomePeople();
        showEventPopup("Произошла авария на лесопилке", eventType.negative);
    }
    showResInPanel();
}


function getAllUserCities()
{
    var cities = [];
    var k = 0;
    for (var i = 0; i < map.length; i++)
    {
        if(map[i].owner == player.name)
        {
            cities[k] = map[i];
        }
    }

    return cities;
}

function KillSomePeople()
{
    var cities = getAllUserCities();

    for(var i=0; i< cities.length; i++)
    {
        cities[i].popularity -= Randomfactors(0,10);
    }
}
