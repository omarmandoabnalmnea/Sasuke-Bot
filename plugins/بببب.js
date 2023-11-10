import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';
const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  if (!text) throw `*[❗] سيتم عرض كل ملفات (البوليجون) القديمه و الحديثه*\n\n*—◉ الامر*\n*◉ ${usedPrefix + command}* ملفات البوليجون\n\n*—◉ اليك ملفات (البلوجون) هاهي:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`;
  if (!ar1.includes(text)) return m.reply(`*[❗] 𝙽𝙾 𝚂𝙴 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙾 𝙽𝙸𝙽𝙶𝚄𝙽 𝙿𝙻𝚄𝙶𝙸𝙽 (𝙰𝚁𝙲𝙷𝙸𝚅𝙾) 𝙻𝙻𝙰𝙼𝙰𝙳𝙾 "${text}", 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙰𝙻𝙶𝚄𝙽𝙾 𝙴𝚇𝙸𝚂𝚃𝙴𝙽𝚃𝙴*\n\n*==================================*\n\n*—◉ ملفات التي بداخل البوت كلها هي (جاري التحميل) تم التجهيز:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`);
  let o;
  try {
    o = await exec('cat plugins/' + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const {stdout, stderr} = o;
    if (stdout.trim()) {
      const aa = await conn.sendMessage(m.chat, {text: stdout}, {quoted: m});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa});
    }
    if (stderr.trim()) {
      const aa2 = await conn.sendMessage(m.chat, {text: stderr}, {quoted: m});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa2});
    }
  }
};
handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(بوليجون|gp)$/i;
handler.rowner = true;
export default handler;
