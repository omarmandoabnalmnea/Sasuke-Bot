//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let poin = 300
    let reseqv = `✳️ حدد حجره/ورقه/مقص\n\nمثال : *${usedPrefix + command}* ورقه\n`
    if (!text) throw reseqv
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'حجره'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'مقص'
    } else {
        astro = 'ورقه'
    }

    if (text == astro) {
      global.db.data.users[m.sender].exp += 100
        m.reply(`▢ *تعادل*\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\n🎁 نقاط (±)100 XP`)
    } else if (text == 'حجره') {
        if (astro == 'مقص') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *فاز* 🎊\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\n🎁 نقاط *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *خاسر*\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\n نقاط *-${poin} XP*`)
        }
    } else if (text == 'مقص') {
        if (astro == 'ورقه') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *فاز* 🎊\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\n🎁 نقاط *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *خاسر*\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\nنقاط *-${poin} XP*`)
        }
    } else if (text == 'ورقه') {
        if (astro == 'حجره') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *فاز* 🎊\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\n🎁 نقاط *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *لقد خسرت*\n\n‣ أنت : ${text}\n‣ ساسكي : ${astro}\n\nنقاط *-${poin} XP*`)
        }
    } else {
        throw reseqv
    }
}
handler.help = ['ppt <حجره/ورقه/مقص>']
handler.tags = ['game']
handler.command = ['لعبه'] 
handler.register = false

export default handler