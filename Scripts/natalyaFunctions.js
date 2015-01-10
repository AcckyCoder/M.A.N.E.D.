function getResourceRusTitle(type) {
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


function updateResourceInfoPanel(id) {
    document.getElementById('resourceStat').style.display = 'block';
    document.getElementById('resourceTitle').innerHTML = getResourceRusTitle(map[id].type);
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

function drawCityInfoPanel(cityid)
{
    document.getElementById('cityTitle').innerHTML = getCityName(cityid);
    updateCityInfoPanel(cityid);
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
            map[cityID].treeNeeds += map[cityID].level * Math.round(Math.abs(Math.random()*100 - Math.random()*50));
            map[cityID].coalNeeds += map[cityID].level* Math.round(Math.abs(Math.random()*100 - Math.random()*50));
            map[cityID].wheatNeeds += map[cityID].level* Math.round(Math.abs(Math.random()*100 - Math.random()*50));
            map[cityID].rockNeeds += map[cityID].level* Math.round(Math.abs(Math.random()*100 - Math.random()*50));
            map[cityID].gasNeeds += map[cityID].level* Math.round(Math.abs(Math.random()*100 - Math.random()*50));

        }

        updateCityInfoPanel(cityID);
        nextGameStep();
    }
    else
    {
        alert("Недостаточно денег!");
    }
}

