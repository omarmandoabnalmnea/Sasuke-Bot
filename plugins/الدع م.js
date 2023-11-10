let handler = async (m, { conn, command, text }) => {
let love = `
*اليك دعم بوت ايتاتشي*
*دخول جروب المطور ايتاتشي 🩸*
*https://chat.whatsapp.com/D1jV6CtduH7JMkWeyVoqou* 
*هنا يتم دعم البوتات و حل جميع مشاكلها 🐦🤙🏻*
*رقم المطور ايتاتشي*201114329294  
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['estupidez']
handler.tags = ['fun']
handler.command = /^(الدعم|دعم)$/i
export default handler