import fetch from "node-fetch"
let handler = async (m, { conn }) => {

  let data = await (await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')).json()
  let cita = data[Math.floor(Math.random() * data.length)]
  
  let cowi = await(await fetch(cita.cowo)).buffer()
  await conn.sendFile(m.chat, cowi, '', 'تطقيم ل ولد 👦 『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』', m)
  let ciwi = await(await fetch(cita.cewe)).buffer()
  await conn.sendFile(m.chat, ciwi, '', 'تطقيم ل بنت 👧 『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』', m)
}
handler.help = ['ppcouple', 'ppcp']
handler.tags = ['internet']
handler.command = ['طقم','تطقيم'] 
export default handler