//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('*تم تغير الوداع بنجاح ✅*')
  } else throw `*[❌] برجاء ادخال النص بجانب الامر:*

*إن أردت أن يمنشن قم بكتابة @user*

*مثال*

*↲ .تغير-الوداع اهلا بك في مجموعتنا*`
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['تغير-الوداع'] 
handler.admin = true

export default handler
