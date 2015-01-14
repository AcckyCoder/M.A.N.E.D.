/**
 * Created by Dmitriy on 09.01.2015.
 */

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