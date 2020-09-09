const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do héroi')
        .option('-p, --poder [value]', 'Poder do héroi')
        .option('-i,--id [value]','ID do Herói')
        
        .option('-c, --create', 'Cadastrar um héroi')
        .option('-l, --list','Listar hérois salvos')
        .option('-d, --delete','Remover héroi pelo id')
        .option('-u, --update [value]',"Atualiza informações um héroi")

        .parse(process.argv)
    const hero = new Hero(Commander)
    try {
        
        if (Commander.create) {
            const resultado = await Database.register(hero)
            if (!resultado) {
                console.log('Héroi não cadastrado')
                return
            }
            console.log('Herói cadastrado com sucesso')
        }

        if (Commander.list) {
            const resultado = await Database.listar()
            console.log('Heros:', resultado)
        }

        if (Commander.delete) {
            const resultado = await Database.remove(hero.id)
            if(!resultado) {
                console.log('Não foi possível remover o héroi')
            }
            console.log('Herói removido com sucesso')
        }

        if (Commander.update) {
            const idToUpdate = parseInt(Commander.update)
            // transformar em string
            const data = JSON.stringify(hero)
            // transformar em json novamente, assim ele pega as chaves que são undefined | null e remove do objeto.
            const heroToUpdate = JSON.parse(data)
            const resultado = await Database.update(idToUpdate, heroToUpdate)
            if (!resultado) {
                console.log('Herói não foi atualizado')
            }
            console.log('Herói foi atualizado com sucesso')

        }
         
    } catch (error) {
        console.log('Error: ', error)
    }
}

main()