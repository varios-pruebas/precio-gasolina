import TelegramBot from 'node-telegram-bot-api'
import { readFile } from './fileUtils.js'
import { generateChart } from './generateChart.js'

const TOKEN_TELEGRAM = process.env.TOKEN_TELEGRAM
const bot = new TelegramBot(TOKEN_TELEGRAM)
const GASOLINA_CHAT_ID = process.env.GASOLINA_CHAT_ID;
const DIESEL_CHAT_ID = process.env.DIESEL_CHAT_ID;

const priceChanged = false

const sendToTelegram = async ({price, priceOld, type, chatId}) => {
  if(price !== priceOld){
    const diff = Math.round((price - priceOld) * 1000 ) / 1000
    const msg = `*${date}/${new Date().getFullYear()}*: El precio ${type} es ${price}€, ha _${diff > 0 ? 'subido' : 'bajado'}_ *${Math.abs(diff)}€*`
    console.log(msg)
    await bot.sendMessage(chatId, msg, {parse_mode : 'Markdown'});
    priceChanged = true
  }
}

const dataSaved = readFile()
const date = dataSaved.dates.at(-1)

sendToTelegram({
  price: dataSaved.gasolina.at(-1),
  priceOld: dataSaved.gasolina.at(-2),
  type: 'de la gasolina',
  chatId: GASOLINA_CHAT_ID,
  date,
}).catch(() => console.log('Error al enviar el precio de la gasolina'))

sendToTelegram({
  price: dataSaved.diesel.at(-1),
  priceOld: dataSaved.diesel.at(-2),
  type: 'del diesel',
  chatId: DIESEL_CHAT_ID,
  date,
}).catch(() => console.log('Error al enviar el precio del gasoil'))
  
if(priceChanged)     
  bot.sendPhoto(chatId, generateChart(dataSaved, ['luna', 'intitutos']))
