console.log("Sanity Check!")

let pokemonRequestUrl = "https://pokeapi.co/api/v2/pokemon/"
let moveTypeRequestUrl = "https://pokeapi.co/api/v2/type/"
let pokemonObject = {}
let moveTypeObject = {}

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let pokemon = document.querySelector("#pokemonInput")
    console.log(pokemonRequestUrl+pokemon.value)
    // make the fetch request with the input
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
})

function moveIntersect () {
    for (pokemonMoveItem in pokemonObject.moves) {
        let pokemonMove = pokemonObject.moves[pokemonMoveItem].move.name
        for (typeMoveItem in moveTypeObject.moves) {
            let typeMove = moveTypeObject.moves[typeMoveItem].name
            if (pokemonMove === typeMove) {
                console.log(typeMove)
            }
        }
    }
}