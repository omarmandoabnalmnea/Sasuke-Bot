import * as baileys from '@adiwajshing/baileys'

let handler = async (m, { conn, text }) => {
	let [, code] = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || []
	if (!code) throw '*رابط الجروب يا حب 🫶🏻❤️*'
	let res = await conn.query({ tag: 'iq', attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' }, content: [{ tag: 'invite', attrs: { code } }] }),
		data = extractGroupMetadata(res),
		txt = Object.keys(data).map(v => `*${v.capitalize()}:* ${data[v]}`).join('\n'),
		pp = await conn.profilePictureUrl(data.id, 'image').catch(console.error)
		let groupinfo = `
*╭━━━[ *معلومات الكشف* ]━━━━⬣
┃ *☂️ ⫹⫺ ID عنوان ال:* ${data.id}◞
┃🧪 ⫹⫺ الاسم:* ${data.subject}
┃📅 ⫹⫺ تاريخ الإنشاء:* ${data.creation}
┃👑 ⫹⫺ المالك:* ${data.owner}
╰━━━〔 *🛡️ 1.4.9* 〕━━━━━⬣*
`
	await conn.reply(m.chat, groupinfo, m)
	const botones = [
{index: 1, urlButton: {displayText: `انسخ الوصف🍓`, url: `https://www.whatsapp.com/otp/copy/${data.desc}`}},
]
await conn.sendMessage(m.chat, { text: `*┏━━━━━━━━━━━━━━┓*\n┃¿انسخ لك الوصف? •🌷\n*┗━━━━━━━━━━━━━━┛*`, templateButtons: botones, footer: wm })
}
handler.command = /^(اكشف)$/i

export default handler
handler.owner = false

const extractGroupMetadata = (result) => {
	const group = baileys.getBinaryNodeChild(result, 'group')
	const descChild = baileys.getBinaryNodeChild(group, 'description')
	let desc
	if (descChild) desc = baileys.getBinaryNodeChild(descChild, 'body')?.content
	const metadata = {
		id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
		subject: group.attrs.subject,
		creation: new Date(+group.attrs.creation * 1000).toLocaleString('id', { timeZone: 'America/Los_Angeles' }),
		owner: group.attrs.creator ? 'wa.me/' + baileys.jidNormalizedUser(group.attrs.creator).split('@')[0] : undefined,
		desc
	}
	return metadata
}