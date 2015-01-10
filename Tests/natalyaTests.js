/**
 * Created by Natalya on 10.01.2015.
 */

describe("Русское название ячейки: ", function() {
    it("Уголь", function() {
        var title = getResourceRusTitle("coal");
        expect(title).toBe("Уголь");
    });
    it("Город", function() {
        var title = getResourceRusTitle("city");
        expect(title).toBe("Город");
    });
    it("Ферма", function() {
        var title = getResourceRusTitle("farm");
        expect(title).toBe("Ферма");
    });
    it("Газ", function() {
        var title = getResourceRusTitle("gas");
        expect(title).toBe("Газ");
    });
    it("Газовая вышка", function() {
        var title = getResourceRusTitle("gasRig");
        expect(title).toBe("Газовая вышка");
    });
    it("Трава", function() {
        var title = getResourceRusTitle("grass");
        expect(title).toBe("Трава");
    });
    it("Шахта", function() {
        var title = getResourceRusTitle("mine");
        expect(title).toBe("Шахта");
    });
    it("Карьер", function() {
        var title = getResourceRusTitle("quarry");
        expect(title).toBe("Карьер");
    });
    it("Камень", function() {
        var title = getResourceRusTitle("rock");
        expect(title).toBe("Камень");
    });
    it("Лесопилка", function() {
        var title = getResourceRusTitle("sawMeal");
        expect(title).toBe("Лесопилка");
    });
    it("Дерево", function() {
        var title = getResourceRusTitle("tree");
        expect(title).toBe("Дерево");
    });
    it("Пшеница", function() {
        var title = getResourceRusTitle("wheat");
        expect(title).toBe("Пшеница");
    });
    it("Неизвестный ресурс", function() {
        var title = getResourceRusTitle("obsidian");
        expect(title).toBe("Неизвестный ресурс");
    });

});


describe("Обновление ресурсов", function() {
    var res = {
        "resourceCount": 70000,
        "recovery": 55,
        "mining": 80
    }

    beforeEach(function(){
        res.resourceCount = 70000;
    });

   it("в ячейке ресурса", function(){
       updateResourceGameStep(res);
       expect(res.resourceCount).toBe(70055);
   });

    it("в ячейке производства", function(){
        updateProductionGameStep(res);
        expect(res.resourceCount).toBe(69975);
    });
});

describe("Изменение параметров счастья", function(){
    var city = {
            "happy": 50
        };

    beforeEach(function(){
        city.happy = 50;
    });

    it("Добавить 20 счастья", function(){
        addHappy(city, 20);
        expect(city.happy).toBe(70);
    });
    it("Убавить 20 счастья", function(){
        addHappy(city, -20);
        expect(city.happy).toBe(30);
    });
    it("Добавить 60 счастья (граничное условие)", function(){
        addHappy(city, 60);
        expect(city.happy).toBe(100);
    });
    it("Убавить 60 счастья (граничное условие)", function(){
        addHappy(city, -60);
        expect(city.happy).toBe(0);
    });

});


describe("Изменение параметров преступности", function(){
    var city = {
        "crime": 50
    };

    beforeEach(function(){
        city.crime = 50;
    });

    it("Добавить 20 преступности", function(){
        addCrime(city, 20);
        expect(city.crime).toBe(70);
    });
    it("Убавить 20 преступности", function(){
        addCrime(city, -20);
        expect(city.crime).toBe(30);
    });
    it("Добавить 60 преступности (граничное условие)", function(){
        addCrime(city, 60);
        expect(city.crime).toBe(100);
    });
    it("Убавить 60 преступности (граничное условие)", function(){
        addCrime(city, -60);
        expect(city.crime).toBe(0);
    });

});


describe("Изменение параметров здоровья", function(){
    var city = {
        "health": 50
    };

    beforeEach(function(){
        city.health = 50;
    });

    it("Добавить 20 здоровья", function(){
        addHealth(city, 20);
        expect(city.health).toBe(70);
    });
    it("Убавить 20 здоровья", function(){
        addHealth(city, -20);
        expect(city.health).toBe(30);
    });
    it("Добавить 60 здоровья (граничное условие)", function(){
        addHealth(city, 60);
        expect(city.health).toBe(100);
    });
    it("Убавить 60 здоровья (граничное условие)", function(){
        addHealth(city, -60);
        expect(city.health).toBe(0);
    });

});


describe("Изменение параметров безработицы", function(){
    var city = {
        "unemployment": 50
    };

    beforeEach(function(){
        city.unemployment = 50;
    });

    it("Добавить 20 безработицы", function(){
        addUnemployment(city, 20);
        expect(city.unemployment).toBe(70);
    });
    it("Убавить 20 безработицы", function(){
        addUnemployment(city, -20);
        expect(city.unemployment).toBe(30);
    });
    it("Добавить 60 безработицы (граничное условие)", function(){
        addUnemployment(city, 60);
        expect(city.unemployment).toBe(100);
    });
    it("Убавить 60 безработицы (граничное условие)", function(){
        addUnemployment(city, -60);
        expect(city.unemployment).toBe(0);
    });

});


