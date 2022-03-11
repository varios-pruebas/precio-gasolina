import fetch from 'node-fetch'
import { readFile, writeFile } from './fileUtils.js'

const FUEL_STATION_ID = process.env.FUEL_STATION_ID
const FUEL_STATION_ID_2 = process.env.FUEL_STATION_ID_2
const GEOPORTAL_URL = `https://geoportalgasolineras.es/rest/${FUEL_STATION_ID}/busquedaEstacionPrecio`
const GEOPORTAL_URL_2 = `https://geoportalgasolineras.es/rest/${FUEL_STATION_ID_2}/busquedaEstacionPrecio`

const date = new Intl.DateTimeFormat('es-ES', { month: 'numeric', day: 'numeric' }).format(Date.now())

const download = (type, url) => {
    fetch(url, {headers: { 'Accept': ' application/json' }})
    .then(res => res.json())
    .then((stationData) => {
        let dataSaved = readFile()

        if(dataSaved.dates.at(-1) === date){
          const numElments = dataSaved.dates.length - 1
          dataSaved[type][numElments] = stationData.precioGasolina95E5
        } else {
          dataSaved.dates.push(date)
          dataSaved[type].push(stationData.precioGasolina95E5)
        }

        writeFile(dataSaved)

        console.log(`Guardado con fecha ${date}: gasolina: ${stationData.precioGasolina95E5} y gasoil: ${stationData.precioGasoleoA}`)

    })
      .catch(err => {
        console.error(err)
      })
}

download('luna', GEOPORTAL_URL)
download('institutos', GEOPORTAL_URL_2)
