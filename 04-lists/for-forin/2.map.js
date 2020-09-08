const service = require('./service')

Array.prototype.meuMap = function (callback) {

    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length - 1; indice++ ) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado

}

async function main() {
    try {
        const results = await service.fetchPeople('a')
        const names = results.results.meuMap((person, indice) => { 
            return `${indice} ‣ ${person.name}`
        })
        console.log('names',names)
    } catch (error) {
        console.log('error:', error)    
    }
}

main()