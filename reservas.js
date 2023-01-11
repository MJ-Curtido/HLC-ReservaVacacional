const fs = require('fs')
const chalk = require('chalk')
const request = require('request')
const url = 'http://api.weatherstack.com/current?access_key=de2d50a87c6d53ad45cef9679c49f16e&query=Jerez'

const addReserva = (nombre) => {
    const reservas = leerReservas()
    const reservaDuplicada = reservas.find((reserva) => reserva.nombre === nombre)

    if (!reservaDuplicada) {
        let data;

        request({ url: url }, (error, response) => {
            data = JSON.parse(response.body)
            console.log("PRUEBA   " + data.current.temperature + data.current.humidity)

            reservas.push({
                nombre: nombre,
                fechaIni: new Date(),
                temperatura: data.current.temperature,
                humedad: data.current.humidity
            })
            escribirReservas(reservas)
            console.log("Reserva añadida correctamente")
        })
    } else {
        console.log("La reserva ya existe en nuestra base de datos")
    }
}

const borraReserva = (nombre) => {
    const reservas = leerReservas()
    const reservasRestantes = reservas.filter((reserva) => reserva.nombre !== nombre)

    if (reservas.length > reservasRestantes.length) {
        console.log("Reserva eliminada correctamente")
        escribirReservas(reservasRestantes)
    } else {
        console.log("No se ha encontrado la reserva")
    }    
}

const listaReserva = () => {
    const reservas = leerReservas()

    console.log("Reservas")

    reservas.forEach((reserva) => {
        console.log(reserva.nombre + ", " + reserva.fechaIni + ", " + reserva.temperatura + ", " + reserva.humedad)
    })
}

const escribirReservas = (reservas) => {
    const dataJSON = JSON.stringify(reservas)
    fs.writeFileSync('reservas.json', dataJSON)
}

const leerReservas = () => {
    try {
        const dataBuffer = fs.readFileSync('reservas.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addReserva: addReserva,
    borraReserva: borraReserva,
    listaReserva: listaReserva
}