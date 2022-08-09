var techs = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    for(let i = 0;i<t.req.length;i++){
        if(sFlag[t.req[i]]!== 2){
            return false;
        }
    }
    if(t.flag ===2){
        return false;
    }
    return true;
}

function buyTech(t){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(t.cost <= loadGame.science){
        loadGame.science -= t.cost;
        t.flag = 2;
        t.element.parentNode.removeChild(t.element);
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var neolithic = {
    id: "Tech1",
    title: "Neolithic Revolution",
    priceTag: "",
    flag: 0,
    index: 0,
    description: "Settle and Start your Civilization",
    trigger: function(){return triggerA(neolithic);},
    element: null,
    cost: 0,
    effect: function(){
        buyTech(neolithic);
    },
    req: [],
}

techs.push(neolithic);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var animalHusbandry = {
    id: "animalHusbandryTech",
    title: "Pastoralism",
    priceTag: "(200 science): \n",
    flag: 0,
    index: 1,
    description: "Unlock Livestock; Unlock Horseman",
    trigger: function(){return triggerA(animalHusbandry);},
    element: null,
    cost: 200,
    effect: function(){
        buyTech(animalHusbandry);
    },
    req: [0]
}
techs.push(animalHusbandry)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pottery = {
    id: "potteryTech",
    title: "Pottery",
    priceTag: "(250 science): ",
    flag: 0,
    index: 2,
    description: "Unlock Granary; Unlock Mudhouse",
    trigger: function(){return triggerA(pottery);},
    element: null,
    cost: 250,
    effect: function(){
        buyTech(pottery);
    },
    req: [0]
}
techs.push(pottery)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mining = {
    id: "miningTech",
    title: "Mining",
    priceTag: "(400 science): ",
    flag: 0,
    index: 3,
    description: "Unlock Mining; Unlock Warrior; Unlock Stone Tools",
    trigger: function(){return triggerA(mining);},
    element: null,
    cost: 400,
    effect: function(){
        buyTech(mining);
    },
    req: [0]
}
techs.push(mining)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var alphabet = {
    id: "alphabetTech",
    title: "Alphabet",
    priceTag: "(700 science): ",
    flag: 0,
    index: 4,
    description: "Unlock Library",
    trigger: function(){return triggerA(alphabet);},
    element: null,
    cost: 700,
    effect: function(){
        buyTech(alphabet);
    },
    req: [0]
}
techs.push(alphabet)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sailing = {
    id: "sailingTech",
    title: "Sailing",
    priceTag: "(700 science): ",
    flag: 0,
    index: 5,
    description: "Unlock Fishing",
    trigger: function(){return triggerA(sailing);},
    element: null,
    cost: 700,
    effect: function(){
        buyTech(sailing);
    },
    req: [0]
}
techs.push(sailing)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var hunting = {
    id: "huntingTech",
    title: "Hunting",
    priceTag: "(880 science): ",
    flag: 0,
    index: 6,
    description: "Unlock Hunting Animals",
    trigger: function(){return triggerA(hunting);},
    element: null,
    cost: 880,
    effect: function(){
        buyTech(hunting);
    },
    req: [1]
}
techs.push(hunting)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var archery = {
    id: "archeryTech",
    title: "Archery",
    priceTag: "(900 science): ",
    flag: 0,
    index: 7,
    description: "Unlock Archers; Unlock Horses",
    trigger: function(){return triggerA(archery);},
    element: null,
    cost: 900,
    effect: function(){
        buyTech(archery);
    },
    req: [1]
}
techs.push(archery)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wheel = {
    id: "wheelTech",
    title: "Wheel",
    priceTag: "(1400 science): ",
    flag: 0,
    index: 8,
    description: "Unlock Charioteers",
    trigger: function(){return triggerA(wheel);},
    element: null,
    cost: 1400,
    effect: function(){
        buyTech(wheel);
    },
    req: [2]
}
techs.push(wheel)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var masonry = {
    id: "masonryTech",
    title: "Masonry",
    priceTag: "(1600 science): ",
    flag: 0,
    index: 9,
    description: "Allows Stone Buildings",
    trigger: function(){return triggerA(masonry);},
    element: null,
    cost: 1600,
    effect: function(){
        buyTech(masonry);
    },
    req: [2]
}
techs.push(masonry)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var metallurgy = {
    id: "metallurgyTech",
    title: "Metallurgy",
    priceTag: "(2000 science): ",
    flag: 0,
    index: 10,
    description: "Allows Metal Tools",
    trigger: function(){return triggerA(metallurgy);},
    element: null,
    cost: 2000,
    effect: function(){
        buyTech(metallurgy);
    },
    req: [3]
}
techs.push(metallurgy)
export {techs}