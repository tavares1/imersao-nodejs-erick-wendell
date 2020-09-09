const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor(){
        this.NOME_ARQUIVO = 'heroes.json'
    }

    async fetchDataFromFile() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async writeDataInFile(data) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
        return true
    }

   async listar (id) {
        const dados = await this.fetchDataFromFile()
        if (!id) 
            return dados
        const dadosFiltados = dados.filter(item => item.id === id)
        return dadosFiltados
    }

    async register(hero) {
        const data = await this.fetchDataFromFile()
        const id = hero.id <= 2 ? hero.id : Date.now()
        
        const heroWithId = { 
            id,
            ...hero
        }

        const dataModified = [
            ...data,
            heroWithId
        ]

        const result = await this.writeDataInFile(dataModified)
        return result
    }

    async remove(id) {
        if (!id) {
            await this.writeDataInFile([])
            return true
        }
        const data = await this.fetchDataFromFile(this.NOME_ARQUIVO)
        const index = data.findIndex( item => { 
            return item.id == parseInt(id)
        })
        if (index === -1)
            throw Error('Usuário não existe')
        data.splice(index, 1)
        return await this.writeDataInFile(data)
    }

    async update(id, modifications) {
        const data = await this.fetchDataFromFile()
        const index = data.findIndex(item => item.id == parseInt(id))
        if (index === -1)
            throw Error('o herói informado não existe')
        const actual = data[index]
        const updatedData = {...actual, ...modifications}
        data.splice(index, 1)

        return await this.writeDataInFile([...data, updatedData])
    }
}

module.exports = new Database()