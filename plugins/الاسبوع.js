import yts from 'yt-search'
import fs from  'fs'
let handler = async (m, {conn, text }) => {
  if (!text) throw ' اكتب يوتيوبي و يبحث عن مقطعك يا حب \n مثلا :\n *.يوتيوبي*   MOHAMED ITACHI KUN'
  await conn.reply(m.chat, global.wait, m)
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case  'video' : return `
° *_${v.title}_*
↳ 🫐 *_الرابط :_* ${v.url}
↳ 🕒 *_الوقت :_* ${v.timestamp}
↳ 📥 *_من :_* ${v.ago}
↳ 👁 *_مشاهده :_* ${v.views}`}}).filter(v => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n' )
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg' , teks, m)
}
handler.help = [ 'ytsearch *<texto>*' ] 
handler.tags = [ 'search']
handler.command = [ 'يوتيوبي' ,  'yts' ] 
export default handler