describe("Изменение параметров безработицы", function(){
    var city = {
        "unemployment": 50
    };

    beforeEach(function(){
        city.unemployment = 50;
    });

    it("Добавить 20 безработицы", function(){
        addUnemployment(city, 20);
        expect(city.unemployment).toBe(70);
    });
    it("Убавить 20 безработицы", function(){
        addUnemployment(city, -20);
        expect(city.unemployment).toBe(30);
    });
    it("Добавить 60 безработицы (граничное условие)", function(){
        addUnemployment(city, 60);
        expect(city.unemployment).toBe(100);
    });
    it("Убавить 60 безработицы (граничное условие)", function(){
        addUnemployment(city, -60);
        expect(city.unemployment).toBe(0);
    });

});


describe("Является ли ячейка производством", function(){
    var cell = {
        "resourceCount": 12000,
        "recovery": 36,
        "resourceType": 0,
        "mining": 0,
        "type": "grass",
        "texture": "grass.jpg"
    };

    var cell2 = {
        "resourceCount": 45852,
        "recovery": 87,
        "resourceType": 0,
        "mining": 50,
        "type": "mine",
        "texture": "mine.jpg"
    };

    it("Нет", function(){
        expect(isProductionType(cell.type)).toBeFalsy();
    });

    it("Да", function(){
        expect(isProductionType(cell2.type)).toBeTruthy();
    });

});


describe("Улучшаем ресурс до производства", function(){
    var grass = {
        "resourceCount": 12000,
        "recovery": 36,
        "resourceType": 0,
        "mining": 0,
        "type": "grass",
        "texture": "grass.jpg"
    };

    var wheat = {
            "resourceCount": 75362,
            "recovery": 55,
            "resourceType": 0,
            "mining": 0,
            "type": "wheat",
            "texture": "wheat.jpg"
        };

    var tree = {
            "resourceCount": 89946,
            "recovery": 68,
            "resourceType": 0,
            "mining": 0,
            "type": "tree",
            "texture": "trees.jpg"
            };

    var rock = {
        "resourceCount": 89480,
        "recovery": 43,
        "resourceType": 0,
        "mining": 0,
        "type": "rock",
        "texture": "rocks.jpg"
    };

    var coal = {
            "resourceCount": 36758,
            "recovery": 65,
            "resourceType": 0,
            "mining": 0,
            "type": "coal",
            "texture": "coal.jpg"
        };

    var gas = {
            "resourceCount": 47024,
            "recovery": 45,
            "resourceType": 0,
            "mining": 0,
            "type": "gas",
            "texture": "gas.jpg"
        };

    player = {
        "name": "vanya",
        "color": "red",
        "money": 500000,
        "tree": 50000,
        "coal": 50000,
        "wheat": 50000,
        "gas": 50000,
        "rock": 50000,
        "step": 1
    };

    it("Газ -> Газовая вышка", function(){
        updateResourceToProduction(gas);
        expect(gas.type).toBe(resourceType.gasRig.value);
        expect(gas.mining).toBeGreaterThan(0);
    });

    it("Уголь -> Шахта", function(){
        updateResourceToProduction(coal);
        expect(coal.type).toBe(resourceType.mine.value);
        expect(coal.mining).toBeGreaterThan(0);
    });

    it("Дерево -> Лесопилка", function(){
        updateResourceToProduction(tree);
        expect(tree.type).toBe(resourceType.sawMeal.value);
        expect(tree.mining).toBeGreaterThan(0);
    });

    it("Камень -> Карьер", function(){
        updateResourceToProduction(rock);
        expect(rock.type).toBe(resourceType.quarry.value);
        expect(rock.mining).toBeGreaterThan(0);
    });

    it("Пшеница -> Ферма", function(){
        updateResourceToProduction(wheat);
        expect(wheat.type).toBe(resourceType.farm.value);
        expect(wheat.mining).toBeGreaterThan(0);
    });

    it("Трава -> ?? (Трава)", function(){
        updateResourceToProduction(grass);
        expect(grass.type).toBe(resourceType.grass.value);
        expect(grass.mining).toBe(0);
    });
});


describe("Улучшить город", function(){

    var levelUpPrice  = [1000,20000,300000,4000000,50000000,6000000000];

    var city = {
            "cityName": "Херсон",
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

    var city2 = {
        "cityName": "Херсон",
        "level": 4,
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

    it("Да", function(){
        expect(levelUp(city)).toBeTruthy();
    });

    it("Нет", function(){
        expect(levelUp(city2)).toBeFalsy();
    });

});