import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*[❗] Ingresa un texto para buscar, ejemplo: ${usedPrefix + command} TheMystic-Bot-MD*`;
  const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
    q: text,
  }));
  const json = await res.json();
  if (res.status !== 200) throw json;
  //const imagen = await conn.getFile(json.items[0].owner.avatar_url).data
  const str = json.items.map((repo, index) => {
  return `
*${1 + index}. ${repo.full_name}${repo.fork ? ' (fork)' : ''}*
🔗 *رابط البوت:* ${repo.html_url}
📅 *تاريخ انشاوه:* ${formatDate(repo.created_at)}
🔄 *اخر تعديل:* ${formatDate(repo.updated_at)}
📥 *رابط:* $ git clone ${repo.clone_url}
رآه ${repo.watchers} ◉ المشاهدون ${repo.forks} ◉ الفورك ${repo.stargazers_count} ◉ الحساب
${repo.description ? `📝 *وصف البوت:*\n${repo.description}` : ''}
`.trim()}).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
  conn.sendMessage(m.chat, {text: str.trim()}, {quoted: m})
//conn.sendMessage(m.chat, {text: str.trim(), contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [m.sender], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen, "mediaUrl": `https://www.atom.bio/theshadowbrokers-team`, "sourceUrl": `https://www.atom.bio/theshadowbrokers-team`}}}, {quoted: m});  
};
handler.help = ['githubs'];
handler.tags = ['buscadores'];
handler.command = /^(ghs|githubs|جيتهوب|githubsearch|جيت-هب|gitsearch)$/i;
export default handler;

function formatDate(n, locale = 'es') {
  const d = new Date(n);
  return d.toLocaleDateString(locale, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
}