var materials_ = [];

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

function buy(t){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.unusedPopulation >0 && loadGame.unusedHousing >0 && loadGame.unusedMiningLand > 0){
        loadGame.materialWorkers[t.index]+=1;
        loadGame.unusedHousing -= 1;
        loadGame.unusedMiningLand-=1;
        loadGame.unusedPopulation -= 1;
    }
    else if(loadGame.money >= t.occPrice && loadGame.unusedHousing > 0 && loadGame.unusedMiningLand > 0){
        loadGame.materialWorkers[t.index]+=1;
        loadGame.money -= t.occPrice;
        loadGame.unusedHousing -= 1;
        loadGame.unusedMiningLand-=1;
        loadGame.population += 1;
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wood = {

    id: "Wood",
    scienceReq: 3,
    projectReq: null,
    index: 0,
    trigger: function(){
        return triggerA(wood);
    },
    occ: "Jack",
    occPrice: 500,
    buy: function(){
        buy(wood);
    }
}
materials_.push(wood);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var stone = {

    id: "Stone",
    scienceReq: 3,
    projectReq: null,
    index: 1,
    trigger: function(){
        return triggerA(stone);
    },
    occ: "Miner",
    occPrice: 500,
    buy: function(){
        buy(stone);
    }
}
materials_.push(stone);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ingot = {

    id: "Alloy",
    scienceReq: 10,
    projectReq: null,
    index: 2,
    trigger: function(){
        return triggerA(ingot);
    },
    occ: "Smith",
    occPrice: 800,
    buy: function(){
        buy(ingot);
    }
}
materials_.push(ingot);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




export {materials_};