var projects_ = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    if(t.flag ===1){
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project1 = {

    id: "project1",
    scienceReq: 0,
    projectReq: null,
    description: "Better Water System",
    description2: "Increase Seed Growth Chance",
    priceTag: "(50 science): ",
    cost: 50,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project1);},
    effect: function(){
        project1.flag = 1;
        project1.element.parentNode.removeChild(project1.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project1.cost;
        for(let i = 0; i<loadGame.cropGrowChance.length;i++){
            loadGame.cropGrowChance[i] *= (Math.random()*0.4+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project1);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project2 = {

    id: "project2",
    scienceReq: 0,
    projectReq: 0,
    description: "Wood Sickles & Hoes",
    description2: "Increase Seed Growth Chance",
    priceTag: "(75 science): ",
    cost: 75,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project2);},
    effect: function(){
        project2.flag = 1;
        project2.element.parentNode.removeChild(project2.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project2.cost;
        for(let i = 0; i<loadGame.cropGrowChance.length;i++){
            loadGame.cropGrowChance[i] *= (Math.random()*0.4+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project3 = {

    id: "project3",
    scienceReq: 0,
    projectReq: null,
    description: "Educate Farmers",
    description2: "Farmers can Buy Their own Seeds",
    priceTag: "(200 science): ",
    cost: 200,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project3);},
    effect: function(){
        
        project3.flag = 1;
        project3.element.parentNode.removeChild(project3.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project3.cost;
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project3);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project4 = {

    id: "project4",
    scienceReq: 1,
    projectReq: null,
    description: "Cattle Ploughs",
    description2: "Farmers work Faster",
    priceTag: "(200 science): ",
    cost: 200,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project4);},
    effect: function(){
        
        project4.flag = 1;
        project4.element.parentNode.removeChild(project4.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project4.cost;
        loadGame.farmerSpeed /= (Math.random()*0.3+1.2);
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project4);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project5 = {

    id: "project5",
    scienceReq: 1,
    projectReq: null,
    description: "Fodder",
    description2: "Animals Breed Easier",
    priceTag: "(220 science): ",
    cost: 220,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project5);},
    effect: function(){
        
        project5.flag = 1;
        project5.element.parentNode.removeChild(project5.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project5.cost;
        
        for(let i = 0; i<loadGame.livestockBreedChance.length;i++){
            loadGame.livestockBreedChance[i] *= (Math.random()*0.5+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project5);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project6 = {

    id: "project6",
    scienceReq: 3,
    projectReq: null,
    description: "Stone Picks & Axes",
    description2: "Jacks and Miners Work Faster",
    priceTag: "(380 science): ",
    cost: 380,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project6);},
    effect: function(){
        
        project6.flag = 1;
        project6.element.parentNode.removeChild(project6.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project6.cost;
        loadGame.matSpeed /= (Math.random()*0.3+0.6)

        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project6);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project7 = {

    id: "project7",
    scienceReq: 3,
    projectReq: 1,
    description: "Stone Sickles & Hoes",
    description2: "Increase Seed Growth Chance",
    priceTag: "(380 science): ",
    cost: 380,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project7);},
    effect: function(){
        project7.flag = 1;
        project7.element.parentNode.removeChild(project7.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project7.cost;
        for(let i = 0; i<loadGame.cropGrowChance.length;i++){
            loadGame.cropGrowChance[i] *= (Math.random()*0.4+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project7);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project8 = {

    id: "project8",
    scienceReq: 5, //sailing
    projectReq: null,
    description: "Dead Fish Fertilizer",
    description2: "More Crops per Harvest",
    priceTag: "(720 science): ",
    cost: 720,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project8);},
    effect: function(){
        project8.flag = 1;
        project8.element.parentNode.removeChild(project8.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project8.cost;
        loadGame.cropMultiplier += 1;
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project8);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project9 = {

    id: "project9",
    scienceReq: 6, //hunting
    projectReq: null,
    description: "Find Beans",
    description2: "You can now grow Beans",
    priceTag: "(720 science): ",
    cost: 720,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project9);},
    effect: function(){
        project9.flag = 1;
        project9.element.parentNode.removeChild(project9.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project9.cost;
        loadGame.cropMultiplier += 1;
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project9);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {projects_};