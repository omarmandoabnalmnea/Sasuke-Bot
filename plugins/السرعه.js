import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
var handler = async (m) => {
	await conn.reply(m.chat, "...انتظر قليلاً", m)
    let o
    try {
        o = await exec('python3 speed.py --share')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['SASUKE']
handler.tags = ['SASUKE']
handler.command = /^(السرعة|السرعه)$/i

export default handler