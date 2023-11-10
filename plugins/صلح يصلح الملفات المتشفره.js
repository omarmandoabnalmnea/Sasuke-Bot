/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: '*[❗] استخدم هذا الأمر مباشرة في الرقم الرئيسي للبوت.*'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: '*[❗] بدء عملية حذف جميع ملفات الجلسة باستثناء ملف creds.json...*'}, {quoted: m});
  const sessionPath = './MOHAMEDITACHI kun/';
  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, {text: '*[❗] مجلد MysticSession غير موجود أو أنه فارغ.*'}, {quoted: m});
    }
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '*[❗] لم يتم العثور على ملف لحذفه في مجلد MysticSession.*'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `*[❗]  ${filesDeleted} تمت إزالة ملفات الجلسة باستثناء ملف creds.json.*`}, {quoted: m});
    }
  } catch (err) {
    console.error('خطأ في قراءة مجلد الجلسة أو الملفات:', err);
    await conn.sendMessage(m.chat, {text: '*[❗] حدث خطأ أثناء حذف ملفات الجلسة.*'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `*👋مرحبا! الآن تراني؟*\n\n*[❗] إذا لم يستجب الروبوت لأوامرك، فيرجى إرسال القليل من البريد العشوائي*\n\n*—◉ مثال:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`}, {quoted: m});
};
handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|dsowner|نظف)$/i;
handler.rowner = false
export default handler;