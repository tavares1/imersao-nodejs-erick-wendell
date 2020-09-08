const service = require('./service')

async function main() {
    try {

        console.time('get-people')
        
        const result = await service.fetchPeople('a')
        result.results.forEach( person => console.log(person.name))

        console.timeEnd('get-people')
        
    } catch(error) {
        console.log('error', error)
    }
}

main()