/**
 * Created by Merry on 10.01.2015.
 */

describe("Присвоить начальный город", function() {

    it(" Вернуть id первого города", function(){
        var city=first_city_id();
        expect(city).toBeDefined();//значение должно быть определено
    });

});

describe ("Вернуть по id  имя города",function(){

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

        var isMakeConcert=makeConcert(1000,city);

        expect(isMakeConcert).toBe("concert");

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








