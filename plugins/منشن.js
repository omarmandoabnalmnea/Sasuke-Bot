let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`${text ? `${text}\n` : ''}*╭━━━[ *المنشن الجماعي* ]━━━━⬣
┃ * المنشن«❤» الجماعي *
\n` + users.map(v => '│◦❈↲ تفاعل يا حب 🫶🏻 ❤️ @' + v.replace(/@.+/, '')).join`\n` + '\n*╰━━━〔 *🛡️ 1.4.9* 〕━━━━━⬣*', null, {
        mentions: users
    })
}

handler.help = ['منشن']
handler.tags = ['group']
handler.command = ['منشن']
handler.admin = true
handler.group = true

export default handler