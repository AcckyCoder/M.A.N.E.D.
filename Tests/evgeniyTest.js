/**
 * Created with JetBrains PhpStorm.
 * User: outdream
 * Date: 16.01.15
 * Time: 21:20
 * To change this template use File | Settings | File Templates.
 */
describe("Вернуть случаный город подконтрольный игроку", function() {

    it("Вернуть id города", function(){
        map[first_city_id()].owner = player.name;
        var city=randomUserCities();
        expect(city).toBeDefined();//значение должно быть определено
    });

});
describe("Вернуть случаный город не подконтрольный игроку", function() {

    it("Вернуть id города", function(){
        var city=randomNotUserCities();
        expect(city).toBeDefined();//значение должно быть определено
    });
    it("Значение owner = undefined",function(){
        var city=randomNotUserCities();
        var name=city.owner;
        expect(name).toBeUndefined();//значение не определено
    });
});
describe("Количество городов под контролем игрока", function() {

    it("Вернуть число городов которые находяться под контролем", function(){
        var count = userCitiesCount();
        expect(count).toBeGreaterThan(0);//значение должно быть определено
    });

});
describe("Экономический кризис", function() {

    it("Уменьшение денег", function(){
        economiCrizes(1);
        var money = player.money;
        expect(money).toBeLessThan(50000);//значение должно быть определено
    });
    it("Уменьшение угля", function(){
        economiCrizes(1);
        var coal = player.coal;
        expect(coal).toBeLessThan(50000);//значение должно быть определено
    });
    it("Уменьшение пшеницы", function(){
        economiCrizes(1);
        var wheat = player.wheat;
        expect(wheat).toBeLessThan(50000);//значение должно быть определено
    });
    it("Уменьшение дерева", function(){
        economiCrizes(1);
        var trees = player.tree;
        expect(trees).toBeLessThan(50000);//значение должно быть определено
    });
    it("Уменьшение камня", function(){
        economiCrizes(1);
        var rock = player.rock;
        expect(rock).toBeLessThan(50000);//значение должно быть определено
    });
    it("Уменьшение газа", function(){
        economiCrizes(1);
        var gas = player.gas;
        expect(gas).toBeLessThan(50000);//значение должно быть определено
    });
});
describe("Нападение бынды", function() {

    it("Увеличение уровня преступности", function(){
        var city = first_city_id();
        map[city].owner = player.name;
        banding(1,city);
        var crime = map[city].crime;
        expect(crime).toBeGreaterThan(50);//значение должно быть определено
    });
    it("Уменьшение количества жителей", function(){
        var city = first_city_id();
        map[city].owner = player.name;
        var pop = map[city].popularity;
        banding(1,city);
        var popAfterBand = map[city].popularity;
        expect(popAfterBand).toBeLessThan(pop);//значение должно быть определено
    });
    it("Уменьшение уровня здоровья", function(){
        var city = first_city_id();
        map[city].owner = player.name;
        var health = map[city].health;
        banding(1,city);
        var healthAfter = map[city].health;
        expect(healthAfter).toBeLessThan(health);//значение должно быть определено
    });

});
describe("Гуманитарынй конвой", function() {

    it("Увелечение уровня счастья", function(){
        var city = first_city_id();
        map[city].owner = player.name;
        var hyp1 = map[city].happy;
        gumKonvoy(1,city);
        var happy = map[city].happy;
        expect(happy).toBeGreaterThan(hyp1);//значение должно быть определено
    });

});
describe("Присвоить все города игроку", function() {

    it("Возникновение", function(){
       var result = allCitiesAreUser();
        expect(result).toBeTruthy();//значение должно быть определено
    });

});


describe ("Проверка полиции",function(){

    it( "Уровень преступности падает", function(){
        var city = first_city_id();
        map[city].owner = player.name;
        var crime = map[city].crime;
        police(500,city);
        var crimeAfterPolice = map[city].crime;
        expect(crimeAfterPolice).toBeLessThan(crime);

    });


});
describe ("Функция envyToOtherCity",function(){


    it( "Уровень счастья в обиженом городе падает", function(){
        var city1 = first_city_id();
        var city2 = first_city_id();
        map[city1].owner = player.name;
        map[city2].owner = player.name;
        map[city1].taxes+=1;
        var happyCity1 = map[city1].happy;
        envyToOtherCity(1,city1,city2);
        var happyCity1After = map[city1].happy;
        expect(happyCity1After).toBeLessThan(happyCity1);
    });


});