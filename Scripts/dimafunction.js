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
