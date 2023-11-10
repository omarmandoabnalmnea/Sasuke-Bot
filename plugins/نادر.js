const handler = async (m, {conn, isROwner, text}) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js';
    // conn.readMessages([m.key])
    await m.reply('*[ ⚠ ] جاري فصل البوت...*\n\n*—◉ سيتم رستره البوت و قض يستغرق ذلك بضع دقائق .*');
    process.send('reset');
};
handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['رسترات', 'reiniciar'];
handler.rowner = true;
export default handler;