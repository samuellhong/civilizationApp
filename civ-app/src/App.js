import './App.css';
import React, { useEffect } from 'react';
import {game} from './variables/vars.js';
import {crops_} from './variables/crops.js';
import {techs} from './variables/tech.js';
import {army} from './variables/army.js';
import {livestock_} from './variables/livestock.js';
import {materials_} from './variables/materials.js';
import {projects_} from './variables/projects.js';
import {buildings_} from './variables/buildings.js';
import Header from './components/Header';
console.log(1);
var projects = projects_;
var crops = crops_;
var tech = techs;
var military = army;
var livestock = livestock_;
var buildings = buildings_;
var materials = materials_;

var scienceFlags = [];
var militaryFlags = [];
var projectsFlags = [];
//localStorage.clear();
if(false){
  localStorage.setItem("game",JSON.stringify(game));

  for(let i = 0; i<tech.length;i++){
    scienceFlags.push(tech[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
  for(let i = 0; i<military.length;i++){
    militaryFlags.push(military[i].flag);
  }
  localStorage.setItem("militaryFlags",JSON.stringify(militaryFlags));
  for(let i = 0; i<projects.length;i++){
    projectsFlags.push(projects[i].flag);
  }
  localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));
}
var cropTraderInterval;
var livestockTraderInterval;
var scienceInterval;
var growIntervals = Array(crops.length).fill(null);
var seedPriceIntervals = Array(crops.length).fill(null);
var cropPriceIntervals = Array(crops.length).fill(null);
var livestockPriceIntervals = Array(livestock.length).fill(null);
var breedIntervals = Array(livestock.length).fill(null);
var matIntervals = Array(materials.length).fill(null);
var builderInterval;
var fightInterval;
const resourceString = ["wood", "stone","alloy"];
  
if (localStorage.getItem("game") === null){
  localStorage.setItem("game",JSON.stringify(game));
}
if (localStorage.getItem("scienceFlags") === null){
  for(let i = 0; i<tech.length;i++){
    scienceFlags.push(tech[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
}
if (localStorage.getItem("militaryFlags") === null){
  for(let i = 0; i<army.length;i++){
    militaryFlags.push(army[i].flag);
  }
  localStorage.setItem("militaryFlags",JSON.stringify(militaryFlags));
}
if (localStorage.getItem("projectsFlags") === null){
  for(let i = 0; i<projects.length;i++){
    projectsFlags.push(projects[i].flag);
  }
  localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));
}
scienceFlags = JSON.parse(localStorage.getItem("scienceFlags"));
for(let i = 0; i<tech.length;i++){
  tech[i].flag = scienceFlags[i];
}
projectsFlags = JSON.parse(localStorage.getItem("projectsFlags"));
for(let i = 0; i<projects.length;i++){
  projects[i].flag = projectsFlags[i];
}
var loadGame = JSON.parse(localStorage.getItem("game"));
var status = 0;
var gameStart = 0;
const App = () =>{
  
  function saveVar(){

      
    
    if(loadGame.hungryStatus ===0){
      
      loadGame.scienceInt = loadGame.population;
    }
    else{
      loadGame.scienceInt = 0;
    }
    loadGame.scienceInt *= loadGame.scienceMultiplier;
    if(tech[1].flag===2 && status ===0){
      beginWildAnimals();
      status=1;
    }
    if (gameStart ===0){
      setInterval(()=>{
        loadGame.money += loadGame.goldPerTurn;
      },5000);
      /* eslint-disable no-unused-vars */
      loadGame.inFight = false;
      loadGame.foundFight = false;
      setInterval(()=>{
        if(loadGame.population >0){
          feed();
          storeExtraCrops();
          storeExtraMeat();
        }
      },40000);
      for(let i = 0;i<crops.length;i++){
        if(scienceFlags[crops[i].scienceReq]===2){
          seedPriceIntervals[i] = setInterval(()=>{
            createSeedInterval(i);
          },(Math.random()*3+7)*1000);
          cropPriceIntervals[i] = setInterval(()=>{
            createCropInterval(i);
          },(Math.random()*3+7)*1000);
        }
      }
      for(let i = 0;i<livestock.length;i++){
        if(scienceFlags[livestock[i].scienceReq] ===2){
          livestockPriceIntervals[i] = setInterval(()=>{
            createLivestockPriceInterval(i);
            
          },(Math.random()*3+10)*1000)
        }
        addBreedInterval(i);
      }
      for(let i = 0;i<materials.length;i++){
        if(scienceFlags[materials[i].scienceReq] ===2){
          startResourceInterval(i);
        }
      }
      gameStart = 1;
    }
    scienceFlags = []
    for(let i = 0; i<tech.length; i++){
      scienceFlags.push(tech[i].flag);
    }
    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));

    projectsFlags = []
    for(let i = 0; i<projects.length; i++){
      projectsFlags.push(projects[i].flag);
    }
    localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));

    manageCrops();
    manageLivestock();
    manageMining();
    manageFood();
    manageTech();
    manageProjects();
    manageBuildings();
    manageMilitaryUnits();
    manageWar();
   
    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
    document.getElementById("money").innerHTML = loadGame.money.toFixed(2);
    document.getElementById("population").innerHTML = loadGame.population;
    document.getElementById("unusedPopulation").innerHTML = loadGame.unusedPopulation;
    document.getElementById("land").innerHTML = loadGame.land;
    document.getElementById("unusedLand").innerHTML = loadGame.unusedLand;
    document.getElementById("landPrice").innerHTML = loadGame.landPrice.toFixed(2);
    document.getElementById("farmLand").innerHTML = loadGame.unusedFarmLand+"/"+loadGame.farmLand;
    document.getElementById("livestockLand").innerHTML = loadGame.unusedLivestockLand+"/"+loadGame.livestockLand;
    document.getElementById("miningLand").innerHTML = loadGame.unusedMiningLand+"/"+loadGame.miningLand;
    document.getElementById("totalMilitaryPower").innerHTML = loadGame.totalMilitaryPower.toFixed(2)+" ("+loadGame.currentMilitaryPower.toFixed(2)+")";
    document.getElementById("militaryHousing").innerHTML = loadGame.militaryHousing+" ("+loadGame.militaryUnusedHousing+")";

    localStorage.setItem("game",JSON.stringify(loadGame));

  }

  function feed(){
    
    var hunger = loadGame.population*3 - loadGame.distributedFood;
    loadGame.distributedFood = 0;
    loadGame.hungryStatus = 0;
    while(hunger > 0){
      var totalCrops = 0;
      var totalMeat = 0;
      for(let i = 0;i<crops.length;i++){
        totalCrops += loadGame.storedCrops[i];
      }
      for(let i =0;i<livestock.length;i++){
        totalMeat += loadGame.storedMeat[i];
      }
      if(totalCrops + totalMeat <=0){
        loadGame.hungryStatus = 1;
        saveVar();
        return;
      }
      var odds = [totalCrops/(totalCrops+totalMeat), totalMeat/(totalCrops+totalMeat)];
      if(Math.random() < odds[0]){
        var odds2 = [];
        for(let i = 0; i<crops.length; i++){
          odds2.push(loadGame.storedCrops[i]/totalCrops);
        }
        const chance = Math.random();
        var sum = 0;
        for(let i =0;i<crops.length;i++){
          if(chance <odds2[i]+sum){
            totalCrops -= 1;
            loadGame.storedCrops[i] -= 1;
            loadGame.storedFood -=1;
            loadGame.cropStorageSpace += 1;
            hunger -= crops[i].feed;
            localStorage.setItem("game",JSON.stringify(loadGame));
            loadGame = JSON.parse(localStorage.getItem("game"));
            saveVar();
          }
          else{
            sum += odds2[i];
          }
        }
      }
      else{
        let odds2 = [];
        for(let i = 0; i<livestock.length; i++){
          odds2.push(loadGame.storedMeat[i]/totalMeat);
        }
        const chance = Math.random();
        let sum = 0;
        for(let i =0;i<livestock.length;i++){
          if(chance < odds2[i]+sum){
            totalMeat -= 1;
            loadGame.storedMeat[i] -= 1;
            loadGame.storedFood -=1;
            loadGame.meatStorageSpace += 1;
            hunger -= livestock[i].feed;
            localStorage.setItem("game",JSON.stringify(loadGame));
            loadGame = JSON.parse(localStorage.getItem("game"));
            saveVar();

          }
          else{
            sum += odds2[i];
          }
        }
      }
    }
    
    loadGame.distributedFood -= hunger;
  }

  function storeExtraCrops(){
    while(loadGame.cropStorageSpace > 0){
      var odds = []
      var totCrops=0;
      for(let j =0;j<crops.length;j++){
        if(loadGame.cropCount[j]>loadGame.keepCrop){
          totCrops += loadGame.cropCount[j]-loadGame.keepCrop;
        }
      }          
      if(totCrops>0){
        for(let j =0;j<crops.length;j++){
          if(loadGame.cropCount[j]>loadGame.keepCrop){
            odds.push((loadGame.cropCount[j]-loadGame.keepCrop)/totCrops);
          }
          else{
            odds.push(0);
          }
        }
        const chance2 = Math.random();
        var sum2 = 0;
        for(let j = 0;j<crops.length;j++){
          if(chance2 < odds[j]+sum2){
            loadGame.storedCrops[j] += 1;
            loadGame.storedFood +=1;
            loadGame.cropStorageSpace -= 1;
            loadGame.cropCount[j] -= 1;
            loadGame.unusedFarmLand +=1;
            break;
          }
          sum2+=odds[j]
        }
      }
      else{
        saveVar();
        return;
      }
    }
    saveVar();
  }
  function storeExtraMeat(){
    while(loadGame.meatStorageSpace > 0){
      var odds = []
      var totMeat=0;
      for(let j =0;j<livestock.length;j++){
        if(loadGame.livestockCount[j]>loadGame.keepCrop){
          totMeat += loadGame.livestockCount[j]-loadGame.keepLivestock;
        }
      }          
      if(totMeat>0){
        for(let j =0;j<livestock.length;j++){
          if(loadGame.livestockCount[j]>loadGame.keepLivestock){
            odds.push((loadGame.livestockCount[j]-loadGame.keepLivestock)/totMeat);
          }
          else{
            odds.push(0);
          }
        }
        const chance2 = Math.random();
        var sum2 = 0;
        for(let j = 0;j<livestock.length;j++){
          if(chance2 < odds[j]+sum2){
            loadGame.storedMeat[j] += 1;
            loadGame.storedFood +=1;
            loadGame.meatStorageSpace -= 1;
            loadGame.livestockCount[j] -= 1;
            loadGame.unusedLivestockLand +=1;
            break;
          }
          sum2+=odds[j]
        }
      }
      else{
        saveVar();
        return;
      }
    }
    saveVar();
  }

  function createSeedInterval(i){
    loadGame.seedPrice[i] = (Math.random()*crops[i].seedMult[0]+crops[i].seedMult[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }
  function createCropInterval(i){
    loadGame.cropSell[i] = (Math.random()*crops[i].cropMult[0]+crops[i].cropMult[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }
  function createLivestockPriceInterval(i){
    loadGame.livestockPrice[i] = (Math.random()*livestock[i].price[0]+livestock[i].price[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }

  useEffect(() => {
    saveVar();
    for (let i = 0;i<crops.length;i++){
      addCropInterval(i);
    }
    scienceInterval = setInterval(() => {
      if(loadGame.science + loadGame.scienceInt <= loadGame.maxScience){
        loadGame.science += loadGame.scienceInt;
      }
      else{
        loadGame.science = loadGame.maxScience;
      }
      saveVar();
    },loadGame.loadScienceTime);
    builderInterval = setInterval(() =>{
      if(loadGame.manPower +  (loadGame.manPowerMultiplier * loadGame.builders) < loadGame.maxManPower){
        loadGame.manPower += (loadGame.manPowerMultiplier * loadGame.builders);
      }
      else{
        loadGame.manPower = loadGame.maxManPower;
      }
      saveVar();
    }, 5000)
    return()=>{

      clearInterval(scienceInterval);
      clearInterval(builderInterval);
    }
  })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function manageCrops(){
    var seedDiv = document.getElementById("seedDiv");
    while (seedDiv.firstChild) {
      seedDiv.removeChild(seedDiv.firstChild);
    }
    var cropDiv = document.getElementById("cropDiv");
    while (cropDiv.firstChild) {
      cropDiv.removeChild(cropDiv.firstChild);
    }
    var farmerDiv = document.getElementById("farmerDiv");
    while (farmerDiv.firstChild) {
      farmerDiv.removeChild(farmerDiv.firstChild);
    }
    var traderDiv = document.getElementById("traderDiv");
    while (traderDiv.firstChild) {
      traderDiv.removeChild(traderDiv.firstChild);
    }
    if(scienceFlags[0]===2){
      var farmerTag = document.createElement("button");
      farmerTag.setAttribute("class","buySeed");
      farmerTag.appendChild(document.createTextNode("Farmer"))
      farmerTag.onclick = (function(){
        buyFarmer();
      })
      farmerDiv.appendChild(farmerTag);
      farmerDiv.appendChild(document.createTextNode(" "+loadGame.totalFarmers));
      for(let i =loadGame.totalFarmers.toString().length;i<9;i++){
        farmerDiv.appendChild(document.createTextNode('\u00A0\u00A0'));
      }
      
      farmerDiv.appendChild(document.createTextNode("Keep "));
      var dec = document.createElement("button");
      dec.setAttribute("class", "increment");
      dec.appendChild(document.createTextNode("-"));
      dec.onclick = function(){
        if(loadGame.keepCrop >0){
          loadGame.keepCrop -=1;
          saveVar();
        }
      }
      farmerDiv.appendChild(dec);
      farmerDiv.appendChild(document.createTextNode(" "+loadGame.keepCrop+" "));
      var dec2 = document.createElement("button");
      dec2.setAttribute("class", "increment");
      dec2.appendChild(document.createTextNode("+"));
      dec2.onclick = function(){
        loadGame.keepCrop +=1;
        saveVar();
      }
      farmerDiv.appendChild(dec2);
      
      farmerDiv.appendChild(document.createElement("br"));
      farmerDiv.appendChild(document.createTextNode("Price: "+loadGame.farmerPrice.toFixed(2)+"g"));
      var traderTag = document.createElement("button");
      traderTag.setAttribute("class","buySeed");
      traderTag.appendChild(document.createTextNode("Trader"))
      traderTag.onclick = (function(){
        buyCropTrader();
      })
      traderDiv.appendChild(traderTag);
      traderDiv.appendChild(document.createTextNode(" "+loadGame.cropTraders+" "));
      var switchBtn = document.createElement("button");
      switchBtn.setAttribute("class","switch");
      if(loadGame.cropTraderStatus === 1){
        switchBtn.appendChild(document.createTextNode("Active"));
      }
      else{
        switchBtn.appendChild(document.createTextNode("Sleep"));
      }
      switchBtn.onclick = function(){
        if(cropTraderInterval){
          clearInterval(cropTraderInterval);
        }
        if(loadGame.cropTraderStatus === 1){
          loadGame.cropTraderStatus = 0
        }
        else{
          loadGame.cropTraderStatus = 1
          addCropTInterval();
        }
        saveVar();
      }
      traderDiv.append(switchBtn);
      traderDiv.appendChild(document.createElement("br"));
      traderDiv.appendChild(document.createTextNode("Price: "+loadGame.traderPrice.toFixed(2)+"g"));
    }
    
    for(let i = 0; i<crops.length;i++){
      if(crops[i].trigger()){
        displayCrop(crops[i]);
      }
    }
  }

  function displayCrop(t){
    
    var seedDiv = document.getElementById("seedDiv");
    
    var buySeed = document.createElement("button");
    buySeed.setAttribute("class", "buySeed");

    var title = document.createTextNode(t.id+"Seed");
    buySeed.appendChild(title);
    buySeed.onclick = (function(){
      t.buySeed();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    seedDiv.appendChild(buySeed);
    seedDiv.appendChild(document.createTextNode(" "+loadGame.seedsCount[t.index]));
    seedDiv.appendChild(document.createElement("br"));
    seedDiv.appendChild(document.createTextNode("Price: " + loadGame.seedPrice[t.index].toFixed(2)+"g"));

    var cropDiv = document.getElementById("cropDiv");
    var growCrop = document.createElement("button");
    growCrop.setAttribute("class", "buySeed");
    growCrop.appendChild(document.createTextNode("Grow"+t.id));
    growCrop.onclick = (function(){
      t.growCrop();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    cropDiv.appendChild(growCrop);
    cropDiv.appendChild(document.createTextNode(" "+loadGame.cropCount[t.index]));
    cropDiv.appendChild(document.createElement("br"));

    var sellCrop = document.createElement("button");
    sellCrop.setAttribute("class", "buySeed");
    sellCrop.appendChild(document.createTextNode("Sell"+t.id));
    sellCrop.onclick = (function(){
      t.sellCrop();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    cropDiv.appendChild(sellCrop);
    cropDiv.append(document.createTextNode(" "+loadGame.cropSell[t.index].toFixed(2)+"g"));

    var farmerDiv = document.getElementById("farmerDiv");
    farmerDiv.appendChild(document.createElement("br"));
    farmerDiv.appendChild(document.createTextNode(t.id+" Farmers "))
    var dec = document.createElement("button");
    dec.appendChild(document.createTextNode("-"));
    dec.onclick = (function(){
      addFarmer(t.index,-1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    dec.setAttribute("class","increment");
    farmerDiv.appendChild(dec);
    farmerDiv.appendChild(document.createTextNode(" "+loadGame.farmersCount[t.index]+" "));
    var dec2 = document.createElement("button");
    dec2.appendChild(document.createTextNode("+"));
    dec2.setAttribute("class","increment");
    dec2.onclick = (function(){
      addFarmer(t.index,1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    farmerDiv.appendChild(dec2);
  }

  function manageLivestock(){
    var animalsDiv = document.getElementById("animalsDiv");
    while(animalsDiv.firstChild){
      animalsDiv.removeChild(animalsDiv.firstChild);
    }
    var herdersDiv = document.getElementById("herdersDiv");
    while(herdersDiv.firstChild){
      herdersDiv.removeChild(herdersDiv.firstChild);
    }
    var livestockTraderDiv = document.getElementById("livestockTraderDiv");
    while(livestockTraderDiv.firstChild){
      livestockTraderDiv.removeChild(livestockTraderDiv.firstChild);
    }
    if(scienceFlags[1] ===2){
      var herdButton = document.createElement("button");
      herdButton.setAttribute("class","buySeed");
      herdButton.appendChild(document.createTextNode("Worker"));
      herdButton.onclick = (function(){
        buyHerder();
      })
      herdersDiv.appendChild(herdButton);
      herdersDiv.appendChild(document.createTextNode(" "+loadGame.totalHerders));
      for(let i =loadGame.totalHerders.toString().length;i<9;i++){
        herdersDiv.appendChild(document.createTextNode('\u00A0\u00A0'));
      }
      herdersDiv.appendChild(document.createTextNode("Keep "));
      var dec = document.createElement("button");
      dec.setAttribute("class", "increment");
      dec.appendChild(document.createTextNode("-"));
      dec.onclick = function(){
        if(loadGame.keepLivestock >0){
          loadGame.keepLivestock -=1;
          saveVar();
        }
      }
      herdersDiv.appendChild(dec);
      herdersDiv.appendChild(document.createTextNode(" "+loadGame.keepLivestock+" "));
      var dec2 = document.createElement("button");
      dec2.setAttribute("class", "increment");
      dec2.appendChild(document.createTextNode("+"));
      dec2.onclick = function(){
        loadGame.keepLivestock +=1;
        saveVar();
      }
      herdersDiv.appendChild(dec2);
      herdersDiv.appendChild(document.createElement("br"));
      herdersDiv.appendChild(document.createTextNode("Price: "+loadGame.herderPrice+"g"));
      herdersDiv.appendChild(document.createElement("br"));
      var trader = document.createElement("button");
      trader.setAttribute("class","buySeed");
      trader.appendChild(document.createTextNode("Trader"));
      trader.onclick = (function(){
        buyLivestockTrader();
      })
      livestockTraderDiv.appendChild(trader);

      livestockTraderDiv.appendChild(document.createTextNode(" "+loadGame.livestockTraders+" "));
      var switchBtn = document.createElement("button");
      switchBtn.setAttribute("class","switch");
      if(loadGame.livestockTraderStatus === 1){
        switchBtn.appendChild(document.createTextNode("Active"));
      }
      else{
        switchBtn.appendChild(document.createTextNode("Sleep"));
      }
      switchBtn.onclick = function(){
        if(livestockTraderInterval){
          clearInterval(livestockTraderInterval);
        }
        if(loadGame.livestockTraderStatus === 1){
          loadGame.livestockTraderStatus = 0
        }
        else{
          loadGame.livestockTraderStatus = 1
          addLivestockTInterval();
        }
        saveVar();
      }
      livestockTraderDiv.appendChild(switchBtn);
      livestockTraderDiv.appendChild(document.createElement("br"));
      livestockTraderDiv.appendChild(document.createTextNode("Price: "+loadGame.traderPrice.toFixed(2) +"g"));
    }
    
    for (let i = 0;i<livestock.length;i++){
      if(livestock[i].trigger()){
        displayLivestock(livestock[i]);
      }
    }
  }
  function displayLivestock(t){
    var animalsDiv = document.getElementById("animalsDiv");
    var animalButton = document.createElement("button");
    animalButton.setAttribute("class","buySeed");
    animalButton.appendChild(document.createTextNode("Sell"+t.id));
    animalButton.onclick = function(){
      t.sell();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
    animalsDiv.appendChild(animalButton);
    animalsDiv.appendChild(document.createTextNode(" "+loadGame.livestockCount[t.index]));
    animalsDiv.appendChild(document.createElement("br"));
    animalsDiv.appendChild(document.createTextNode("Price: "+loadGame.livestockPrice[t.index].toFixed(2)+"g"))
    var herdersDiv = document.getElementById("herdersDiv");
    herdersDiv.appendChild(document.createTextNode(t.occ+" "));
    var dec = document.createElement("button");
    dec.appendChild(document.createTextNode("-"));
    dec.onclick = (function(){
      addHerder(t.index,-1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    dec.setAttribute("class","increment");
    herdersDiv.appendChild(dec);
    herdersDiv.appendChild(document.createTextNode(" "+loadGame.herderCount[t.index]+" "));
    var dec2 = document.createElement("button");
    dec2.appendChild(document.createTextNode("+"));
    dec2.setAttribute("class","increment");
    dec2.onclick = (function(){
      addHerder(t.index,1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    herdersDiv.appendChild(dec2);
    herdersDiv.appendChild(document.createElement("br"));
  }

  function manageMining(){
    var materialsDiv = document.getElementById("materialsDiv");
    while (materialsDiv.firstChild) {
      materialsDiv.removeChild(materialsDiv.firstChild);
    }
    for(let i =0;i<materials.length;i++){
      if(materials[i].trigger()){
        displayMining(materials[i]);
      }
    }
  }
  function displayMining(t){
    var materialsDiv = document.getElementById("materialsDiv");
    var matButton = document.createElement("button");
    matButton.setAttribute("class","buySeed");
    matButton.appendChild(document.createTextNode("Sell"+t.id));
    matButton.onclick = function(){
      if(loadGame.materialCount[t.index] >0){
        loadGame.materialCount[t.index] -=1;
        loadGame.money += loadGame.materialPrice[t.index];
      }
      saveVar();
    }
    materialsDiv.appendChild(matButton);
    materialsDiv.appendChild(document.createTextNode(" "+loadGame.materialCount[t.index]+" "));
    var buyWorker = document.createElement("button");
    buyWorker.setAttribute("class","buySeed");
    buyWorker.appendChild(document.createTextNode(t.occ));
    buyWorker.onclick = function(){
      t.buy();
      loadGame = JSON.parse(localStorage.getItem("game"));
      startResourceInterval(t.index);
      saveVar();
    }
    materialsDiv.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'))
    materialsDiv.appendChild(buyWorker);
    materialsDiv.appendChild(document.createTextNode(" "+loadGame.materialWorkers[t.index]));
    materialsDiv.appendChild(document.createElement("br"));
    materialsDiv.appendChild(document.createTextNode("Price: "+loadGame.materialPrice[t.index].toFixed(2)+"g"));
    for(let i = 0;i< loadGame.materialCount[t.index].toString().length+1 ;i++){
      materialsDiv.appendChild(document.createTextNode('\u00A0\u00A0'))
    }
    
    materialsDiv.appendChild(document.createTextNode(" Price: "+t.occPrice+"g"));
    materialsDiv.appendChild(document.createElement("br"));
  }

  function manageFood(){
    var foodDiv = document.getElementById("foodDiv");
    while (foodDiv.firstChild) {
      foodDiv.removeChild(foodDiv.firstChild);
    }
    foodDiv.appendChild(document.createTextNode("Housing: "+(loadGame.housing-loadGame.unusedHousing)+"/"+loadGame.housing));
    foodDiv.appendChild(document.createElement("br"));
    foodDiv.appendChild(document.createTextNode("Reserved: "+loadGame.storedFood+" (-"+(loadGame.population*3)+")"))
    foodDiv.appendChild(document.createElement("br"));
    var tracker = 1;
    for(let i = 0;i<crops.length;i++){
      if(crops[i].trigger()){
        foodDiv.appendChild(document.createTextNode(crops[i].id+" ("+crops[i].feed+"): "+loadGame.storedCrops[i]));
        for (let j =crops[i].id.length+loadGame.storedCrops[i].toString().length+2;j<13;j++){
          foodDiv.appendChild(document.createTextNode('\u00A0'))
        }
        if (tracker %3===0){
          foodDiv.appendChild(document.createElement("br"));
        }
        tracker+=1;
      }
    }
    foodDiv.appendChild(document.createElement("br"));
    for(let i = 0;i<livestock.length;i++){
      if((livestock[i].scienceReq ===null || scienceFlags[livestock[i].scienceReq]===2)&& livestock[i].edible === true){
        foodDiv.appendChild(document.createTextNode(livestock[i].meat+" ("+livestock[i].feed+"): "+loadGame.storedMeat[i]));
        for (let j =livestock[i].id.length+loadGame.storedMeat[i].toString().length+2;j<11;j++){
          foodDiv.appendChild(document.createTextNode('\u00A0'))
        }
        if (tracker %3===0){
          foodDiv.appendChild(document.createElement("br"));
        }
        tracker+=1;
      }
    }
  }

  function manageTech(){
    var scDiv = document.getElementById("scienceScore");
    while (scDiv.firstChild) {
      scDiv.removeChild(scDiv.firstChild);
    }
    
    var scienceDiv = document.getElementById("scienceDiv");
    while (scienceDiv.firstChild) {
      scienceDiv.removeChild(scienceDiv.firstChild);
    }
    scDiv.appendChild(document.createTextNode("Science: "+loadGame.science+" (+"+loadGame.scienceInt+")"));
    for(let i = 0;i<tech.length;i++){
      if(tech[i].trigger()){
        displayTech(tech[i]);
      }
    }
  }

  function displayTech(t){
    
    var tempdiv = document.getElementById("scienceDiv");
    
    t.element = document.createElement("button");
    t.element.setAttribute("id", t.id);
    t.element.setAttribute("class", "scienceButton");
    var span = document.createElement("span");
    span.style.fontWeight = "bold"
    //span.style.fontFamily = "Times New Roman"
    var title = document.createTextNode(t.title+" ");
    span.appendChild(title);
    var cost = document.createTextNode(t.priceTag+"\n");
    t.element.append(span);
    t.element.append(cost);
    var space = document.createElement("br");
    t.element.append(space);

    var span2 = document.createElement("span");
    var title2 = document.createTextNode(t.description+" ");
    span2.appendChild(title2);
    t.element.append(span2);

    t.element.onclick = (function(){canBuyScience(t)});
    
    tempdiv.appendChild(t.element);
    
  }

  function canBuyScience(t){
    t.effect();
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
    if(t.cost <= loadGame.science){
      
      if(t.title === "Pastoralism"){
        beginWildAnimals();
      }
      
      if(t.id === "Tech1"){
        for(let i = 0;i<crops.length;i++){
          seedPriceIntervals[i] = setInterval(()=>{
            createSeedInterval(i);
          },(Math.random()*3+7)*1000);
          cropPriceIntervals[i] = setInterval(()=>{
            createCropInterval(i);
          },(Math.random()*3+7)*1000);
        }
        gameStart = 1;
      }
      if(t.id ==="animalHusbandryTech"){
        for(let i = 0;i<livestock.length;i++){
          livestockPriceIntervals[i] = setInterval(()=>{
            createLivestockPriceInterval(i);
          },(Math.random()*3+10)*1000);
        }
      }
    }
  }

  function manageBuildings(){
    var buildingDiv = document.getElementById("buildingDiv");
    var builderDiv = document.getElementById("builderDiv");
    while (buildingDiv.firstChild) {
      buildingDiv.removeChild(buildingDiv.firstChild);
    }
    while (builderDiv.firstChild) {
      builderDiv.removeChild(builderDiv.firstChild);
    }
    builderDiv.appendChild(document.createTextNode("Manpower: "+loadGame.manPower+" (+"+loadGame.builders*loadGame.manPowerMultiplier+")"));
    builderDiv.appendChild(document.createElement("br"));
    var builderButton = document.createElement("button");
    builderButton.setAttribute("class","buySeed");
    builderButton.appendChild(document.createTextNode("Builder"));
    builderButton.onclick = function(){
      buyBuilder();
      saveVar();
    }
    builderDiv.appendChild(builderButton);
    
    builderDiv.appendChild(document.createTextNode(" "+loadGame.builders));
    builderDiv.appendChild(document.createElement("br"));
    builderDiv.appendChild(document.createTextNode("Price: "+loadGame.builderPrice.toFixed(2)+"g"));
    builderDiv.appendChild(document.createElement("br"));
    builderDiv.appendChild(document.createElement("hr"));
    for(let i = 0;i<buildings.length;i++){
      if(buildings[i].trigger()){
        displayBuilding(buildings[i]);
      }
    }
  }
  function displayBuilding(t){
    var buildingDiv = document.getElementById("buildingDiv");
    var button = document.createElement("button");
    button.setAttribute("class","buildingButton");
    button.appendChild(document.createTextNode(t.id));
    button.appendChild(document.createElement("br"));

    var description = document.createElement("a");
    description.setAttribute("class","ghostLabel");
    description.appendChild(document.createTextNode(t.description));
    button.appendChild(description);
    button.onclick = function(){
      t.effect();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
    
    buildingDiv.appendChild(button);
    buildingDiv.appendChild(document.createTextNode(" "+loadGame.buildingCount[t.index]+" "));
    if(t.prev !== null){
      var button2 = document.createElement("button");
      button2.setAttribute("class","buildingButton");
      var description2 = document.createElement("a");
      description2.setAttribute("class","ghostLabel");
      description2.appendChild(document.createTextNode(t.upgradeDescription));
      
      button2.onclick = function(){
        t.effect2();
        loadGame = JSON.parse(localStorage.getItem("game"));
        saveVar();
      }
      button2.appendChild(document.createTextNode("Upgrade"+buildings[t.prev].id))
      button2.appendChild(description2);
      buildingDiv.appendChild(button2);
      buildingDiv.appendChild(document.createElement("br"));
      buildingDiv.appendChild(document.createTextNode("Upgrade: "));
      buildingDiv.appendChild(document.createTextNode(t.upgradeManpower+"mp; "));
      buildingDiv.appendChild(document.createTextNode(t.upgradeGold+"g; "));
      for(let i =0; i<t.upgradePrice.length; i++){
        buildingDiv.appendChild(document.createTextNode(" "+t.upgradePrice[i]));
        buildingDiv.appendChild(document.createTextNode(resourceString[t.upgradePriceIndex[i]]+";"));
      }
    }
    
    buildingDiv.appendChild(document.createElement("br"));
    buildingDiv.appendChild(document.createTextNode("Price: "));
    buildingDiv.appendChild(document.createTextNode(t.manpower+"mp; "));
    buildingDiv.appendChild(document.createTextNode(t.goldPrice+"g; "));
    for(let i =0; i<t.price.length; i++){
      buildingDiv.appendChild(document.createTextNode(" "+t.price[i]));
      buildingDiv.appendChild(document.createTextNode(resourceString[t.priceIndex[i]]+";"));
    }
    buildingDiv.appendChild(document.createElement("br"));

  }

 
  
  function manageProjects(){
    var projectsDiv = document.getElementById("pDiv");
    while (projectsDiv.firstChild) {
      projectsDiv.removeChild(projectsDiv.firstChild);
    }
    
    for(let i = 0;i<projects.length;i++){
      
      if(projects[i].trigger()){
        
        displayProject(projects[i]);
      }
    }
  }

  function displayProject(t){
    var tempDiv = document.getElementById("pDiv");
    t.element = document.createElement("button");
    t.element.setAttribute("id", t.id);
    t.element.setAttribute("class","scienceButton");
    var span = document.createElement("span");
    span.style.fontWeight = "bold"
    var title = document.createTextNode(t.description+" ");
    span.appendChild(title);
    var cost = document.createTextNode(t.priceTag+"\n");
    t.element.append(span);
    t.element.append(cost);
    var space = document.createElement("br");
    t.element.append(space);

    var span2 = document.createElement("span");
    var title2 = document.createTextNode(t.description2+" ");
    span2.appendChild(title2);
    t.element.append(span2);
    t.element.onclick = (function(){canBuyProject(t)});
    tempDiv.appendChild(t.element);
    
  }
  function canBuyProject(t){
    if(t.cost <= loadGame.science){
      t.effect();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
  }

  function manageMilitaryUnits(){
    var militaryDiv = document.getElementById("militaryUnitsDiv");
    while (militaryDiv.firstChild) {
      militaryDiv.removeChild(militaryDiv.firstChild);
    }
    for(let i = 0;i<military.length;i++){
      if(military[i].trigger() || loadGame.militaryUnits[i]>0 || loadGame.currentMilitaryUnits[i]>0){
        displayMilitaryUnit(military[i]);
      }
    }
  }

  function displayMilitaryUnit(t){
    
    var tempdiv = document.getElementById("militaryUnitsDiv");
    var button = document.createElement("button");
    
    button.setAttribute("class", "buyUnitButton");
    var span = document.createElement("a");
    var title = document.createTextNode(t.id);
    span.appendChild(title);
    button.appendChild(span);
    tempdiv.appendChild(button);

    var list = document.createElement("ul");
    list.setAttribute("class", "ghostLabel");
    list.append(document.createElement("li").appendChild(document.createTextNode("Range: " + t.range)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Melee: " + t.melee)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Strength: " + t.strength)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("IQ: " + t.iq)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Mobility: " + t.mobility)));
    button.appendChild(list);
    tempdiv.appendChild(button);
    tempdiv.appendChild(document.createTextNode(" "+loadGame.militaryUnits[t.index]+" "));
    var assign = document.createElement("button");
    assign.appendChild(document.createTextNode(">"));
    assign.setAttribute("class","increment");
    assign.onclick = function(){
      
      assignToArmy(t.index);
      saveVar();
    }
    tempdiv.appendChild(assign);
    tempdiv.appendChild(document.createTextNode(" "+loadGame.currentMilitaryUnits[t.index]+" "));
    tempdiv.appendChild(document.createElement("br"));
    tempdiv.appendChild(document.createTextNode("Price: "));
    tempdiv.appendChild(document.createTextNode(t.goldPrice+"g; "));
    if(t.horse>0){
      tempdiv.appendChild(document.createTextNode(t.horse+"horse"));
      if(t.horse > 1){
        tempdiv.appendChild(document.createTextNode("s"));
      }
      tempdiv.appendChild(document.createTextNode("; "));
    }
    for(let i =0; i<t.price.length; i++){
      tempdiv.appendChild(document.createTextNode(t.price[i]));
      tempdiv.appendChild(document.createTextNode(resourceString[t.priceIndex[i]]+"; "));
    }
    button.onclick = (function(){
      if(t.trigger()){
        t.train();
        loadGame = JSON.parse(localStorage.getItem("game"));
        saveVar();
      }
      
    });
    tempdiv.appendChild(document.createElement("br")); 
  }

  function manageWar(){
    var warDiv = document.getElementById("warDiv");
    while (warDiv.firstChild) {
      warDiv.removeChild(warDiv.firstChild);
    }
    var search = document.createElement("button");
    search.setAttribute("class","searchWarButton");
    search.appendChild(document.createTextNode("Search for Battle"));
    search.onclick = function(){
      if(loadGame.currentMilitaryPower > 0 && loadGame.foundFight === false){
        findBattle();
        saveVar();
        

      }
    };
    warDiv.appendChild(search);
    warDiv.appendChild(document.createElement("br"));
    warDiv.appendChild(document.createTextNode("Gold Prize: "+loadGame.goldPrize.toFixed(2)));
    warDiv.appendChild(document.createElement("br"));
    warDiv.appendChild(document.createTextNode("Land Prize: "+loadGame.landPrize));
    warDiv.appendChild(document.createElement("br"));
    warDiv.appendChild(document.createTextNode("Estimated Captives: "+loadGame.captives));
    warDiv.appendChild(document.createElement("br"));
    warDiv.appendChild(document.createElement("br"));
    if(loadGame.foundFight === true){     
      for(let i = 0; i<loadGame.currentMilitaryUnits.length;i++){
        if(military[i].trigger() || loadGame.militaryUnits[i]>0 || loadGame.currentMilitaryUnits[i]>0){
          var span1 = document.createElement(("span"));
          span1.textContent = military[i].id+": "+loadGame.currentMilitaryUnits[i];
          span1.setAttribute("style","margin-left: 5%;color: blue");
          warDiv.appendChild(span1);
          var span = document.createElement(("span"));
          span.textContent = loadGame.enemyMilitaryUnits[i] + ": " +military[i].id;
          for(let j = 0;j< 20-military[i].id.length; j++){
            warDiv.appendChild(document.createTextNode('\u00A0'))
          }
          span.setAttribute("style","color: red");
          warDiv.appendChild(span);
          
          
          //warDiv.appendChild(span);
          warDiv.appendChild(document.createElement("br"));
        }
      } 
      var fight = document.createElement("button");
      fight.setAttribute("class","searchWarButton");
      fight.appendChild(document.createTextNode("FIGHT!!!"));
      fight.onclick = function(){
        if(loadGame.inFight === false){
          
          loadGame.inFight = true;
          startFight();
          saveVar();
        }
      }
      warDiv.appendChild(fight);
      warDiv.appendChild(document.createElement("br"));
      var pass = document.createElement("button");
      pass.setAttribute("class","searchWarButton");
      pass.appendChild(document.createTextNode("Flee"));
      pass.onclick = function(){
        if(loadGame.inFight === false){
          loadGame.foundFight = false;
          loadGame.goldPrize = 0;
          loadGame.landPrize = 0;
          loadGame.captives = 0;
          saveVar();
        }
        
      }
      warDiv.appendChild(pass);
    }
    
    
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var T = 0;
  var T1 = 0;
  var anId = false;
  var startX = 0;
  var startY = 0;
  var rateX = 1;
  var rateY = 1;
  var wildAnimal = 0;
  var color = "";
  function beginWildAnimals(){
    anId = false;
    createWildAnimal();
    animationLoop();
  }
  function animationLoop(timeStamp){
    if(anId){
      return;
    }
    T+=rateX;
    T1+=rateY;
    draw();
    window.requestAnimationFrame(animationLoop);
    
  }
  function draw(){
    var canvas = document.getElementById("livestockConfigDiv");
    canvas.width = "140";
    canvas.height = "140";
    
    canvas.addEventListener("mousedown", function(e){
      getMousePosition(canvas,e);
    });
    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = color;
    context.beginPath();
    context.arc(startX+T,startY+T1,7,0,2*Math.PI)
    context.stroke();
    context.fill()
    
    if(startX+T > 170 || startY+T1>170 || startX+T<-20 || startY+T1< -20){
      context.clearRect(0,0,canvas.width, canvas.height);
      T = 0;
      T1 = 0;
      startX=0;
      startY=0;
      window.cancelAnimationFrame(anId);
      anId = true;
      setTimeout(() => {beginWildAnimals();}, (Math.random()*5+5)*1000);
    }
  }
  function getMousePosition(canvas,event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    var x0 = startX+T;
    var y0 = startY+T1;
    if(Math.sqrt((x0-x)**2+(y0-y)**2)<7 && loadGame.unusedLivestockLand > 0){
      canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
      T = 0;
      T1 = 0;
      startX=0;
      startY=0;
      window.cancelAnimationFrame(anId);
      anId = true;
      canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
      if(livestock[wildAnimal].trigger()){
        getWildAnimal(wildAnimal);
      }
      saveVar();
      setTimeout(() => {beginWildAnimals();}, (Math.random()*5+5)*1000);
      
    }
  }
  function getWildAnimal(i){
    if(loadGame.livestockCount[i] + 1>loadGame.keepLivestock && loadGame.meatStorageSpace > 0){
      loadGame.storedMeat[i] +=1;
      loadGame.meatStorageSpace -= 1;
      loadGame.storedFood += 1;
    }
    else if(loadGame.unusedLivestockLand > 0){
      loadGame.livestockCount[i] += 1;
      loadGame.unusedLivestockLand -= 1;
    }
    
    saveVar();
  }
  function createWildAnimal(){
    var animalColors = ["#fff8dc","#66422D","#FFF416"]
    var top = Math.random();
    var left = Math.random();
    if(top <0.5){
      startX = Math.random()*-10+0.01
      rateX = Math.random()*1.8+0.1;
    }
    else{
      startX = Math.random()*10+150
      rateX = Math.random()*-1.8+0.1;
    }
    if(left<0.5){
      startY = Math.random()*-10+0.01
      rateY = Math.random()*1.8+0.1;
    }
    else{
      startY = Math.random()*10+150
      rateY = Math.random()*-1.8+0.1;
    }
    wildAnimal = Math.floor(Math.random()*3);
    color = animalColors[wildAnimal];
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function incrementFarmLand(x){
    if(x === -1 && (loadGame.farmLand <= 0 || loadGame.unusedFarmLand <= 0)){
      return;
    }
    if(x === 1 && (loadGame.unusedLand <= 0)){
      return;
    }
    loadGame.unusedLand -= x;
    loadGame.farmLand += x;
    loadGame.unusedFarmLand += x
    saveVar();
  }
  function incrementLivestockLand(x){
    if(x === -1 && (loadGame.livestockLand <= 0 || loadGame.unusedLivestockLand <= 4)){
      return;
    }
    if(x === 1 && (loadGame.unusedLand <= 4)){
      return;
    }
    
    loadGame.unusedLand -= (5*x);
    loadGame.livestockLand += x;
    loadGame.unusedLivestockLand += 5*x
    saveVar();
  }
  function incrementMiningLand(x){
    if(x === -1 && (loadGame.miningLand <= 0 || loadGame.unusedMiningLand <= 2)){
      return;
    }
    if(x === 1 && (loadGame.unusedLand <= 2)){
      return;
    }
    
    loadGame.unusedLand -= (3*x);
    loadGame.miningLand += x;
    loadGame.unusedMiningLand += 3*x
    saveVar();
  }
  function addCropInterval(i){
    
    if(loadGame.farmersCount[i] <= 0){
      growIntervals[i] = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.farmersCount[i]));
    }
    else{
      growIntervals[i] = setInterval(() => {
        crops[i].growCrop();
        if(projects[2].flag===1){
          if(loadGame.seedsCount[i] <=0){
            crops[i].buySeed(i);
          }
        }
        loadGame = JSON.parse(localStorage.getItem("game"));
        saveVar();
      },loadGame.farmerSpeed * 1000/(loadGame.farmersCount[i]));
    }
  }

  function addCropTInterval(){
    if(loadGame.cropTraders <= 0 || loadGame.cropTraderStatus ===0){
      cropTraderInterval = setInterval(() => {},loadGame.traderSpeed * 1000/(loadGame.cropTraders));
    }
    else{
      cropTraderInterval = setInterval(() => {
        sellCrop();
      },loadGame.traderSpeed * 1000/(loadGame.cropTraders));
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyLand(){
    if (loadGame.landPrice <= loadGame.money){
      loadGame.land += 1;
      loadGame.unusedLand += 1;
      loadGame.money -= loadGame.landPrice;
      loadGame.landPrice *= (Math.random()*0.2+1);
      saveVar();
    }
  }
  function sellCrop(){
    
    var totalCrops = 0;
    for(let i =0;i<crops.length;i++){
      if(loadGame.cropCount[i] > loadGame.keepCrop){
        totalCrops += loadGame.cropCount[i];
      }
    }
    if (totalCrops > 0){
      var odds = []
      for(let i =0;i<crops.length;i++){
        if(loadGame.cropCount[i] <= loadGame.keepCrop){
          odds.push(0);
        }
        else{
          odds.push(loadGame.cropCount[i]/totalCrops)
        }
        
      }
      const chance = Math.random();
      var sum = 0;
      for(let i =0;i<crops.length;i++){
        if(chance <odds[i]+sum){
          crops[i].sellCrop();
          loadGame = JSON.parse(localStorage.getItem("game"));
          saveVar();
          break;
        }
        else{
          sum += odds[i];
        }
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyFarmer(){
    if(loadGame.unusedPopulation > 0 && loadGame.unusedHousing > 0){
      loadGame.totalFarmers +=1;
      loadGame.unusedPopulation -=1;
      loadGame.unusedFarmers += 1;
      loadGame.unusedHousing -= 1;
      saveVar();
      return;
    }
    if(loadGame.farmerPrice <= loadGame.money && loadGame.unusedHousing > 0){
      loadGame.unusedHousing -= 1;
      loadGame.money -= loadGame.farmerPrice;
      loadGame.farmerPrice *= (1+Math.random()*0.1);
      loadGame.totalFarmers +=1;
      loadGame.unusedFarmers +=1;
      loadGame.population += 1;
      saveVar();
    }
  }
  function addFarmer(i,b){
    if((loadGame.unusedFarmers > 0 && b === 1) || (loadGame.farmersCount[i] > 0 && b === -1)){
      loadGame.unusedFarmers -= b;
      loadGame.farmersCount[i] += b;
      if(growIntervals[i] !== null){
        clearInterval(growIntervals[i]);
      }
      addCropInterval(i);
      saveVar();
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function buyCropTrader(){
    if(loadGame.unusedPopulation > 0 && loadGame.unusedHousing > 0){
      loadGame.cropTraders +=1;
      loadGame.unusedPopulation -=1;
      loadGame.unusedHousing -= 1;
      if(cropTraderInterval){
        clearInterval(cropTraderInterval);
      }
      addCropTInterval();
      saveVar();
      return;
    }
    if(loadGame.traderPrice <= loadGame.money && loadGame.unusedHousing>0){
      loadGame.money -= loadGame.traderPrice;
      loadGame.unusedHousing -= 1;
      loadGame.traderPrice *= (1+Math.random()*0.1);
      loadGame.cropTraders +=1;
      loadGame.population += 1;
      if(cropTraderInterval){
        clearInterval(cropTraderInterval);
      }
      addCropTInterval();
      saveVar();
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyHerder(){
    if(loadGame.unusedPopulation > 0 && loadGame.unusedHousing > 0){
      loadGame.totalHerders +=1;
      loadGame.unusedHerders +=1;
      loadGame.unusedPopulation -=1;
      loadGame.unusedHousing -= 1;
      saveVar();
      return;
    }
    if(loadGame.herderPrice <= loadGame.money && loadGame.unusedHousing > 0){
      loadGame.unusedHousing -= 1;
      loadGame.money -= loadGame.herderPrice;
      loadGame.farmerPrice *= (1+Math.random()*0.1);
      loadGame.totalHerders +=1;
      loadGame.unusedHerders +=1;
      loadGame.population += 1;
      saveVar()
    }
  }
  function addHerder(i,b){
    if((loadGame.unusedHerders > 0 && b === 1) || (loadGame.herderCount[i] > 0 && b === -1)){
      loadGame.unusedHerders -= b;
      loadGame.herderCount[i] += b;
      if(breedIntervals[i] !== null){
        clearInterval(breedIntervals[i]);
      }
      addBreedInterval(i);
      saveVar();
    }
  }
  function addBreedInterval(i){
    
    if(loadGame.herderCount[i] <= 0){
      breedIntervals[i] = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.farmersCount[i]));
    }
    else{
      breedIntervals[i] = setInterval(() => {
        if(scienceFlags[1]===2){
          if(loadGame.livestockCount[i] >=2 && livestock[i].breed){
            var tries = parseInt(loadGame.livestockCount[i]/2);
            var chance;
            for(let j = 0; j<tries;j++){
              chance = Math.random();
              if (chance < loadGame.livestockBreedChance[i] && loadGame.unusedLivestockLand > 0 && livestock[i].edible){
                if(loadGame.meatStorageSpace > 0 && loadGame.livestockCount[i]+1 > loadGame.keepLivestock){
                  loadGame.storedMeat[i] += 1;
                  loadGame.storedFood += 1;
                  loadGame.meatStorageSpace -= 1;
                }
                else{
                  loadGame.livestockCount[i] += 1;
                  loadGame.unusedLivestockLand -= 1;
                }
              }
            }
          }
          else if(livestock[i].breed === false){
            if(Math.random() < loadGame.livestockBreedChance[i]){
              if(loadGame.meatStorageSpace > 0 && loadGame.livestockCount[i]+1 > loadGame.keepLivestock && livestock[i].edible){
                loadGame.storedMeat[i] += 1;
                loadGame.storedFood += 1;
                loadGame.meatStorageSpace -= 1;
              }
              else{
                loadGame.livestockCount[i] += 1;
              }
            }
          }
        }
        saveVar();
      },loadGame.breedSpeed * 1000/(loadGame.herderCount[i]));
    }
  }
  function buyLivestockTrader(){
    if(loadGame.unusedPopulation > 0 && loadGame.unusedHousing > 0){
      loadGame.livestockTraders +=1;
      loadGame.unusedPopulation -=1;
      loadGame.unusedHousing -= 1;
      if(livestockTraderInterval){
        clearInterval(livestockTraderInterval);
      }
      addLivestockTInterval();
      saveVar();
      return;
    }
    if(loadGame.traderPrice <= loadGame.money && loadGame.unusedHousing>0){
      loadGame.money -= loadGame.traderPrice;
      loadGame.unusedHousing -= 1;
      loadGame.traderPrice *= (1+Math.random()*0.1);
      loadGame.livestockTraders +=1;
      loadGame.population += 1;
      if(livestockTraderInterval){
        clearInterval(livestockTraderInterval);
      }
      addLivestockTInterval();
      saveVar();
    }
  }
  function addLivestockTInterval(){
    if(loadGame.livestockTraders <= 0){
      cropTraderInterval = setInterval(() => {},loadGame.traderSpeed * 1000/(loadGame.livestockTraders));
    }
    else{
      cropTraderInterval = setInterval(() => {
        sellLivestock();
      },loadGame.traderSpeed * 1000/(loadGame.livestockTraders));
    }
  }
  function sellLivestock(){
    var totalLivestock = 0;
    for(let i =0;i<livestock.length;i++){
      totalLivestock += loadGame.livestockCount[i];
    }
    if (totalLivestock > 0){
      var odds = []
      for(let i =0;i<livestock.length;i++){
        odds.push(loadGame.livestockCount[i]/totalLivestock)
      }
      const chance = Math.random();
      var sum = 0;
      for(let i =0;i<livestock.length;i++){
        if(chance <odds[i]+sum){
          livestock[i].sellLivestock();
          loadGame = JSON.parse(localStorage.getItem("game"));
          saveVar();
          break;
        }
        else{
          sum += odds[i];
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyBuilder(){
    if(loadGame.unusedHousing <=0 || ((loadGame.money < loadGame.builderPrice) && loadGame.unusedPopulation <= 0)){
      return;
    }
    if(loadGame.unusedPopulation>0){
      loadGame.builders += 1;
      loadGame.unusedHousing -= 1;
      loadGame.unusedPopulation -= 1;
    }
    else{
      loadGame.builders += 1;
      loadGame.money -= loadGame.builderPrice;
      loadGame.unusedHousing -= 1;
      loadGame.builderPrice *= (Math.random()*0.1 + 1.0)
      loadGame.population += 1;
    }
    clearInterval(builderInterval);
    builderInterval = setInterval(() =>{
      if (loadGame.manPower + (loadGame.manPowerMultiplier * loadGame.builders) < loadGame.maxManPower){
        loadGame.manPower += (loadGame.manPowerMultiplier * loadGame.builders);
      }
      else{
        loadGame.manPower = loadGame.maxManPower;
      }
      
      saveVar();
    }, 5000)
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function startResourceInterval(t){
    if(matIntervals[t]){
      clearInterval(matIntervals[t]);
    }
    matIntervals[t] = setInterval(() =>{
      if(loadGame.materialCount[t]+loadGame.materialWorkers[t] < loadGame.materialStorage[t]){
        loadGame.materialCount[t] += loadGame.materialWorkers[t];
      }
      else{
        loadGame.materialCount[t] = loadGame.materialStorage[t];
      }
      saveVar();
    },loadGame.matSpeed);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function assignToArmy(i){
    
    if(loadGame.militaryUnits[i] > 0 && loadGame.foundFight === false){
      loadGame.militaryUnits[i]-=1;
      loadGame.currentMilitaryUnits[i] +=1;
      var power = loadGame.militaryValues[i].pop();
      (loadGame.currentMilitaryValues[i]).push(power);
      loadGame.currentMilitaryPower += power;
    }
    
  }

  function findBattle(){
    loadGame.foundFight = true;
    for(let i =0;i<loadGame.enemyMilitaryUnits.length;i++){
      loadGame.enemyMilitaryUnits[i] = 0;
      loadGame.enemyMilitaryValues[i] = [];
    }
    var number = 0;
    for(let i =0; i<loadGame.currentMilitaryUnits.length;i++){
      if(military[i].trigger()){
        if(loadGame.currentMilitaryUnits[i] === 0){
          number = Math.floor(Math.random()*4+1);
        }
        else{
          number = Math.floor(Math.random()*(1.5*loadGame.currentMilitaryUnits[i]));
        }
        loadGame.enemyMilitaryUnits[i] = number;
        for(let j = 0; j<number; j++){
          loadGame.enemyMilitaryValues[i].push(military[i].trainEnemy());
        }
      }
    }
    var sum1 = 0;
    var sum2 = 0;
    for(let i = 0; i<loadGame.currentMilitaryUnits.length;i++){
      sum1 += loadGame.currentMilitaryUnits[i];
    }
    for(let i = 0; i<loadGame.enemyMilitaryUnits.length;i++){
      sum2 += loadGame.enemyMilitaryUnits[i];
    }
    
    loadGame.goldPrize = sum2/sum1 * (Math.abs(sum2-sum1)+1) * 10 *(Math.random()*0.2+0.4)*loadGame.currentMilitaryPower + 200;
    loadGame.landPrize = Math.ceil(sum2/sum1 * Math.abs(sum2-sum1) * 0.5*(Math.random()*0.4+0.8)+(Math.floor(Math.random()*5)));
    loadGame.captives = Math.floor(sum2 * Math.random()*0.5+0.01);
    
    saveVar();
  }
  
  function startFight(){
    fightInterval = setInterval(()=>{
      fight();
      if(loadGame.inFight){
        
      }
      else{
        if(loadGame.winner === 2){
          loadGame.money += loadGame.goldPrize;
          loadGame.land += loadGame.landPrize;
          loadGame.unusedLand += loadGame.landPrize;
          loadGame.population += loadGame.captives;
          loadGame.unusedPopulation += loadGame.captives;
          
        }
        clearInterval(fightInterval);
        loadGame.foundFight = false;
        loadGame.goldPrize = 0;
        loadGame.landPrize = 0;
        loadGame.captives = 0;
        saveVar();
      }
    },3000);
  }
  function fight(){
    var sum1 = 0;
    var sum2 = 0;
    for(let i = 0;i<loadGame.enemyMilitaryUnits.length;i++){
      sum1 += loadGame.enemyMilitaryUnits[i];
    }
    for(let i = 0;i<loadGame.currentMilitaryUnits.length;i++){
      sum2 += loadGame.currentMilitaryUnits[i];
    }
    if(sum1 ===0 || sum2===0){
      if(sum1 === 0){
        loadGame.winner=2;
      }
      else{
        loadGame.winner = 1;
      }
      loadGame.inFight = false;
      loadGame.foundFight = false;
      return;
    }
    var odds1 = [];
    var odds2 = [];
    for(let i = 0;i<loadGame.enemyMilitaryUnits.length;i++){
      odds1.push(loadGame.enemyMilitaryUnits[i]/sum1);
    }
    for(let i = 0;i<loadGame.currentMilitaryUnits.length;i++){
      odds2.push(loadGame.currentMilitaryUnits[i]/sum2);
    }
    const m1 = Math.random();
    const m2 = Math.random();
    var fighter1 = 0;
    var fighter2 = 0;
    var s1 = odds1[0];
    var s2 = odds2[0];
    for(let i = 0;i<odds1.length;i++){
      if(m1 < s1){
        fighter1 = i;
        break;
      }
      s1+=odds1[i+1];
    }
    for(let i = 0;i<odds2.length;i++){
      if(m2 < s2){
        fighter2 = i;
        break;
      }
      s2+=odds2[i+1];
    }
    var enemyStrength = loadGame.enemyMilitaryValues[fighter1].pop();
    var yourStrength = loadGame.currentMilitaryValues[fighter2].pop();
    loadGame.currentMilitaryPower -= yourStrength;
    loadGame.totalMilitaryPower -= yourStrength;
    var odd1 = enemyStrength/(enemyStrength+yourStrength);
    var odd2 = yourStrength/(enemyStrength+yourStrength);
    var winner = Math.random();
    var lost = 0;
    
    if (winner<odd1){
      lost = Math.random()*odd1 + 0.01;
      enemyStrength *= lost;
      loadGame.currentMilitaryUnits[fighter2] -= 1
      loadGame.enemyMilitaryValues[fighter1].push(enemyStrength)
      loadGame.militaryUnusedHousing += military[fighter2].housing;
    }
    else{
      lost = Math.random()*odd2 + 0.01;
      console.log("asdasdasd", yourStrength);
      yourStrength *= lost;
      loadGame.enemyMilitaryUnits[fighter1] -= 1
      loadGame.currentMilitaryValues[fighter2].push(yourStrength)
      loadGame.currentMilitaryPower += yourStrength;
      loadGame.totalMilitaryPower += yourStrength;
      console.log(lost, yourStrength);
    }
    saveVar();
    return;
  }
  return(
    <>
      <Header/>
      <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
        Gold:<span> </span>
        <span id = "money"> {loadGame.money.toFixed(2)}</span>
        <br/>
        Population:<span> </span>
        <span id = "population"> {loadGame.population}</span>
        <span> (</span>
        <span id = "unusedPopulation">{loadGame.unusedPopulation}</span>
        <span>)</span>
        <br/>
        Land:<span> </span>
        <span id = "land">{loadGame.land}</span>
        <span> (</span>
        <span id = "unusedLand">{loadGame.unusedLand}</span>
        <span>)</span>
      </h2>
      <div style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}> 
        <button className = "buySeed" onClick ={()=>buyLand()}>Land</button>
        <br/>
        Price:<span> </span>
        <span id = "landPrice" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>{loadGame.landPrice.toFixed(2)}</span>
        g
      </div>
      
      <br/>
      <div id = "mainDiv">
        <div id = "columnA" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Agriculture</b> <span> </span>
          <button className = "increment" onClick = {()=>incrementFarmLand(-1)}>-</button> <span> </span>
          <span id = "farmLand">{loadGame.unusedFarmLand}/{loadGame.farmLand}</span> <span> </span>
          <button className = "increment" onClick = {()=>incrementFarmLand(1)}>+</button> <span> </span>
          <hr/>
          
          <div id = "farmDiv">
            <div id = "seedDiv"></div>
            <div id = "cropDiv"></div>
            <div id = "farmerDiv"></div>
            <div id = "traderDiv"></div>
          </div>
          
          <br/>
          <b>Livestock</b> <span> </span>
          <button className = "increment" onClick = {()=>incrementLivestockLand(-1)}>-</button> <span> </span>
          <span id = "livestockLand">{loadGame.unusedLivestockLand}/{loadGame.livestockLand}</span> <span> </span>
          <button className = "increment" onClick = {()=>incrementLivestockLand(1)}>+</button> <span> </span>
          <hr/>
          <div id = "livestockDiv">
            
            <div id = "animalsDiv"></div>
            <canvas id = "livestockConfigDiv"></canvas>
            <div id = "herdersDiv"></div>
            <div id = "livestockTraderDiv"></div>
          </div>

          <br/>
          <b>Resources</b> <span> </span>
          <button className = "increment" onClick = {()=>incrementMiningLand(-1)}>-</button> <span> </span>
          <span id = "miningLand">{loadGame.unusedMiningLand}/{loadGame.miningLand}</span> <span> </span>
          <button className = "increment" onClick = {()=>incrementMiningLand(1)}>+</button> <span> </span>
          <hr/>
          <div id = "miningDiv">
            <div id = "materialsDiv"></div>
          </div>

        </div>
        <div id = "columnB" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Food</b>
          <hr/>
          <div id = "foodDiv">
            
          </div>
          <div id = "techDiv">
            <b>Technology</b>
            <hr/>
            <div id = "scienceScore"></div>
            <div id = "scienceDiv"></div>
          </div>
          <div id = "projectDiv">
            <b>Projects</b>
            <hr/>
            <div id = "pDiv">
            </div>
            
          </div>
        </div>
        <div id = "columnC" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Buildings</b>
          <hr/>
          <div id = "builderDiv"></div>
          <div id = "buildingDiv"></div>
          <b>Military</b>
          <hr/>
          <div id = "militaryDiv">
            
            Total Power:<span> </span>
            <span id = "totalMilitaryPower">{loadGame.currentMilitaryPower}/{loadGame.totalMilitaryPower}</span>
            <br/>
            Housing:<span> </span>
            <span id = "militaryHousing"></span>
            <div id = "militaryUnitsDiv"> </div>
          </div>

        </div>
        <div id = "columnD" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>War</b>
          <hr/>
          <div id = "warDiv"></div>
        </div>
      </div>
    </>
  )
  
}

export default App;