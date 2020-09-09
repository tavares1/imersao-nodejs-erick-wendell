const { 
    deepEqual,
    ok
} = require ('assert')

const DEFAULT_ITEM_CADASTRAR = { 
    name: 'Flash',
    poder: 'Speed',
    id: '1'
}

const DEFAULT_ITEM_ATUALIZAR = {
    name: 'Mulher Maravilha',
    poder: 'Deusa',
    id: '2'
}

const database = require('./database')

describe('Suite de manipulação de Herois.', () => {

    before(async () => {
        await database.register(DEFAULT_ITEM_CADASTRAR)
        await database.register(DEFAULT_ITEM_ATUALIZAR)
    })

    after(async () => {
        await database.writeDataInFile([])
    })

    it('deve lista um héroi, usando arquivos', async () => {
        // Esperando
        const expected = DEFAULT_ITEM_CADASTRAR
        // Processamento
        const [resultado] = await database.listar(expected.id)
        // Saída
        deepEqual(resultado, expected)
    })

    it ('deve cadastrar um héroi, usando arquivos', async () => {
        // Esperado
        const expected = DEFAULT_ITEM_CADASTRAR
        // Processamento
        const resultadoBooleano  = await database.register(DEFAULT_ITEM_CADASTRAR)

        const [resultado] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        // Saída
        ok(resultadoBooleano)
        deepEqual(resultado, expected)
    })

    it('deve remover um héroi por id', async () => {
        const expected = true;
        const resultado = await database.remove(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve alterar o héroi pelo id', async () => {
        const expected = { 
            ...DEFAULT_ITEM_ATUALIZAR,
            name: 'batman',
            poder: 'money'
        }
        const newData = { 
            name: 'batman',
            poder: 'money'
        }
        await database.update(DEFAULT_ITEM_ATUALIZAR.id, newData)
        const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(result,expected)
    })

})