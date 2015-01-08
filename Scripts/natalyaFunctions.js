function GetResourceRusTitle(type) {
    switch (type)
    {
        case resourceType.city.value: return resourceType.city.rusText;
        case resourceType.coal.value: return resourceType.coal.rusText;
        case resourceType.gas.value: return resourceType.gas.rusText;
        case resourceType.grass.value: return resourceType.grass.rusText;
        case resourceType.wheat.value: return resourceType.wheat.rusText;
        case resourceType.production.value: return resourceType.production.rusText;
        case resourceType.rock.value: return resourceType.rock.rusText;
        case resourceType.tree.value: return resourceType.tree.rusText;
        case resourceType.sawMeal.value: return resourceType.sawMeal.rusText;
        case resourceType.mine.value: return resourceType.mine.rusText;
        case resourceType.gasRig.value: return resourceType.gasRig.rusText;
        case resourceType.farm.value: return resourceType.farm.rusText;
        case resourceType.quarry.value: return resourceType.quarry.rusText;


    }
}
/**
 * Created by Natalya on 07.01.2015.
 */


function UpdateResourceInfo(id) {
    document.getElementById('resourceStat').style.display = 'block';
    document.getElementById('resourceTitle').innerHTML = GetResourceRusTitle(map[id].type);
    document.getElementById('resourceCount').innerHTML = map[id].resourceCount;
    document.getElementById('resourceRecovery').innerHTML = map[id].recovery;
    if(map[id].mining != 0)
    {
        document.getElementById('resMine').style.display = 'block';
        document.getElementById('resourceMining').innerHTML = map[id].mining;
        document.getElementById('updateResourceButton').style.display = 'none';
    }
    else
    {
        document.getElementById('resMine').style.display = 'none';
        document.getElementById('updateResourceButton').style.display = 'block';
    }
    document.getElementById('resourceStat').setAttribute('alt', id);
}


function getCityLevel(cityid) {
    return map[cityid].level;
}

function drawPopupMenu(cityid)
{
    document.getElementById('cityTitle').innerHTML = getCityName(cityid);
    UpdatePopupMenu(cityid);
}

var levelUpPrice  = [1000,20000,300000,4000000,50000000,6000000000];

function levelUp(cityID) {

    var level = map[cityID].level;

    if (player.money > levelUpPrice[level - 1]) {
        if (level < 6)
        {
            map[cityID].level++;
            player.money -= levelUpPrice[level-1];
            map[cityID].popularity *= Math.round(map[cityID].level);
            map[cityID].taxes += 1;
            map[cityID].salary += Math.round((map[cityID].salary*map[cityID].level)*0.2);
        }

        UpdatePopupMenu(cityID);
        NextGameStep();
    }
    else
    {
        alert("Недостаточно денег!");
    }
}

function UpdatePopupMenu(cityid) {

    var city = map[cityid];
    var level = city.level;
    document.getElementById('cityImg').style.backgroundImage = "url(\"./icon_and_textures/city" + level + ".png\")";

    document.getElementById('cityLevel').innerHTML = level;
    if (level == 6) {
        document.getElementById('updateButton').style.display = 'none';
    }
    else {
        document.getElementById('updateButton').style.display = 'block';
    }
    document.getElementById('popupMenu').style.display = 'block';
    document.getElementById('popupMenu').setAttribute("alt", cityid);
    document.getElementById('cityProfit').innerHTML = GetCityProfit(cityid);

    document.getElementById('cityPopularity').innerHTML = city.popularity;
    document.getElementById('cityHappy').innerHTML = city.happy;
    document.getElementById('cityHealth').innerHTML = city.health;
    document.getElementById('cityCrime').innerHTML = city.crime;
    document.getElementById('cityUnemployment').innerHTML = city.unemployment;
    document.getElementById('citySalary').innerHTML = city.salary;
    document.getElementById('cityTaxes').innerHTML = city.taxes;
}

function getCityName(id) {
    return map[id].cityName;
}

function popupMenuClose() {
    document.getElementById('popupMenu').style.display = 'none';
    document.getElementById('popupMenu').setAttribute('alt', "");
}

function resourceMenuClose() {
    document.getElementById('resourceStat').style.display = 'none';
    document.getElementById('resourceStat').setAttribute('alt', "");
}

function GetCityProfit(cityId)
{
    var city = map[cityId];

    var workingPeople =  city.popularity * (city.unemployment/100.0);
    var theirSalary = city.salary * (city.taxes/100.0);
    var cityProfit = Math.round(workingPeople) * theirSalary;
    return Math.round(cityProfit);
}


function GameOver(reason) {
    alert(reason);
    ShowMenu('game', 'main');
}

function destroyCity() {

    return new {
        "resourceCount": 0,
        "recovery": 0,
        "resourceType": 0,
        "type": "grass",
        "texture": "grass.jpg"
    };
}

