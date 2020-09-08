/*
0 - Obter um usuário
1 - Obter o número de telefone do usuário a partir do seu ID
2 - Obter o endereço do usuário pelo ID.
*/

function getUser(callback) {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve({ 
            id: 1,
            name: "Lucas",
            birthyDate: new Date()
        }), 2000)
    })
}

function getFone(idUser) {
    return new Promise( (resolve, reject) => {
        setTimeout(
            resolve({
                telefone: '999775921',
                ddd:'85'
            })
        , 2000)
    })
}

function getAddress(idUser) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve({
            rua:"dos bobos",
            numero: 0
        }), 2000)
    })
}

function solveUser(err, user) {
    console.log('usuario', user)
}

async function main() {
    try {
        console.time('medida-promise')
        const usuario = await getUser()
        const resultado = await Promise.all([
            getFone(usuario.id),
            getAddress(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.name},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua} - ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.log('error:',error)
    }
}

main()