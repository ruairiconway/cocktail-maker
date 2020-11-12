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
    let instruction = drink.drinks[0].strInstructions;
    let instructionString = `
        <p>${instruction}</p>`;
    return instructionString
}


// DISPLAY CONTENT FUNCTIONS

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

function displayDrink(drink) {
    // Calls display functions for each section
    console.log(drink);
    displayDrinkName(drink);
    displayDrinkMeasure(drink);
    displayDrinkIngredient(drink);
    displayDrinkInstructions(drink);
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
        console.log('create');
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
        console.log('browse');
    });
}

$(userChoice);