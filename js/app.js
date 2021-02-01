console.log("Sanity Check!")

let pokemonRequestUrl = "https://pokeapi.co/api/v2/pokemon/"
let moveRequestUrl = ""
form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let pokemon = document.querySelector("#pokemonInput").value
    console.log(pokemonRequestUrl+pokemon)
    // make the fetch request with the input
    fetch(pokemonRequestUrl + pokemon)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {
            console.log("this is the data", jsonData)
        })
        .catch((error) => {
            console.error("ERROR: ", error)
        })
    
    let move = document.querySelector("#moveInput").value
    console.log(move)
})