/**
 * Created by Merry on 10.01.2015.
 */

describe("Присвоить начальный город", function() {

    it(" Вернуть id первого города", function(){
        var city=first_city_id();
        expect(city).toBeDefined();//значение должно быть определено
    });

});

describe ("Присвоить город игроку",function(){

    var city = {
        "cityName": "Ужгород",
        "level": 1,
        "health": 100,
        "taxes": 12,
        "crime": 50,
        "unemployment": 50,
        "happy": 50,
        "popularity": 2000,
        "salary": 100,
        "owner": "undefined",
        "treeNeeds": 100,
        "wheatNeeds": 100,
        "coalNeeds": 100,
        "gasNeeds": 100,
        "rockNeeds": 100,
        "type": "city",
        "texture": "City.png"
    };


    it("присвоить", function(){

        city.owner = player.name;
        var name=city.owner;
        expect(name).toBe(player.name);//значение должно быть определено
    });
});

describe ("Вернуть по id  имя города",function(){

  /*  var map = [                  тестовая карта
        {
            "cityName": "Ивано-Франковск",
            "level": 1,
            "health": 50,
            "taxes": 12,
            "crime": 50,
            "unemployment": 50,
            "happy": 50,
            "popularity": 2000,
            "salary": 100,
            "owner": "undefined",
            "treeNeeds": 100,
            "wheatNeeds": 100,
            "coalNeeds": 100,
            "gasNeeds": 100,
            "rockNeeds": 100,
            "type": "city",
            "texture": "City.png"
        },

        {
            "cityName": "Ужгород",
            "level": 1,
            "health": 50,
            "taxes": 12,
            "crime": 50,
            "unemployment": 50,
            "happy": 50,
            "popularity": 2000,
            "salary": 100,
            "owner": "undefined",
            "treeNeeds": 100,
            "wheatNeeds": 100,
            "coalNeeds": 100,
            "gasNeeds": 100,
            "rockNeeds": 100,
            "type": "city",
            "texture": "City.png"
        },
        {
            "resourceCount": 86494,
            "recovery": 48,
            "resourceType": 0,
            "mining": 0,
            "type": "tree",
            "texture": "trees.jpg"
        } ……*/





    it( "1-Ужгород", function(){
        var name=getCityNameById(1);
        expect(name).toBe("Ужгород");
    });

    it( "0-Ивано-Франковск", function(){
        var name=getCityNameById(0);
        expect(name).toBe("Ивано-Франковск");
    });

    it( "2-undefined", function(){
        var name=getCityNameById(2);
        expect(name).toBe(undefined);
    });

});

describe ("Генерация чисел",function(){

    it( "От 5 до 10", function(){
        var generate=Randomfactors(5,10);
        expect(generate).toBeGreaterThan(4);
        expect(generate).toBeLessThan(11);
    });


    it( "От 1 до 2", function(){
        var generate=Randomfactors(1,2);
        expect(generate).toBeGreaterThan(0);
        expect(generate).toBeLessThan(3);
    });
});

describe ("Функция makeConcert()",function(){

    var city = {
    "cityName": "Ужгород",
    "level": 1,
    "health": 50,
    "taxes": 12,
    "crime": 50,
    "unemployment": 50,
    "happy": 50,
    "popularity": 2000,
    "salary": 100,
    "owner": "undefined",
    "treeNeeds": 100,
    "wheatNeeds": 100,
    "coalNeeds": 100,
    "gasNeeds": 100,
    "rockNeeds": 100,
    "type": "city",
    "texture": "City.png"
};
    it( "Тип агитации-концерт", function(){

        var isMakeConcert=makeConcert(1000,city);

        expect(isMakeConcert).toBe("concert");

    });

    it( "увеличение счастья", function(){

        makeConcert(1000,city);
        var rest= city.happy;

        expect(rest).toBeGreaterThan(50);

    });


});

describe ("Функция makeHumanitarian()",function(){
    it( "Тип агитации-концерт", function(){


        var city = {
            "cityName": "Ужгород",
            "level": 1,
            "health": 50,
            "taxes": 12,
            "crime": 50,
            "unemployment": 50,
            "happy": 50,
            "popularity": 2000,
            "salary": 100,
            "owner": "undefined",
            "treeNeeds": 100,
            "wheatNeeds": 100,
            "coalNeeds": 100,
            "gasNeeds": 100,
            "rockNeeds": 100,
            "type": "city",
            "texture": "City.png"
        };

        var isMakeConcert=makeHumanitarian(1000,city);

        expect(isMakeConcert).toBe("humanitarian");

    });

});

describe ("Функция makeCharity()",function(){
    it( "увеличение счастья", function(){



        var city = {
            "cityName": "Ужгород",
            "level": 1,
            "health": 50,
            "taxes": 12,
            "crime": 50,
            "unemployment": 50,
            "happy": 50,
            "popularity": 2000,
            "salary": 100,
            "owner": "undefined",
            "treeNeeds": 100,
            "wheatNeeds": 100,
            "coalNeeds": 100,
            "gasNeeds": 100,
            "rockNeeds": 100,
            "type": "city",
            "texture": "City.png"
        };

        makeCharity(1000,city);

        var newHappy=Randomfactors(5,10);
        addHappy(city,newHappy);
        var Happy=city.happy;

        expect(Happy).toBeGreaterThan(50);

    });

});

describe ("Функция makeAddSalary()",function(){

    var city = {
        "cityName": "Ужгород",
        "level": 1,
        "health": 50,
        "taxes": 12,
        "crime": 50,
        "unemployment": 50,
        "happy": 50,
        "popularity": 2000,
        "salary": 100,
        "owner": "undefined",
        "treeNeeds": 100,
        "wheatNeeds": 100,
        "coalNeeds": 100,
        "gasNeeds": 100,
        "rockNeeds": 100,
        "type": "city",
        "texture": "City.png"
    };


   it( "увеличение зарплаты", function(){

        makeAddSalary(500,city);
         var rest= city.salary;

        expect(rest).toBe(600);

    });


});

describe ("Проигрывать звук()",function(){

    it("Выключен по умолчанию", function(){

        var sound=Sound();
        expect(sound).toBe(false);//значение должно быть определено
    });

});





















