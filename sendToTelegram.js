import TelegramBot from 'node-telegram-bot-api'
import { readFile } from './fileUtils.js'
import { generateChart } from './generateChart.js'

const TOKEN_TELEGRAM = process.env.TOKEN_TELEGRAM
const bot = new TelegramBot(TOKEN_TELEGRAM)
const GASOLINA_CHAT_ID = process.env.GASOLINA_CHAT_ID
const FUEL_STATIONS = ['luna', 'institutos']

const sendToTelegram = async ({price, priceOld, type, chatId}) => {
  if(price !== priceOld){
    const diff = Math.round((price - priceOld) * 1000 ) / 1000
    const msg = `*${date}/${new Date().getFullYear()}*: El precio ${type} es ${price}€, ha _${diff > 0 ? 'subido' : 'bajado'}_ *${Math.abs(diff)}€*`
    console.log(msg)
    await bot.sendMessage(chatId, msg, {parse_mode : 'Markdown'});
    bot.sendPhoto(GASOLINA_CHAT_ID, generateChart(dataSaved, FUEL_STATIONS))
  }
}

const dataSaved = readFile()
const date = dataSaved.dates.at(-1)

FUEL_STATIONS.forEach(type => {
  sendToTelegram({
    price: dataSaved[type].at(-1),
    priceOld: dataSaved[type].at(-2),
    type: `'de ${type}'`,
    chatId: GASOLINA_CHAT_ID,
    date,
  }).catch(() => console.log(`'Error al enviar el precio de ${type}'`))

})
  
  
