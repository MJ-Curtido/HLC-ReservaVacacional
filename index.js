const yargs = require('yargs')
const reservas = require('./reservas.js')

yargs.version('1.1.0')

//Añadir reserva
yargs.command({
    command: 'addReserva',
    describe: 'Añade una reserva',
    builder: {
        nombre: {
            describe: 'Nombre usuario',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        reservas.addReserva(argv.nombre)
    }
})

//Eliminar reserva
yargs.command({
    command: 'borraReserva',
    describe: 'Elimina una reserva',
    builder: {
        nombre: {
            describe: 'Nombre usuario',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        reservas.borraReserva(argv.nombre)
    }
})

//Listar reservas
yargs.command({
    command: 'listaReserva',
    describe: 'Lista de reservas',
    handler() {
        reservas.listaReserva()
    }
})

yargs.parse()