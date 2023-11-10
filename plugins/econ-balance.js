
let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ 
المستخدم مفقود من قاعدة البيانات الخاصة بي`
    conn.reply(m.chat, `
┌───⊷ *التوازن* ⊶
▢ *📌الاسم* : _@${who.split('@')[0]}_
▢ *عدد الماسك 💎* : _${user.diamond}_
▢ *اكسبي* : _المجموع ${user.exp}_
└──────────────

*ملحوظه :* 
يمكنك شراء 💎 الماس باستخدام الطلبات
❏ *${usedPrefix}شراء-الجواهر*
❏ *${usedPrefix}شراء-جواهر*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['شراء-الماس', 'الماسي', 'diamond', 'الماس'] 

export default handler