function isPlayerHasMoreCities() {
    console.log("Ich brauche diese Funktion! " + arguments.callee.name)
}
function updateCityParameters(city) {

    //вычисляем вероятность возникновения события/
    var possible = Math.round(Math.random() * 100);

    if (possible % 5 == 0) {
        //если здоровье горожан в порядке, то рождаются новые горожане
        if (city.health >= 50) {
            var born = Math.round(Math.random() * city.health);
            city.popularity+=born;
            AddHappy(city, 1);
        }
        else {
            //иначе они дохнут
            var died = Math.round(Math.random() * (50 - city.health));
            city.popularity-= died;
            AddHappy(city, -1);

            //если подохли все
            if (city.popularity <= 0) {
                //и у игрока не осталось городов
                if (!isPlayerHasMoreCities())
                    GameOver(gameOverReason.everyBodyDie);
                else
                //или просто стираем город с лица земли
                    city = destroyCity();
            }
        }
    }


    //если в городе высоая преступность
    if (city.crime > 50) {
        possible = Math.round(Math.random() * 100);
        if (possible % 5 == 0) {
            //кто-то может погибнуть
            var died = Math.round(Math.random() * (50 - city.crime));
            city.popularity-= died;
            if (city.popularity <= 0) {
                if (!isPlayerHasMoreCities())
                    GameOver(gameOverReason.everyBodyDie);
                else
                    city = destroyCity();
            }

            //и люди от этого становятся несчастнее
                AddHappy(city, -1);
        }
    }
    //а если креминогенная обстановка хороша
    else if (city.crime < 30) {
            AddHappy(city, 1);
        }



    if (city.taxes > 15)
    {
        Math.round(Math.random() * 100);
        if(possible%5 == 0)
        {
            AddHappy(city, -1);
            city.popularity -= Math.round(Math.random()*15);
        }
    }
    else if(city.taxes <= 15)
    {
        AddHappy(city, 1);
        city.popularity += Math.round(Math.random()*15);
    }

    if(city.happy > 50)
    {
        AddUnemployment(city, -1);
    }
    else
    {
        AddUnemployment(city, 1);
    }

    if(city.unemployment < 50)
    {
        AddCrime(city, -1);
        AddHealth(city, 1);
    }
    else
    {
        AddCrime(city, 1);
        AddHealth(city, -1);
    }

}

function AddHappy(city, count) {

    city.happy += count;


    if (city.happy > 100)
    {
        city.happy = 100;
    }

    if(city.happy < 0)
    {
        city.happy = 0;
    }
}

function AddUnemployment(city, count) {

        city.unemployment += count;

    if (city.unemployment > 100)
    {
        city.unemployment = 100;
    }
    if (city.unemployment < 0)
    {
        city.unemployment = 0;
    }
}


function AddHealth (city, count) {

        city.health += count;

    if (city.health > 100)
    {
        city.health = 100;
    }
    if (city.health < 0)
    {
        city.health = 0;
    }
}


function AddCrime (city, count) {

    city.crime += count;


    if (city.crime > 100) {
        city.crime = 100;
    }
    if (city.crime < 0)
        city.crime = 0;


}

function updateResourceParameters(resource) {
    resource.resourceCount += resource.recovery;
}


function updateProductionParameters(production) {

}

function isNoMoreFreeCities() {
    for (var i = 0; i < map.length; i++) {
        if (map[i].type == resourceType.city.value) {
            if (map[i].owner == "undefined") {
                return false;
            }
        }
    }

    return true;
}


function NextGameStep() {
    for (var i = 0; i < map.length; i++) {
        if (map[i].type == resourceType.city.value) {
            if (map[i].owner == player.name) {
                updateCityParameters(map[i]);
                var profit = GetCityProfit(i);
                console.log(map[i].cityName + ": " + profit);
                player.money += profit;
            }
        }
        else if (map[i].type == resourceType.production.value) {
            updateProductionParameters(map[i]);

        }
        else {
            updateResourceParameters(map[i]);
        }

    }


    if (isNoMoreFreeCities()) {
        GameOver(gameOverReason.winner);
    }

    if (player.money <= 0) {
        GameOver(gameOverReason.bankrot);
    }

    player.step++;
    showResourse();
    UpdatePopupMenu(GetSelectedCityId());
}


function GetSelectedCityId() {
    return document.getElementById('popupMenu').getAttribute('alt');
}

function GetSelectedResourceId() {
    return document.getElementById('resourceStat').getAttribute('alt');
}


function UpdateResource(resourceId) {

    if (player.money > 10000) {

        var resource = map[resourceId];

        if (resource.type == resourceType.coal.value) {
            resource.type = resourceType.mine.value;
        }
        if (resource.type == resourceType.wheat.value) {
            resource.type = resourceType.farm.value;
        }
        if (resource.type == resourceType.rock.value) {
            resource.type = resourceType.quarry.value;
        }
        if (resource.type == resourceType.gas.value) {
            resource.type = resourceType.gasRig.value;
        }
        if (resource.type == resourceType.tree.value) {
            resource.type = resourceType.sawMeal.value;

        }


        resource.texture = resource.type.toString() + ".jpg";
        resource.owner = player.name;
        resource.mining = Math.round(Math.random() * 100);

        UpdateResourceInfo(resourceId);
        NextGameStep();
        createHexGrid();
    }
    else
    {
        alert(gameOverReason.bankrot);
    }
}