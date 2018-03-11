const { Composer, log } = require('micro-bot')

const bot = new Composer()

bot.use(log())
bot.start(({ reply }) => reply('Hey there!'))
bot.hears(/https:\/\//, ({ reply, message }) => reply(message.text))

module.exports = bot
