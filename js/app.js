console.log("Sanity Check!")

let pokemonRequestUrl = "https://pokeapi.co/api/v2/pokemon/"
let moveTypeRequestUrl = "https://pokeapi.co/api/v2/type/"
let moveRequestUrl = "https://pokeapi.co/api/v2/move/"
let pokemonObject = {}
let moveTypeObject = {}
let moveObject = {}
let intersectArray = []


function moveIntersect () {
    intersectArray = []
    for (pokemonMoveItem in pokemonObject.moves) {
        let pokemonMove = pokemonObject.moves[pokemonMoveItem].move.name
        for (typeMoveItem in moveTypeObject.moves) {
            let typeMove = moveTypeObject.moves[typeMoveItem].name
            if (pokemonMove === typeMove) {
                intersectArray.push(typeMove)
            }
        }
    }
    console.log("moveIntersect has been called")
    console.log("intersectArray:", intersectArray)
}

function matchMoves () {
    let pokemon = document.querySelector("#pokemonInput")
    console.log(pokemonRequestUrl+pokemon.value)
    
    // make fetch request for pokemon
    fetch(pokemonRequestUrl + pokemon.value)
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
    
    
    let moveType = document.querySelector("#moveInput")
    console.log(moveTypeRequestUrl+moveType.value)
    
    // make fetch request for move type
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

function makeTable () {
    console.log("makeTable has been called")
    for (move in intersectArray) {
        let tr = document.createElement("tr")
        tbody.append(tr)
        let tdName = document.createElement("td")
        tr.appendChild(tdName)
        tdName.textContent = intersectArray[move]
        
        fetch(moveRequestUrl + intersectArray[move])
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                console.log("this is the move data", jsonData)
                moveObject = jsonData
            })
            .catch((error) => {
                console.error("ERROR: ", error)
            })
    
        let tdPow = document.createElement("td")
        tr.append(tdPow)
        tdPow.innerText = moveObject.power
        
    }
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    matchMoves()

    setTimeout(moveIntersect,500)

    let tbody = document.getElementById("tbody")

    setTimeout(makeTable, 750)

})



