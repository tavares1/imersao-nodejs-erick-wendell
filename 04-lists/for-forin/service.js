const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function fetchPeople(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data.results.map(mapPerson)
}

function mapPerson(person) {
    return {
        name: person.name,
        height: person.height
    }
}

module.exports = {
    fetchPeople: fetchPeople
}