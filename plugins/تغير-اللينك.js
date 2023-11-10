let handler = async (m, { conn }) => {
  let res = await conn.groupRevokeInvite(m.chat)
  m.reply('*تم تغير اللينك بنجاح ✅*')
}
handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'تغير-اللينك'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler