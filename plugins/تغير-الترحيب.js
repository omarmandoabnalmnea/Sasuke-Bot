let handler = async (m, { conn, text, isROwner, isOwner }) => {
if (text) {
global.db.data.chats[m.chat].sWelcome = text
m.reply('*تم تغير الترحيب بنجاح ✅*')
} else throw `*[❌] برجاء ادخال النص بجانب الامر:*

*إن أردت أن يمنشن قم بكتابة @user*

*مثال*

*↲ .تغير-الترحيب اهلا بك في مجموعتنا*`
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['تغير-الترحيب'] 
handler.admin = true
export default handler