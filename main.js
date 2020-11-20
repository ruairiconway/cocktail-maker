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

// ------ create
function getCreateDrink(createOptions) {
    // pull random drink name from array
    let options = createOptions.drinks;
    let i = Math.floor(Math.random() * options.length);
    getDrinkByName(options[i].strDrink);
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
    <div id="drink-glass" class="js-drink-glass">
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
        <h3>${name}</h3>`;
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

function generateDrinkGlassString(drink) {
    let glassType = drink.drinks[0].strGlass;
    let glassString = `
        <p>${glassType}</p>`;
    return glassString
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
    <div class="browse-header js-browse-header">
        <p>Ingredients List</p>
    </div>
    <div class="browse-list js-browse-list">
    </div>
    <div class="back-button js-back-button">
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
    `<form id="js-create-form" autocomplete="off">
        <label for="ingredient-field" class="create-form-label">What are you working with?</label>
        <input type="text" class="js-create-form-field" id="js-create-form-field" name="ingredient-field" required>
        <input type="submit" class="js-create-form-submit" value="go">
    </form>
    <div>
        <p>enter multiple ingredients seperated by a ","</p>
    </div>
    <div id="error-message"></div>`;
    return createString
}

function generateCreateErrorString() {
    // error string for when no drinks are found
    let errorString = `
    <p>No drink was found with these ingredients, try again!</p>`;
    return errorString
}

function generateBrowseFilterHeader() {
    let headerString = `
    <h3>Ingredients List</h3>`;
    return headerString
}

function generateBrowseDrinksHeader(filterChoice) {
    let headerString = `
    <h3>${filterChoice}</h3>`;
    return headerString
}

function generateBackButtonString() {
    let backButtonString = `
    <div>
        <input type=button value="back" id="back-button">
    </div>`;
    return backButtonString
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
    console.log(drinkData);
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

function displayDrinkGlass(drink) {
    let glassString = generateDrinkGlassString(drink);
    $('.js-drink-glass').html(glassString)
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
    let filterHeader = generateBrowseFilterHeader();
    $('.js-browse-list').html(filterString);
    $('.js-browse-header').html(filterHeader);
}

function displayFilterDrinkList(drinkList, filterChoice) {
    // Display drinks filtered by chosen ingredient
    let drinkListString =  generateDrinkListString(drinkList);
    let drinkListHeader = generateBrowseDrinksHeader(filterChoice);
    let backButton = generateBackButtonString();
    $('.js-browse-list').html(drinkListString);
    $('.js-browse-header').html(drinkListHeader);
    $('.js-back-button').html(backButton);
    watchFilterDrinkChoice();
}

// ------ create
function buildCreateHTML() {
    // Create base HTML structure after resetDisplay()
    let createHTML = generateCreateHTMLString();
    $('.create-container').html(createHTML);
    $('#js-create-form-field').focus();
    watchCreateForm();
}

function displayCreateError() {
    // display error message when no drinks are found
    console.log('connected');
    let createError = generateCreateErrorString();
    $('#error-message').html(createError);
}


// ==============================  FETCH APIs  ==================================
const cocktailProxy = `https://damp-brushlands-32925.herokuapp.com/cocktail`;
// ------ drinks
function getRandomDrink() {
    // get random drink from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${cocktailProxy}/random.php`, requestOptions)
        .then(response => response.json())
        .then(responseJson => displayDrink(responseJson))
        .catch(error => console.log('error', error));
    
}

function getDrinkByName(name) {
    // get drink by name from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${cocktailProxy}/search.php?s=${name}`, requestOptions)
        .then(response => response.json())
        .then(responseJson => displayDrink(responseJson))
        .catch(error => console.log('error', error));
}

// ------ browse
function getBrowseFilters() {
    // get ingredient filters from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`, requestOptions)
    //fetch(`${cocktailProxy}/list.php?i=list`, requestOptions) <-- returns longer list of ingredients but some do not provide drink options when getFilterDrinkList() is called
        .then(response => response.json())
        .then(responseJson => displayBrowse(responseJson))
        .catch(error => console.log('error', error));
}

function getFilterDrinkList(filterChoice) {
    // get drinks by ingredient filter from theCockatillDB.com
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${cocktailProxy}/filter.php?i=${filterChoice}`, requestOptions)
        .then(response => response.json())
        .then(responseJson => displayFilterDrinkList(responseJson, filterChoice))
        .catch(error => console.log('error', error));
}

// ------ create
function getCreateDrinkOptions(ingredients) {
    // get drinks by multiple ingredient filters from theCockatillDB.com
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=dfc5bf3d33e7c71b03778d3a76ab84efc1605125130");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${cocktailProxy}/filter.php?i=${ingredients}`, requestOptions)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.drinks === 'None Found') {
                displayCreateError();
                console.log('no drink found');
            } else {
                getCreateDrink(responseJson);
            }
        })
        .catch(error => {
            if (error = 'SyntaxError') {
                displayCreateError();
                console.log('no drink found');
            } else {
                console.log('error', error);
            }
        });
}

// ----- image
const unsplashProxy = `https://damp-brushlands-32925.herokuapp.com/unsplash`;
function getDrinkImageUrl(drink) {
    let drinkName = drink.drinks[0].strDrink;
    let drinkQuery = drinkName.replaceAll(' ','+');

    console.log(drinkQuery);

    var myHeaders = new Headers();
    myHeaders.append("Accept-Version", "v1");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${unsplashProxy}&query=${drinkQuery}&page=1&per_page=1&content_filter=low&color=black_and_white`, requestOptions)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch(error => console.log('error', error));
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
    resetDisplay();
    buildDrinkHTML();
    displayDrinkName(drink);
    displayDrinkComponents(drink);
    displayDrinkGlass(drink);
    displayDrinkInstructions(drink);
    getDrinkImageUrl(drink);
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

function watchFilterDrinkChoice() {
    // browse drinks
    $('.js-drink-button').on('click', function(){
        console.log('getting selected drink');
        let drinkChoice = $(this).val();
        getDrinkByName(drinkChoice);
    });
    $('.js-back-button').on('click', function(){
        console.log('setting up browse');
        getBrowseFilters();
    });
}

// ------ create
function watchCreateForm() {
    $('#js-create-form').submit(event => {
        event.preventDefault();
        $('#error-message').empty();
        let ingredientsInput = $('.js-create-form-field').val();
        let ingredients = ingredientsInput.replaceAll(', ',',');
        console.log(`getting random drink using ${ingredients}`);
        getCreateDrinkOptions(ingredients);
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
$(displayCreate);