function updateCityInfoPanel(cityid) {

    var city = map[cityid];
    var level = city.level;
    document.getElementById('cityImg').style.backgroundImage = "url(\"./icon_and_textures/city" + level + ".png\")";

    document.getElementById('cityLevel').innerHTML = level;
    document.getElementById('captureTheCityButton').style.display = 'block';


    if(city.owner == player.name) {
        if (level == 6) {
            document.getElementById('updateButton').style.display = 'none';
        }
        else {
            document.getElementById('updateButton').style.display = 'block';
        }

        document.getElementById('salaryAddButton').style.display = 'block';
        document.getElementById('taxesAddButton').style.display = 'block';
        document.getElementById('captureTheCityButton').style.display = 'none';
        document.getElementById('ownerText').style.display = 'block';
        document.getElementById('cityOwner').innerHTML = player.name;
        document.getElementById('salaryProfitText').style.display = 'block';
        document.getElementById('cityProfit').innerHTML = getCityProfit(cityid);
    }
    else {

        if (city.happy == 100) {
            document.getElementById('captureTheCityButton').style.display = 'block';
        }
        else
        {
            document.getElementById('captureTheCityButton').style.display = 'none';
        }

        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('salaryAddButton').style.display = 'none';
        document.getElementById('taxesAddButton').style.display = 'none';
        document.getElementById('ownerText').style.display = 'none';
    }


    document.getElementById('popupMenu').style.display = 'block';
    document.getElementById('popupMenu').setAttribute("alt", cityid);


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

function getCityProfit(cityId)
{
    var city = map[cityId];

    var workingPeople =  city.popularity * (city.unemployment/100.0);
    var theirSalary = city.salary * (city.taxes/100.0);
    var cityProfit = Math.round(workingPeople) * theirSalary;
    return Math.round(cityProfit);
}


function gameOver(reason) {
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
    for(var i = 0; i<map.length;i++) {
        if (map[i].type == resourceType.city)
        {
            if(map[i].owner == player.name)
            {
                return true;
            }
        }
    }

        return false;
}
function updateCityGameStep(city) {

    //вычисляем вероятность возникновения события/
    var possible = Math.round(Math.random() * 100);

    if (possible % 5 == 0) {
        //если здоровье горожан в порядке, то рождаются новые горожане
        if (city.health >= 50) {
            var born = Math.round(Math.random() * city.health);
            city.popularity+=born;
            addHappy(city, 1);
        }
        else {
            //иначе они дохнут
            var died = Math.round(Math.random() * (50 - city.health));
            city.popularity-= died;
            addHappy(city, -1);

            //если подохли все
            if (city.popularity <= 0) {
                //и у игрока не осталось городов
                if (!isPlayerHasMoreCities())
                    gameOver(gameOverReason.everyBodyDie);
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
                    gameOver(gameOverReason.everyBodyDie);
                else
                    city = destroyCity();
            }

            //и люди от этого становятся несчастнее
                addHappy(city, -1);
        }
    }
    //а если креминогенная обстановка хороша
    else if (city.crime < 30) {
            addHappy(city, 1);
        }



    if (city.taxes > 15)
    {
        Math.round(Math.random() * 100);
        if(possible%5 == 0)
        {
            addHappy(city, -1);
            city.popularity -= Math.round(Math.random()*15);
        }
    }
    else if(city.taxes <= 15)
    {
        addHappy(city, 1);
        city.popularity += Math.round(Math.random()*15);
    }

    if(city.happy > 50)
    {
        addUnemployment(city, -1);
    }
    else
    {
        addUnemployment(city, 1);
    }

    if(city.unemployment < 50)
    {
        addCrime(city, -1);
        addHealth(city, 1);
    }
    else
    {
        addCrime(city, 1);
        addHealth(city, -1);
    }


    player.coal -= city.coalNeeds;
    if(player.coal <0)
        player.coal = 0;

    player.wheat -= city.wheatNeeds;
    if(player.coal <0)
        player.coal = 0;

    player.gas -= city.gasNeeds;
    if(player.coal <0)
        player.coal = 0;

    player.rock -= city.rockNeeds;
    if(player.coal <0)
        player.coal = 0;

    player.tree -= city.treeNeeds;
    if(player.coal <0)
        player.coal = 0;

}

function addHappy(city, count) {

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

function addUnemployment(city, count) {

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


function addHealth (city, count) {

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


function addCrime (city, count) {

    city.crime += count;


    if (city.crime > 100) {
        city.crime = 100;
    }
    if (city.crime < 0)
        city.crime = 0;


}

function updateResourceGameStep(resource) {
    resource.resourceCount += resource.recovery;
}


function updateProductionGameStep(production) {
    production.resourceCount += production.recovery;
    production.resourceCount -= production.mining;

    if(production.resourceCount < 0)
    {
        production.resourceCount = 0;
    }

    switch (production.type)
    {
        case resourceType.farm.value: player.wheat += production.mining;
            break;
        case resourceType.mine.value: player.coal += production.mining;
            break;
        case resourceType.quarry.value: player.rock += production.mining;
            break;
        case resourceType.sawMeal.value: player.tree += production.mining;
            break;
        case resourceType.gasRig.value: player.gas += production.mining;
            break;
    }
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


function nextGameStep() {
    for (var i = 0; i < map.length; i++) {
        if (map[i].type == resourceType.city.value) {
            if (map[i].owner == player.name) {
                updateCityGameStep(map[i]);
                var profit = getCityProfit(i);
                console.log(map[i].cityName + ": " + profit);
                player.money += profit;
            }
        }
        else if (map[i].type == resourceType.production.value) {
            updateProductionGameStep(map[i]);

        }
        else {
            updateResourceGameStep(map[i]);
        }

    }


    if (isNoMoreFreeCities()) {
        gameOver(gameOverReason.winner);
    }

    if (player.money <= 0) {
        gameOver(gameOverReason.bankrupt);
    }
    addLogText('Das ist ' + player.step + ' Schritt')
    player.step++;
    showResInPanel();
    economiCrizes();
    banding();
    gumKonvoy();
    showResourse();
    updateCityInfoPanel(getSelectedCityId());
}


function getSelectedCityId() {
    return document.getElementById('popupMenu').getAttribute('alt');
}

function getSelectedResourceId() {
    return document.getElementById('resourceStat').getAttribute('alt');
}


function updateResourceToProduction(resourceId) {

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

        updateResourceInfoPanel(resourceId);
        nextGameStep();
        createHexGrid();
    }
    else
    {
        alert(gameOverReason.bankrupt);
    }
}


function changeLogPanelState()
{
    if(document.getElementById('logPanel').getAttribute('alt') == 'open')
    {
        if(document.getElementById('logPanel').classList.contains('showUpPanel'))
        {
            document.getElementById('logPanel').classList.remove('showUpPanel');
        }
        document.getElementById('logPanel').classList.add('closeUpPanel');
        document.getElementById('logPanel').setAttribute('alt','close');
        document.getElementById('closeLogPanelButton').style.backgroundImage = 'url("./images/openlogbutton.png")';
    }
    else
    {
        if(document.getElementById('logPanel').classList.contains('closeUpPanel'))
        {
            document.getElementById('logPanel').classList.remove('closeUpPanel');
        }
        document.getElementById('logPanel').classList.add('showUpPanel');
        document.getElementById('logPanel').setAttribute('alt', 'open');
        document.getElementById('closeLogPanelButton').style.backgroundImage = 'url("./images/closelogbutton.png")';
    }
}


function addLogText(text) {
    var x = document.getElementById("logText");
    var option = document.createElement("option");
    option.text = text;

    var length = x.options.length;

    //подчщаем лог
    if(length == 30)
    {
        x.options[29] = null;
    }

    x.add(option, x[0]);

}



function hideEventPopup()
{
    document.getElementById('eventPopup').style.display = 'none';
}

function showEventPopup(text, event) {
    var popup = document.getElementById('eventPopup');

    popup.style.display = 'block';

    document.getElementById('eventText').innerHTML = text;

    if(event == eventType.negative)
    {
        popup.style.backgroundColor = 'rgba(227, 10, 0, 0.75)';
    }
    else if(event == eventType.neutral)
    {
        popup.style.backgroundColor = 'rgba(255, 216, 61, 0.75)';
    }
    else if(event == eventType.positive)
    {
        popup.style.backgroundColor = 'rgba(16, 151, 0, 0.75)';
    }
    else
    {
        popup.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    }


    addLogText(text);
}