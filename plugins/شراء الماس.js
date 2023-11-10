const xpperdiamond = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^شراء-الجواهر/i, '')
  count = count ? /ر/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperdiamond) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperdiamond * count) {
    global.db.data.users[m.sender].exp -= xpperdiamond * count
    global.db.data.users[m.sender].diamond += count
    conn.reply(m.chat, `
*❍───┆💎 شراء الماس 💎┆───❍*
*↤ الـمـبلـغ المحول💌* : + ${count}💎*
*↤ *السيد 🐦🤙🏻* : -${xpperdiamond * count} اكسبي*`, m)
  } else conn.reply(m.chat, `*❌رصيدك ليس به اكسبي ل شراء الألماس ${count}\n\n*بفكرك انك ممكن تجيب اكسبي و الماس من (راتب|يومي|الرياضيات|سؤال انمي|دين|اكس او)*`, m)
}
handler.help = ['todiamond', 'todiamondall']
handler.tags = ['econ']
handler.command = ['شراء-الجواهر'] 

handler.disabled = false

export default handler