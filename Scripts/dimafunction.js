

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

var SoundList = []; // список звуков

AddSound('click', 'Audio/click_btn.ogg') // добавление звука в список

function AddSound(id, path){
    //проверка поддержки браузером воспроизведения звуков
    if(window.HTMLAudioElement){
        SoundList[id] = document.createElement('audio');	//создаем элемент AUDIO
        SoundList[id].id = id;								//найзначаем ID для елемента
        SoundList[id].src = path;							//указываем путь к звуку
        SoundList[id].load();								//загрружаем звук
    }else{
        if(window.console && console.error("Error: Ваш браузер не поддерживает HTML5."));
    }
}

function Play(id){
    if(window.HTMLAudioElement){
        SoundList[id].src = SoundList[id].src; // избавляемся от багов в моем браузере ((с) Дима)
        SoundList[id].play();		// воспроизовдим звук по его ID в списке
        console.log('plaed: ' +id); // для тестирования
    }
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

function crashInMine(){// авария на шахте
    var id= randomUserCities();
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var coal = player.coal;
    var city = map[id];
    var happy = Randomfactors(4,9);
    if(pos%20==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.coal-=Math.round(Math.random()*coal);
        addHappy(city,-happy);
        KillSomePeople()
        showEventPopup("Произошла авария на шахте", eventType.negative);
    }
    showResInPanel();
}

function tornado(){// торнадо
    var id= randomUserCities();
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var coal = player.coal;
    var trees = player.tree;
    var wheat = player.wheat;
    var gas = player.gas;
    var rock = player.rock;
    var city = map[id];
    var happy = Randomfactors(20,30);
    if(pos%50==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.coal -= Math.round(Math.random()*coal);
        player.tree-=Math.round(Math.random()*trees);
        player.wheat-=Math.round(Math.random()*wheat);
        player.gas-=Math.round(Math.random()*gas);
        player.rock-=Math.round(Math.random()*rock);
        addHappy(city,-happy);
        showEventPopup("На город "+map[id].cityName+" обрушилось торнадо", eventType.negative);
    }
    showResInPanel();
}

function flood(){// наводнение
    var id= randomUserCities();
    var pos=Math.round(Math.random()*100);
    var money = player.money;
    var coal = player.coal;
    var trees = player.tree;
    var wheat = player.wheat;
    var gas = player.gas;
    var rock = player.rock;
    var city = map[id];
    var happy = Randomfactors(10,20);
    if(pos%50==0)
    {
        player.money -= Math.round(Math.random()*money);
        player.coal -= Math.round(Math.random()*coal);
        player.tree-=Math.round(Math.random()*trees);
        player.wheat-=Math.round(Math.random()*wheat);
        player.gas-=Math.round(Math.random()*gas);
        player.rock-=Math.round(Math.random()*rock);
        addHappy(city,-happy);
        showEventPopup("На город "+map[id].cityName+" обрушилось наводнение", eventType.negative);
    }
    showResInPanel();
}

function fundingSchool(){// финансирование школ, больниц.....
    var id = getSelectedCityId();
    var rest = player.money-100;
    //var crime = Math.round(map[id].crime*Math.random());
    var unemployment = Randomfactors(1,2);
    player.wheat-=100;
    player.coal-=100;
    player.tree-=100;
    player.gas-=100;
    addUnemployment(map[id],-unemployment);
    addHappy(map[id],1);
    showResInPanel();
    nextGameStep();
    updateCityInfoPanel(id);
}

function improveInfrastr(){// улучшение инфраструктуры....
    var id = getSelectedCityId();
    var rest = player.money-100;
    //var crime = Math.round(map[id].crime*Math.random());
    var unemployment = Randomfactors(1,2);
    player.wheat-=100;
    player.coal-=100;
    player.gas-=100;
    addHappy(map[id],3);
    showResInPanel();
    nextGameStep();
    updateCityInfoPanel(id);
}