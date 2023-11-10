import Presence from '@adiwajshing/baileys'
let handler  = async (m, { conn, args, text }) => {
if (!text) throw `*[❌] برجاء ادخال النص بجانب الامر:*\n\n*مثال*\n\n*↲ . تغير-الاسم رين*`
try {
let text = args.join` `
if(!args || !args[0]) {
} else {
conn.groupUpdateSubject(m.chat, text)}
} catch (e) {
throw '*[❌] برجاء ادخال النص بجانب الامر:*\n\n*مثال*\n\n*↲ . تغير-الاسم رين *'
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(تغير-الاسم|تغيرالاسم)$/i
handler.group = true
handler.admin = true
export default handler