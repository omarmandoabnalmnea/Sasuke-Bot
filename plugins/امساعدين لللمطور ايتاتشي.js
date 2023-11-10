const dir = [
'https://telegra.ph/file/c11816fd33aef210a485e.jpg',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp','╭━━━[ *مساعدين المطور* ]━━━━⬣
'لا يوجد احد يساعد ايتاتشي🥹💔'
'╰━━━〔 *🛡️ 1.4.9* 〕━━━━━⬣', m)
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['مساعدين', 'المساعدين'] 

export default handler