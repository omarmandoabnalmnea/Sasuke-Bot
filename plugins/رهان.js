/* CREDITOS A https://github.com/FG98F */

const handler = async (m, {args, usedPrefix, command}) => {
  const fa = `
*[❗] ملاحظة يجب ادخال مقدر الرهان💵* 

*مثال 👾*
   
*${usedPrefix + command} 100 XP*`.trim();
  if (!args[0]) throw fa;
  if (isNaN(args[0])) throw fa;
  const apuesta = parseInt(args[0]);
  const users = global.db.data.users[m.sender];
  const time = users.lastslot + 10000;
  if (new Date - users.lastslot < 10000) throw `*⏳ يجب الانتظار ${msToTime(time - new Date())} من وقت لاستمرار في لعب*`;
  if (apuesta < 100) throw '*ملاحظة اقل عدد للمراهنة هو 100 XP 💵*';
  if (users.exp < apuesta) {
    throw `*ملاحظة انت لا تملك هذا مقدر من اكس بي قم بمحاولة مرة اخري💥*`;
  }
  const emojis = ['🐋', '🐉', '🕊️'];
  let a = Math.floor(Math.random() * emojis.length);
  let b = Math.floor(Math.random() * emojis.length);
  let c = Math.floor(Math.random() * emojis.length);
  const x = [];
  const y = [];
  const z = [];
  for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
  }
  for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
  }
  for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
  }
  let end;
  if (a == b && b == c) {
    end = `*تهانينا! 🎁 +${apuesta + apuesta} 𝚇𝙿*`;
    users.exp += apuesta;
  } else if (a == b || a == c || b == c) {
    end = `*تهانينا لقد فزت في الرهان 🥳🎉*\n*فزت +10 XP*`;
    users.exp += 10;
  } else {
    end = `*❌ 𝙿𝙴𝚁𝙳𝙸𝚂𝚃𝙴 -${apuesta} 𝚇𝙿*`;
    users.exp -= apuesta;
  }
  users.lastslot = new Date * 1;
  return await m.reply(
      `
🎰 | الرهان | 🎰
────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────
🎰 | ${end}`);
};
handler.help = ['slot <apuesta>'];
handler.tags = ['game'];
handler.command = ['رهان'];
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return minutes + ' m ' + seconds + ' s ';
}

    