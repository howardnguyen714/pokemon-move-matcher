console.log("Sanity Check!")

let pokemonRequestUrl = "https://pokeapi.co/api/v2/pokemon/"
let moveTypeRequestUrl = "https://pokeapi.co/api/v2/type/"
let moveRequestUrl = "https://pokeapi.co/api/v2/move/"
let pokemonObject = {}
let moveTypeObject = {}
let moveObject = {}
let intersectArray = []
let tbody = document.querySelector("#tbody")
let imageContainer = document.querySelector("#pokemonImageContainer")
let image = document.createElement("img")
image.setAttribute("id", "pokemonImage")
let pokemonName = document.querySelector("#pokemonName")

function moveIntersect () {
// Isolates moves found in both pokemonObject and in moveTypeObject and adds them to intersectArray
    // resets the array
    intersectArray = []
    // if the user selects "all" as the type. Pushes all the Pokemon's moves to the array
    if (document.querySelector("#moveInput").value == 0) {
        for (pokemonMoveItem in pokemonObject.moves) {
            intersectArray.push(pokemonObject.moves[pokemonMoveItem].move.name)
        }
    }
    // if the user selects anything else as the type. Finds moves that are included in both moveTypeObject and pokemonObject and adds them to intersectArray
    else {
        for (pokemonMoveItem in pokemonObject.moves) {
            let pokemonMove = pokemonObject.moves[pokemonMoveItem].move.name
            for (typeMoveItem in moveTypeObject.moves) {
                let typeMove = moveTypeObject.moves[typeMoveItem].name
                if (pokemonMove === typeMove) {
                    intersectArray.push(typeMove)
                }
            }
        }
    }

    console.log("moveIntersect has completed")
    console.log("intersectArray:", intersectArray)
}

function matchMoves () {
// Fetches API objects for the selected pokemon and move type
    // make fetch request for pokemon
    let pokemon = document.querySelector("#pokemonInput")
    console.log(pokemonRequestUrl+pokemon.value.toLowerCase())
    
    fetch(pokemonRequestUrl + pokemon.value.toLowerCase())
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {
            console.log("this is the pokemon data", jsonData)
            pokemonObject = jsonData
        })
        .catch((error) => {
            console.error("ERROR: ", error)
        })
    
    
    // make fetch request for move type if the user does not select "all" as the type
    let moveType = document.querySelector("#moveInput")
    console.log(moveTypeRequestUrl+moveType.value)
    if (moveType.value != 0) {
        fetch(moveTypeRequestUrl+moveType.value)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                console.log("this is the move type data", jsonData)
                moveTypeObject = jsonData
            })
            .catch((error) => {
                console.error("ERROR: ", error)
            })
    }
    console.log("matchMoves has been called")
}

function makeRow () {
    setPokemonImageAndName()
    // Creates a table row that includes details about a move
    for (move in intersectArray) {
        let tr = document.createElement("tr")
        tbody.append(tr)
        let tdName = document.createElement("td")
        tr.appendChild(tdName)
        tdName.textContent = titleCase(intersectArray[move].split("-").join(" "))
        
        fetch(moveRequestUrl + intersectArray[move])
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                moveObject = jsonData
                console.log("this is the move data", moveObject)
                return moveObject
            })
            .then((moveObject) => {
                // Create coloumn with corresponding power
                let tdPower = document.createElement("td")
                tr.append(tdPower)
                tdPower.textContent = moveObject.power
                
                let tdAccuracy = document.createElement("td")
                tr.append(tdAccuracy)
                tdAccuracy.textContent = moveObject.accuracy

                let tdCategory = document.createElement("td")
                tr.append(tdCategory)
                tdCategory.textContent = titleCase(moveObject.damage_class.name)
            })
            .catch((error) => {
                console.error("ERROR: ", error)
            })    
    }
    console.log("makeRow has been called")
}

// The following function was provided by freeCodeCamp and can be found at the following link:
// https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function setPokemonImageAndName() {
    image.src = pokemonObject.sprites.other["official-artwork"].front_default
    imageContainer.append(image)
    pokemonName.textContent = titleCase(pokemonObject.name)
    pokemonName.style.visibility = "visible"
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    document.querySelector("#table").style.visibility = "visible"

    image.src = ""

    pokemonName.textContent = ""

    if(tbody.childElementCount > 0) {
        tbody.innerHTML = ""
    }

    matchMoves()

    setTimeout(moveIntersect,500)

    setTimeout(makeRow, 750)

})