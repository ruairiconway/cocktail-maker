'use strict';



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

function createBrowseFilterArray(filters) {
    let filterObject = filters.drinks;
    let newArray = [];
    for (let i = 0; i < filterObject.length; i++) {
        let item = Object.values(filterObject[i]);
        newArray.push(`${item}`);
    }
    newArray.sort();
    return newArray
}


// GENERATE STRING FUNCTIONS

function generateDrinkHTMLString() {
    let structureString = `
    <div id="drink-name" class="js-drink-name">   
        </div>
        <div id="drink-details">
            <ul class="drink-details-format js-drink-measure"></ul>
            <ul class="drink-details-format js-drink-ingredient"></ul>
        </div>
        <div id="drink-instructions">
            <ol class="js-drink-instructions"></ol>  
        </div>`;
    return structureString;
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
    for (let i = 0; i < instruction.length - 1; i++) { //(-1 prevents empty additional <li>)
        let item = `
            <li>${instruction[i]}</li>`;
        instructionString += item;
    }
    return instructionString
}


function generateBrowseHTMLString() {
    let structureString = `
    <div class="js-browse-list">
    </div>`;
    return structureString
}

function generateBrowseFilterString(filterArray) {
    let filterString = '';
    for (let i = 0; i < filterArray.length; i++) {
        let item = `
        <div class="browse-item">
            <input type="button" class="filter-button js-filter-button" value="${filterArray[i]}">
        </div>`;
        filterString += item;
    }
    filterString = filterString.toLowerCase();
    return filterString;
}

function generateDrinkListString(drinkList) {
    console.log(drinkList);
    let drinkListString = ``;
    for (let i = 0; i < drinkList.drinks.length; i++) {
        let item =`
        <div class="browse-item">
            <input type="button" class="drink-button js-drink-button" value="${drinkList.drinks[i].strDrink}">
        </div>`
        drinkListString += item;
    }
    drinkListString = drinkListString.toLowerCase();
    return drinkListString;
}


// DISPLAY FUNCTIONS
// ======================= DRINK DISPLAY

function createDrinkHTML() {
    let drinkHTML = generateDrinkHTMLString();
    $('.drink-container').html(drinkHTML);
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


function createBrowseHTML() {
    let browseHTML = generateBrowseHTMLString();
    $('.browse-container').html(browseHTML);
}

function displayBrowseFilters(filters) {
    let filterArray = createBrowseFilterArray(filters);
    let filterString = generateBrowseFilterString(filterArray);
    $('.js-browse-list').html(filterString);
}

function displayFilterByIngredientList(drinkList) {
    let drinkListString =  generateDrinkListString(drinkList);
    $('.js-browse-list').html(drinkListString);
    watchFilterByIngredientChoice();
}


// DISPLAY HANDLERS
// ======================= DRINK STRUCTURE
function resetDisplay() {
    $('.drink-container').empty();
    $('.browse-container').empty();
}

function displayDrink(drink) {
    // Calls display functions for each section
    console.log(drink);
    resetDisplay();
    createDrinkHTML();
    displayDrinkName(drink);
    displayDrinkMeasure(drink);
    displayDrinkIngredient(drink);
    displayDrinkInstructions(drink);
}

function displayBrowse(filters) {
    console.log(filters);
    resetDisplay();
    createBrowseHTML();
    displayBrowseFilters(filters);
    watchFilterChoice();
}


// API FETCH FUNCTIONS
// ======================= RECIPE
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

function getDrinkByName(name) {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`, requestOptions)
        .then(response => response.json())
        .then(responseJson => displayDrink(responseJson))
        .catch(error => console.log('error', error));
}

function getBrowseFilters() {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list", requestOptions)
        .then(response => response.json())
        .then(responseJson => displayBrowse(responseJson))
        .catch(error => console.log('error', error));
}


function getFilterByIngredientList(filterChoice) {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filterChoice}`, requestOptions)
        .then(response => response.json())
        .then(responseJson => displayFilterByIngredientList(responseJson))
        .catch(error => console.log('error', error));
}


// HANDLE USER INPUT FUNCTIONS

function watchFilterChoice() {
    $('.js-filter-button').on('click', function(){
        let filterChoice = $(this).val();
        getFilterByIngredientList(filterChoice);
    });
}

function watchFilterByIngredientChoice() {
    $('.js-drink-button').on('click', function(){
        let drinkChoice = $(this).val();
        getDrinkByName(drinkChoice);
    });
}

function userChoice() {
    // hit create
    $('#js-btn-create-drink').on('click', function(){
        console.log('creating a drink');
    });
    // hit random
    $('#js-btn-random-drink').on('click', function(){
        console.log('getting random drink');
        getRandomDrink();
    });
    // hit browse
    $('#js-btn-browse-drink').on('click', function(){
        console.log('Setting up browse');
        getBrowseFilters();
    });
}

$(userChoice);