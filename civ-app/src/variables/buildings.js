var buildings_ = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(t.obsolete !== null && sFlag[t.obsolete] === 2  && loadGame.buildingCount[t.index] <= 0){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    return true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tent = {
    id: "Tent",
    description: "[Houses 2 people; Occupies 1 Land]",
    scienceReq: 0,
    obsolete: 9,
    projectReq: null,
    goldPrice: 30,
    price:[],
    priceIndex:[],
    landSpace: 1,
    index: 0,
    prev: null,
    manpower: 0,
    trigger: function(){
        return triggerA(tent);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        var temp = true;
        if(tent.goldPrice > loadGame.money){
            temp = false;
        }
        if(loadGame.unusedLand >0 && temp){
            loadGame.housing+=2;
            loadGame.unusedHousing+=2;
            loadGame.unusedLand -= tent.landSpace;
            loadGame.buildingCount[0] += 1;
            loadGame.money -= tent.goldPrice;
            for(let i = 0; i<tent.price.length;i++){
                loadGame.materialCount[tent.priceIndex[i]] -= tent.price[i];
            }
        }

        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(tent)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var armyCamp = {
    id: "Army Camp",
    description: "[Houses 2 military units; Occupies 1 Land]",
    scienceReq: 1,
    obsolete: null,
    projectReq: null,
    goldPrice: 60,
    price:[],
    priceIndex:[],
    landSpace: 1,
    index: 1,
    prev: null,
    manpower: 0,
    trigger: function(){
        return triggerA(armyCamp);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        var temp = true;
        if(armyCamp.goldPrice > loadGame.money){
            temp = false;
        }
        if(loadGame.unusedLand > 0 && temp){
            loadGame.militaryHousing+=2;
            loadGame.militaryUnusedHousing+=2;
            loadGame.unusedLand -= armyCamp.landSpace;
            loadGame.buildingCount[1] += 1;
            loadGame.money -= armyCamp.goldPrice;
            for(let i = 0; i<armyCamp.price.length;i++){
                loadGame.materialCount[armyCamp.priceIndex[i]] -= armyCamp.price[i];
            }
        }

        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(armyCamp)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var granary = {
    id: "Granary",
    description: "[Store 50 crops; Occupies 2 Land]",
    scienceReq: 2,
    obsolete: null,
    projectReq: null,
    goldPrice: 300,
    price:[],
    priceIndex:[],
    landSpace: 2,
    index: 2,
    prev:null,
    manpower: 100,
    trigger: function(){
        return triggerA(granary);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(granary.goldPrice> loadGame.money){
            return;
        }
        if(loadGame.unusedLand > 1 && loadGame.manPower > granary.manpower){
            loadGame.cropStorageSpace+=50;
            loadGame.unusedLand -= 2;
            loadGame.buildingCount[2] += 1;
            loadGame.money -= granary.goldPrice;
            loadGame.manPower -= granary.manpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(granary)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mudhouse = {
    id: "Mudhouse",
    description: "[Houses 5 people; Occupies 1 Land]",
    upgradeDescription: "[Houses 3 more people]",
    scienceReq: 2,
    obsolete: null,
    projectReq: null,
    goldPrice: 100,
    upgradeGold: 60,
    price:[],
    priceIndex:[],
    landSpace: 1,
    index: 3,
    prev:0,
    upgradePrice: [],
    upgradePriceIndex: [],
    upgradeManpower: 50,
    manpower: 100,
    trigger: function(){
        return triggerA(granary);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(mudhouse.goldPrice> loadGame.money){
            return;
        }
        if(loadGame.unusedLand >0 && loadGame.manPower > mudhouse.manpower){
            loadGame.housing+=5;
            loadGame.unusedHousing+=5;
            loadGame.unusedLand -= 1;
            loadGame.buildingCount[3] += 1;
            loadGame.money -= mudhouse.goldPrice;
            loadGame.manPower -= mudhouse.manpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
    effect2: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(mudhouse.upgradePrice[0]> loadGame.money){
            return;
        }
        if(loadGame.buildingCount[0] >0 && loadGame.manPower > mudhouse.upgradeManpower){
            loadGame.housing+=3;
            loadGame.unusedHousing+=3;
            loadGame.buildingCount[mudhouse.index] += 1;
            loadGame.buildingCount[mudhouse.prev] -= 1;
            loadGame.money -= mudhouse.upgradeGold;
            loadGame.manPower -= mudhouse.upgradeManpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(mudhouse)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var library = {
    id: "Library",
    description: "[Increase Max Science; Occupies 4 Land]",
    scienceReq: 4,
    obsolete: null,
    projectReq: null,
    goldPrice: 500,
    price:[30], //30 stone
    priceIndex:[1],
    landSpace: 4,
    index: 4,
    manpower: 300,
    prev: null,
    trigger: function(){
        return triggerA(library);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(library.goldPrice> loadGame.money){
            return;
        }
        for(let i = 0;i<library.price.length;i++){
            if(library.price[i] > loadGame.materialCount[library.priceIndex[i]]){
                return
            }
        }
        if(loadGame.unusedLand >0 && loadGame.manPower > library.manpower){
            loadGame.unusedLand -= 4;
            loadGame.buildingCount[library.index] += 1;
            loadGame.money -= library.goldPrice;
            loadGame.manPower -= library.manpower;
            loadGame.maxScience += 700;
            for(let i = 0;i<library.price.length;i++){
                library.materialCount[library.index[i]] -= library.price[i];
            }
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}

buildings_.push(library)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var stoneWorks = {
    id: "Stone Works",
    description: "[Increase Max Stone&Wood&Ingot Storage; Occupies 8 Land]",
    scienceReq: 9,
    obsolete: null,
    projectReq: null,
    goldPrice: 800,
    price:[50], //50 stone
    priceIndex:[1],
    landSpace: 8,
    index: 5,
    manpower: 400,
    prev: null,
    trigger: function(){
        return triggerA(stoneWorks);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(stoneWorks.goldPrice> loadGame.money){
            return;
        }
        for(let i = 0;i<stoneWorks.price.length;i++){
            if(stoneWorks.price[i] > loadGame.materialCount[stoneWorks.priceIndex[i]]){
                return
            }
        }
        if(loadGame.unusedLand >0 && loadGame.manPower > stoneWorks.manpower){
            loadGame.unusedLand -= 4;
            loadGame.buildingCount[stoneWorks.index] += 1;
            loadGame.money -= stoneWorks.goldPrice;
            loadGame.manPower -= stoneWorks.manpower;
            for(let i = 0;i<stoneWorks.price.length;i++){
                loadGame.materialCount[stoneWorks.index[i]] -= stoneWorks.price[i];
            }
            loadGame.materialStorage[0] += 300;
            loadGame.materialStorage[1] += 100;
            loadGame.materialStorage[2] += 50;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}

buildings_.push(stoneWorks)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {buildings_};