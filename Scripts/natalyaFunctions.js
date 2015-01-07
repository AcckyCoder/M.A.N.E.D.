function GetResourceRusTitle(type) {
    switch (type)
    {
        case resourceType.city.value: return resourceType.city.rusText;
        case resourceType.coal.value: return resourceType.coal.rusText;
        case resourceType.gas.value: return resourceType.gas.rusText;
        case resourceType.grass.value: return resourceType.grass.rusText;
        case resourceType.production.value: return resourceType.production.rusText;
        case resourceType.rock.value: return resourceType.rock.rusText;
        case resourceType.tree.value: return resourceType.tree.rusText;
        case resourceType.wheat.value: return resourceType.wheat.rusText;
    }
}
/**
 * Created by Natalya on 07.01.2015.
 */


function showRecourceInfo(id) {
    document.getElementById('resourceStat').style.display = 'block';
    document.getElementById('resourceTitle').innerHTML = GetResourceRusTitle(map[id].type);
    document.getElementById('resourceCount').innerHTML = map[id].resourceCount;
    document.getElementById('resourceRecovery').innerHTML = map[id].recovery;
}


function getCityLevel(cityid) {
    return map[cityid].level;
}

function drawPopupMenu(cityid)
{
    document.getElementById('cityTitle').innerHTML = getCityName(cityid);
    UpdatePopupMenu(cityid);
}

var levelUpPrice  = [1000,2000,3000,4000,5000,6000];

function levelUp(cityID) {

    var level = map[cityID].level;

    if (player.money > levelUpPrice[level - 1]) {
        if (level < 6)
        {
            map[cityID].level++;
            player.money -= levelUpPrice[level-1];
        }

        UpdatePopupMenu(cityID);
    }
    else
    {
        alert("Недостаточно денег!");
    }

    NextGameStep();
}

function UpdatePopupMenu(cityid) {

    var city = map[cityid];
    var level = city.level;
    var path = "url(\"./icon_and_textures/city" + level + ".png\")";
    document.getElementById('cityImg').style.backgroundImage = path;

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

function GetCityProfit(cityId)
{
    var city = map[cityId];

    var workingPeople =  city.popularity * (city.unemployment/100.0);
    var theirSalary = city.salary * (city.taxes/100.0);
    var cityProfit = workingPeople * theirSalary;
    return cityProfit;
}


function updateCityParameters(city) {

}


function updateResourceParameters(resource) {
    resource.resourceCount += resource.recovery;
}


function updateProductionParameters(production) {

}

function NextGameStep()
{
    for(var i = 0; i<map.length; i++){
        if(map[i].type == resourceType.city)
        {
            updateCityParameters(map[i]);
        }
        else if(map[i].type == resourceType.production)
        {
            updateProductionParameters(map[i]);
        }
        else
        {
            updateResourceParameters(map[i]);
        }

    }

    player.step++;
    showResourse();
}


function GetSelectedCityId()
{
    return document.getElementById('popupMenu').getAttribute('alt');
}