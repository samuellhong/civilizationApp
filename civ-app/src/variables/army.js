var army = [];

function trigger(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    if(sFlag[t.obsolete]===2){
        return false;
    }
    return true;
}


function train(t){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.militaryUnusedHousing <= 0){
        
        return;
    }
    if(t.goldPrice > loadGame.money || t.housing > loadGame.militaryUnusedHousing){
        return
    }
    for(let i = 0;i<t.price.length;i++){
        if(t.price[i] > loadGame.materialCount[t.priceIndex[i]]){
            
            return
        }
    }
    for(let i = 0;i<t.price.length;i++){
        loadGame.materialCount[t.priceIndex[i]]-=t.price[i];
    }

    loadGame.money -= t.goldPrice;
    var power = t.range * (Math.random()+0.6+0.8) + t.melee * (Math.random()+0.2+0.9) +t.strength +t.iq * (Math.random()+0.6+0.8) +t.mobility * (Math.random()+0.2+0.4);
    loadGame.totalMilitaryPower += power;
    loadGame.militaryUnits[t.index] +=1;
    loadGame.militaryValues[t.index].push(power);
    loadGame.militaryUnusedHousing -= t.housing;
    loadGame.livestockCount[2] -= t.horse;

    localStorage.setItem("game",JSON.stringify(loadGame));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fighter = {
    id:"fighter",
    housing:1,
    goldPrice: 50,
    price:[],
    scienceReq: 0,
    projectReq:null,
    obsolete:10, /////METALLURGY
    priceIndex:[],
    index: 0,
    range: 0,
    melee:1,
    strength:1,
    iq:1,
    mobility:2,
    element:null,
    horse: 0,
    trigger: function(){
        return trigger(fighter);
    },
    train: function(){
        train(fighter);
    },
    trainEnemy:function(){
        const power = fighter.range * (Math.random()+0.6+0.8) + fighter.melee * (Math.random()+0.2+0.9) +fighter.strength +fighter.iq * (Math.random()+0.6+0.8) +fighter.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(fighter)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var slinger = {
    id:"slinger",
    housing:1,
    scienceReq:0,
    projectReq:null,
    obsolete:7, //////ARCHERY
    goldPrice:75,
    price:[],
    priceIndex:[],
    index: 1,
    range: 1,
    melee: 0,
    strength:1,
    iq:1,
    mobility:2,
    element:null,
    horse: 0,
    trigger: function(){
        return trigger(slinger);
    },
    train: function(){
        train(slinger);
    },
    trainEnemy:function(){
        const power = slinger.range * (Math.random()+0.6+0.8) + slinger.melee * (Math.random()+0.2+0.9) +slinger.strength +slinger.iq * (Math.random()+0.6+0.8) +slinger.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(slinger)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var warrior = {
    id:"warrior",
    housing:2,
    goldPrice: 300,
    price:[10,10],
    scienceReq:3,
    projectReq:null,
    obsolete:null,
    priceIndex:[0,1],
    index: 2,
    range: 0,
    melee: 3,
    strength:3,
    iq:1,
    mobility:4,
    element:null,
    horse: 0,
    trigger: function(){
        return trigger(warrior);
    },
    train: function(){
        train(warrior);
    },
    trainEnemy:function(){
        const power = warrior.range * (Math.random()+0.6+0.8) + warrior.melee * (Math.random()+0.2+0.9) +warrior.strength +warrior.iq * (Math.random()+0.6+0.8) +warrior.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(warrior)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var archer = {
    id:"archer",
    housing:2,
    goldPrice: 300,
    price:[10],
    obsolete:null,
    priceIndex:[0],
    scienceReq:7,
    projectReq:null,
    index: 3,
    range: 5,
    melee: 1,
    strength: 2,
    iq: 3,
    mobility:2,
    element:null,
    horse: 0,
    trigger: function(){
        return trigger(archer);
    },
    train: function(){
        train(archer);
    },
    trainEnemy:function(){
        const power = archer.range * (Math.random()+0.6+0.8) + archer.melee * (Math.random()+0.2+0.9) +archer.strength +archer.iq * (Math.random()+0.6+0.8) +archer.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(archer)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var charioteer = {
    id:"charioteer",
    housing:3,
    goldPrice: 500,
    price:[],
    obsolete:null,
    priceIndex:[],
    scienceReq:8,
    projectReq:null,
    index: 4,
    range: 4,
    melee: 4,
    strength: 4,
    iq: 4,
    mobility: 4,
    element:null,
    horse: 1,
    trigger: function(){
        return trigger(charioteer);
    },
    train: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(loadGame.livestockCount[2] >=charioteer.horse){
            train(charioteer);
        }
    },
    trainEnemy:function(){
        const power = charioteer.range * (Math.random()+0.6+0.8) + charioteer.melee * (Math.random()+0.2+0.9) +charioteer.strength +charioteer.iq * (Math.random()+0.6+0.8) +charioteer.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(charioteer)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var axeman = {
    id:"axeman",
    housing:2,
    goldPrice: 500,
    price:[10,10],
    obsolete:null,
    priceIndex:[0,2],
    scienceReq:10,
    projectReq:null,
    index: 5,
    range: 3,
    melee: 4,
    strength: 4,
    iq: 2,
    mobility:2,
    element:null,
    horse: 0,
    trigger: function(){
        return trigger(axeman);
    },
    train: function(){
        train(axeman);
    },
    trainEnemy:function(){
        const power = axeman.range * (Math.random()+0.6+0.8) + axeman.melee * (Math.random()+0.2+0.9) +axeman.strength +axeman.iq * (Math.random()+0.6+0.8) +axeman.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(axeman)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {army};