const { fetchPeople } = require("./service");

Array.prototype.myReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let item of this) {
        valorFinal = callback(valorFinal,item, this)
    }
    return valorFinal
}

async function main() {
    try {
        const {results} = await fetchPeople('a')
        const pesos = results.map (person => parseInt(person.height))
        console.log('pesos',pesos)
        // const pesoTotal = pesos.reduce( (valorAntigo, valorAtual) => {
        //     return valorAntigo + valorAtual
        // })
        const pesoTotal = pesos.myReduce((valorAntigo, valorAtual) => {
            return valorAntigo + valorAtual
        }, 0)

        console.log('pesoTotal', pesoTotal)
    } catch (error) {
        console.log(error)
    }
}
main()