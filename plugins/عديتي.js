let handler = async (m, { conn, isPrems}) => {
let hasil = Math.floor(Math.random() * 1000)
let time = global.db.data.users[m.sender].lastmiming + 600000
if (new Date - global.db.data.users[m.sender].lastmiming < 600000) throw `*[❗تحذير❗] استني ${msToTime(time - new Date())} للجمع مرة اخرى*`  
m.reply(`*[ 🎉 ] لقد حصلت على ${hasil} 𝚇𝙿*`)
global.db.data.users[m.sender].lastmiming = new Date * 1
  
}
handler.help = ['minar']
handler.tags = ['xp']
handler.command = ['العديه','عديه', 'عديتي'] 
handler.fail = null
handler.exp = 0
export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s " 
}