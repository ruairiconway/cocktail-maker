'use strict';

// DISPLAY HANDLERS
// ======================= DRINK STRUCTURE
function displayDrink(drink) {
    // Calls display functions for each section
    console.log(drink);
    $('.drink-container').removeClass('hidden');
    displayDrinkName(drink);
    displayDrinkMeasure(drink);
    displayDrinkIngredient(drink);
    displayDrinkInstructions(drink);
}

// API FETCH FUNCTIONS
// ======================= RANDOM
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
    });
}

$(userChoice);