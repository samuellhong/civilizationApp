var crops_ = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    return true;
}

function buySeed(i){
    
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.seedPrice[i] <= loadGame.money){
        loadGame.seedsCount[i] += loadGame.seedBundle;
        loadGame.money -= loadGame.seedPrice[i];
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
function growCrop(i){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.seedsCount[i] > 0 && loadGame.unusedFarmLand > 0){
        loadGame.seedsCount[i] -= 1;
        if(Math.random() < loadGame.cropGrowChance[i]){
            loadGame.cropCount[i] += loadGame.cropMultiplier;
            loadGame.unusedFarmLand -=1;
            if(loadGame.cropCount[i]>loadGame.keepCrop && loadGame.cropStorageSpace > 0){
                loadGame.storedCrops[i] +=loadGame.cropMultiplier;
                loadGame.cropCount[i] -= loadGame.cropMultiplier;
                loadGame.unusedFarmLand +=1;
                loadGame.cropStorageSpace -=loadGame.cropMultiplier;
                loadGame.storedFood += loadGame.cropMultiplier;
            }
        }
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
function sellCrop(i){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.cropCount[i] > 0){
        loadGame.cropCount[i] -= loadGame.cropMultiplier;
        if(loadGame.cropCount[i]<0){
            loadGame.money -= loadGame.cropSell[i]*(0-loadGame.cropCount[i]);
            loadGame.cropCount[i] = 0;
        }
        loadGame.money += loadGame.cropSell[i]*loadGame.cropMultiplier;
        loadGame.unusedFarmLand +=1;
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var corn = {

    id: "Corn",
    scienceReq: 0,
    projectReq: null,
    growChance: 0.5,
    seedCost: (Math.random()*.1+0.01),
    sellPrice:(Math.random()*.2+0.11),
    flag: 0,
    index: 0,
    element: null,
    generatePrice: function(){
        corn.seedCost = (Math.random()*.1+0.01);
        return corn.seedCost;
    },
    buySeed: function(){
        buySeed(0);
    },
    growCrop: function(){
        growCrop(0);
    },
    sellCrop: function(){
        sellCrop(0);
    },
    trigger: function(){
        return triggerA(corn);
    },
    feed:1,
    cropMult:[0.2,0.11],
    seedMult:[0.1,0.01],
}
crops_.push(corn)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wheat = {

    id: "Wheat",
    scienceReq: 0,
    projectReq: null,
    growChance: 0.5,
    seedCost: (Math.random()*.3+.31),
    sellPrice:(Math.random()+1.00),
    flag: 0,
    index: 1,
    element: null,
    generatePrice: function(){
        wheat.seedCost = (Math.random()*.3+.31);
        return wheat.seedCost;
    },
    buySeed: function(){
        buySeed(1);
    },
    growCrop: function(){
        growCrop(1);
    },
    sellCrop: function(){
        sellCrop(1);
    },
    trigger: function(){
        return triggerA(wheat);
    },
    feed:2,
    cropMult:[1,1],
    seedMult:[0.3,0.31],
}

crops_.push(wheat);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var melon = {

    id: "Melon",
    scienceReq: 0,
    projectReq: null,
    growChance: 0.5,
    seedCost: (Math.random()*2+2.01),
    sellPrice:(Math.random()*4+4.01),
    flag: 0,
    index: 2,
    element: null,
    generatePrice: function(){
        melon.seedCost = (Math.random()*2+2.01);
        return melon.seedCost;
    },
    buySeed: function(){
        buySeed(2);
    },
    growCrop: function(){
        growCrop(2);
    },
    sellCrop: function(){
        sellCrop(2);
    },
    trigger: function(){
        return triggerA(melon);
    },
    feed:2,
    cropMult:[4,4.01],
    seedMult:[2,2.01],
}

crops_.push(melon);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var beans = {

    id: "Bean",
    scienceReq: 0,
    projectReq: 8,
    growChance: 0.5,
    seedCost: (Math.random()*3+1.01),
    sellPrice:(Math.random()*6+3.01),
    flag: 0,
    index: 3,
    element: null,
    generatePrice: function(){
        beans.seedCost = (Math.random()*3+1.01);
        return beans.seedCost;
    },
    buySeed: function(){
        buySeed(3);
    },
    growCrop: function(){
        growCrop(3);
    },
    sellCrop: function(){
        sellCrop(3);
    },
    trigger: function(){
        return triggerA(beans);
    },
    feed:2,
    cropMult:[6,3.01],
    seedMult:[3,1.01],
}

crops_.push(beans);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {crops_};