'use strict';


// ==============================  JSON/OBJECT/ARRAY MANIPULATION  ==================================
// ------ drink
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
    // simplify newArray so it only includes key values
    newArray = Object.values(newArray);
    return newArray
}

// ------ browse
function createBrowseFilterArray(filters) {
    // simplify array so it only includes key values
    let filterObject = filters.drinks;
    let newArray = [];
    for (let i = 0; i < filterObject.length; i++) {
        let item = Object.values(filterObject[i]);
        newArray.push(`${item}`);
    }
    //sort array alphabetically
    newArray.sort();
    return newArray
}


// ==============================  GENERATE STRING FUNCTIONS  ==================================
// ------ drink
function generateDrinkHTMLString() {
    // base drink html
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

function generateDrinkComponentString(ingredientList) {
    // Create string for drink ingredients list
    let ingredientString = ''
    for (let i = 0; i < ingredientList.length; i++) {
        let addIngredient = `
            <li>${ingredientList[i]}</li>`;
        ingredientString += addIngredient;
    }
    return ingredientString
}

function generateDrinkInstructionString(drink) {
    // Create string for drink instructions list
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

// ------ browse
function generateBrowseHTMLString() {
    // base browse html
    let structureString = `
    <div class="js-browse-list">
    </div>`;
    return structureString
}

function generateBrowseFilterString(filterArray) {
    // Browse ingredient filter string
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
    // Browse drink list string
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

// ------ create
function generateCreateHTMLString() {
    // base create html
    let createString = 
    `<form id="js-create-form">
        <label for="ingredient-field" class="create-form-label">What are you working with?</label>
        <input type="text" class="js-create-form-field" name="ingredient-field" required>
        <input type="submit" class="js-create-form-submit" value="create">
    </form>`;
    return createString
}


// ==============================  DISPLAY FUNCTIONS  ==================================
// ------ drink
function buildDrinkHTML() {
    // Create base HTML structure after resetDisplay()
    let drinkHTML = generateDrinkHTMLString();
    $('.drink-container').html(drinkHTML);
}

function displayDrinkName(drink) {
    // Display drink name
    let nameString = generateDrinkNameString(drink);
    $('.js-drink-name').html(nameString);
}

function displayDrinkComponents(drink) {
    let drinkData = drink.drinks[0];
    // Display drink measure list
    let measureTargetKey = 'strMeasure';
    let measureList = createDrinkComponentArray(drinkData, measureTargetKey);
    let measureString = generateDrinkComponentString(measureList);
    $('.js-drink-measure').html(measureString);
    // Display drink ingredients list
    let ingredientTargetKey = 'strIngredient';
    let ingredientList = createDrinkComponentArray(drinkData, ingredientTargetKey);
    let ingredientString = generateDrinkComponentString(ingredientList);
    $('.js-drink-ingredient').html(ingredientString);
}

function displayDrinkInstructions(drink) {
    // Display drink instructions
    let instructionString = generateDrinkInstructionString(drink);
    $('.js-drink-instructions').html(instructionString);
}

// ------ browse
function buildBrowseHTML() {
    // Create base HTML structure after resetDisplay()
    let browseHTML = generateBrowseHTMLString();
    $('.browse-container').html(browseHTML);
}

function displayBrowseFilters(filters) {
    // Display ingredient filters
    let filterArray = createBrowseFilterArray(filters);
    let filterString = generateBrowseFilterString(filterArray);
    $('.js-browse-list').html(filterString);
}

function displayFilterByIngredientList(drinkList) {
    // Display drinks filtered by chosen ingredient
    let drinkListString =  generateDrinkListString(drinkList);
    $('.js-browse-list').html(drinkListString);
    watchFilterByIngredientChoice();
}

// ------ create
function buildCreateHTML() {
    // Create base HTML structure after resetDisplay()
    let createHTML = generateCreateHTMLString();
    $('.create-container').html(createHTML);
    watchCreateForm();
}


// ==============================  FETCH APIs  ==================================
// ------ drinks
function getRandomDrink() {
    // get random drink from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", myApiKey);
    myHeaders.append("Cookie", myCookie);

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
    // get drink by name from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", myApiKey);
    myHeaders.append("Cookie", myCookie);

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

// ------ browse
function getBrowseFilters() {
    // get ingredient filters from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", myApiKey);
    myHeaders.append("Cookie", myCookie);

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

function getFilterDrinkList(filterChoice) {
    // get drinks by ingredient filter from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", myApiKey);
    myHeaders.append("Cookie", myCookie);

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

function getCreateDrinkOptions(ingredientsArray) {

}


// ==============================  DISPLAY HANDLERS  ==================================
// ------ reset
function resetDisplay() {
    $('.drink-container').empty();
    $('.browse-container').empty();
    $('.create-container').empty();
}

// ------ drink
function displayDrink(drink) {
    console.log(drink);
    resetDisplay();
    buildDrinkHTML();
    displayDrinkName(drink);
    displayDrinkComponents(drink);
    displayDrinkInstructions(drink);
}

// ------ browse
function displayBrowse(filters) {
    console.log(filters);
    resetDisplay();
    buildBrowseHTML();
    displayBrowseFilters(filters);
    watchFilterChoice();
}

// ------ create
function displayCreate() {
    resetDisplay();
    buildCreateHTML();
}


// ==============================  WATCH INPUT/FORM  ================================== 
// ------ browse
function watchFilterChoice() {
    // browse ingredients
    $('.js-filter-button').on('click', function(){
        console.log('getting drinks by ingredient filter');
        let filterChoice = $(this).val();
        getFilterDrinkList(filterChoice);
    });
}

function watchFilterByIngredientChoice() {
    // browse drinks
    $('.js-drink-button').on('click', function(){
        console.log('getting selected drink');
        let drinkChoice = $(this).val();
        getDrinkByName(drinkChoice);
    });
}

// ------ create
function watchCreateForm() {
    $('#js-create-form').submit(event => {
        event.preventDefault();
        let ingredients = $('.js-create-form-field').val();
        let ingredientsArray = ingredients.replaceAll(' ','').split(',');
        console.log(`getting random drink using ${ingredientsArray}`);
        getCreateDrinkOptions(ingredientsArray);
    });
}

// ------ nav
function userChoice() {
    // hit create
    $('#js-btn-create-drink').on('click', function(){
        console.log('setting up create');
        displayCreate();
    });
    // hit random
    $('#js-btn-random-drink').on('click', function(){
        console.log('getting random drink');
        getRandomDrink();
    });
    // hit browse
    $('#js-btn-browse-drink').on('click', function(){
        console.log('setting up browse');
        getBrowseFilters();
    });
}

$(userChoice);