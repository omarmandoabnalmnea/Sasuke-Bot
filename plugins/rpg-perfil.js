import { createHash } from 'crypto'
import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
let user = global.db.data.users[who]
let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp 
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')

// • @${who.replace(/@.+/, '')}
let str = `إنَّ اللهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيَّ *يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا*
. *💌 الاسم:* ${username}${about ? '\n\n 🎌 *الوصف:* ' + about : ''}

*✨ لفلك او مستواك* : ${level}

*⬆️ اكسبي* : مجموع الاكسبي ${exp} (${user.exp - min} / ${xp})\n${math <= 0 ? `Ready for *${usedPrefix}levelup*` : `*${math}اكسبي* تحتاج هذا الحد من نقاط الاكسبي`}

*💛 تصنيفك:* ${role}

*💎 الماسك:* ${user.diamond}

*🔮 مسجل :* ${registered ? 'نعم': 'لا'}

*👑 شخص مميز* : ${prem ? 'نعم' : 'لا'}

*_رمز التحقق✔️_* ${sn}

『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』
`
    conn.sendFile(m.chat, pp, 'profil.jpg', str, m, false, { mentions: [who] })

}
handler.help = ['profile']
handler.tags = ['group']
handler.command = ['البروفايل'] 

export default handler