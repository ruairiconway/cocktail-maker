'use strict';
//console.log('linked');


// OBJECT ARRAY MANIPULATION FUNCTIONS

function createDrinkComponentArray(objectArray, targetKey) {
    // pull all key + values from objectArray with keys that include targetKey string
    let newArray = Object.keys(objectArray).filter(function(e) {
        return e.indexOf(targetKey) == 0;
        }).reduce(function(newData, e) {
        newData[e] = objectArray[e];
        return newData;
        }, {});
    // remove all null properties
    for (let propName in newArray) { 
        if (newArray[propName] === null || newArray[propName] === undefined || newArray[propName] === "") {
          delete newArray[propName];
        }
      }
    // simplify newArray so it only includes key values (not keys)
    newArray = Object.values(newArray);
    return newArray
}


// GENERATE STRING FUNCTIONS

function generateBrowseContainerString() {
    let containerString = `
    <div class="browse-container container hidden">
        <form class="js-browse-input">
        </form>
        <div class="js-browse-list">
        </div>
    </div>`;
    return containerString
}

function generateBrowseInputString() {
    let browseInputString = `
    <label for="alcohol-field">Filter by Alcohol</label>
    <input name="alcohol-field" type="text">
    <input type="submit" value="results">`;
    return browseInputString
}

function generateDrinkContainerString() {
    let containerString = `
    <div class="drink-container container hidden">
        <div id="drink-name" class="js-drink-name">   
        </div>
        <div id="drink-details">
            <ul class="drink-details-format js-drink-measure"></ul>
            <ul class="drink-details-format js-drink-ingredient"></ul>
        </div>
        <div id="drink-instructions" class="js-drink-instructions">   
        </div>
    </div>`;
    return containerString
}

function generateDrinkNameString(drink) {
    // Create string for drink name
    let name = drink.drinks[0].strDrink;
    let nameString = `
        <p>${name}</p>`;
    return nameString
}

function generateDrinkIngredientString(ingredientList) {
    let ingredientString = ''
    for (let i = 0; i < ingredientList.length; i++) {
        let addIngredient = `
            <li>${ingredientList[i]}</li>`;
        ingredientString += addIngredient;
    }
    return ingredientString
}

function generateDrinkInstructionString(drink) {
    let instructionRaw = drink.drinks[0].strInstructions;
    let instruction = instructionRaw.split('.');
    let instructionString = ``;
    for (let i = 0; i < instruction.length; i++) {
        let item = `
            <p>${instruction[i]}</p>`;
        instructionString += item;
    }
    return instructionString
}


// DISPLAY FUNCTIONS

function displayBrowseContainer() {
    let browseContainerString = generateBrowseContainerString();
    $('.app-display').html(browseContainerString);
}

function displayBrowseInput() {
    let browseInputString = generateBrowseInputString();
    $('.js-browse-input').html(browseInputString);
}

function displayDrinkContainer() {
    let drinkContainerString = generateDrinkContainerString();
    $('.app-display').html(drinkContainerString);
}

function displayDrinkName(drink) {
    // Display drink name
    let nameString = generateDrinkNameString(drink);
    $('.js-drink-name').html(nameString);
}

function displayDrinkMeasure(drink) {
    // Display drink measure
    let drinkData = drink.drinks[0];
    let targetKey = 'strMeasure';
    let measureList = createDrinkComponentArray(drinkData, targetKey);
    let measureString = generateDrinkIngredientString(measureList);
    $('.js-drink-measure').html(measureString);
}

function displayDrinkIngredient(drink) {
    // Display drink ingredient
    let drinkData = drink.drinks[0];
    let targetKey = 'strIngredient';
    let ingredientList = createDrinkComponentArray(drinkData, targetKey);
    let ingredientString = generateDrinkIngredientString(ingredientList);
    $('.js-drink-ingredient').html(ingredientString);
}

function displayDrinkInstructions(drink) {
    let instructionString = generateDrinkInstructionString(drink);
    $('.js-drink-instructions').html(instructionString);
}


// DISPLAY HANDLERS

function displayDrink(drink) {
    // Calls display functions for each section
    console.log(drink);
    $('.app-display').empty();
    displayDrinkContainer();
    displayDrinkName(drink);
    displayDrinkMeasure(drink);
    displayDrinkIngredient(drink);
    displayDrinkInstructions(drink);
}

function displayBrowse() {
    $('.app-display').empty();
    displayBrowseContainer();
    displayBrowseInput();
}


// API FETCH FUNCTIONS

function getRandomDrink() {
    //get random drink from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php", requestOptions)
        .then(response => response.json())
        .then(responseJson => displayDrink(responseJson))
        .catch(error => console.log('error', error));
    
}


// HANDLE USER INPUT FUNCTIONS

function userChoice() {

    // hit create
    $('#js-btn-create-drink').on('click', event => {
        event.preventDefault();
        console.log('creating a drink');
    });

    // hit random
    $('#js-btn-random-drink').on('click', event => {
        event.preventDefault();
        console.log('getting random drink')
        getRandomDrink();
    });

    // hit browse
    $('#js-btn-browse-drink').on('click', event => {
        event.preventDefault();
        console.log('Setting up browse');
        displayBrowse();
    });
}

$(userChoice);

/*

function getBrowseList() {
    // API fetch filters for ingredient
    // Display all recipes with that ingredient
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin", requestOptions)
        .then(response => response.json())
        .then(responseJson => displayBrowseList(responseJson))
        .catch(error => console.log('error', error));
}

*/