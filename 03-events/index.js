// const EventEmitter = require('events')

// class MeuEmissor extends EventEmitter {

// }

// const meuEmissor = new MeuEmissor()
// const nomeEvento = 'usuario:click'

// meuEmissor.on(nomeEvento,(click) => {
//     console.log('clique aconteceu', click)
// })

// meuEmissor.emit(nomeEvento, 'clicou na barra de rolagem')

// count = 0
// setInterval(() => {
//     count+=1
//     meuEmissor.emit(nomeEvento, `clicou no ok ${count} vezes`)
// }, 1000)


function main() {
    return new Promise( (resolve, reject) => {
        const stdin = process.openStdin()
        stdin.addListener('data',(value) => {
            console.log(`Voce digitou: ${value.toString().trim()}`)
            return resolve(value)
        })        
    })
}

main().then()