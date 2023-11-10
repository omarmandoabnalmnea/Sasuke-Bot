import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'حذف') {
    delete conn.chess[key];
    return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *تم حذف اللعبه*', m);
  }

  if (feature === 'انشاء') {
    if (gameData) {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *اللعبه قائمه بالفعل*', m);
    }
    chessData.gameData = { status: 'waiting', black: null, white: null };
    return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *تم إنشاء الغرفة*\nفي انتظار اللاعبين .انضم.', m);
  }

  if (feature === 'انضم') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *انت لقد قمت بالانضمام*', m);
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *لا يوجد لعبه شطرنج في انتظار اللاعبين حالياً*', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』*اكتمل عدد اللاعبين بالفعل.*\n جار بدء اللعبة', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'ready';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸*اللاعبين الذين انضمو:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*الاسود:* @${black.split('@')[0]}\n*الابيض:* @${white.split('@')[0]}\n\nبرجاء استخدام *'شطرنج ابدا'* لبدا اللعبه.`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』*انت لقد انضممت للعبه الشطرنج.*\nفي انتظار اللاعب الاخر', m);
    }
  }

  if (feature === 'ابدا') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸*العد لم يكتمل بعد*', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `『 𝗥𝗜𝗡 』دور: *الابيض* @${gameData.white.split('@')[0]}`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const flipParam2 = senderId === gameData.black ? '' : '-flip';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] });
      }
      return;
    } else {
      return conn.reply(m.chat, '𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸*انت لقد انضممت الي اللعبه*\nفي انتظار اللاعب الاخر لانضمام للعبه', m);
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』*اللعبه لم تبدا*', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, `『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』*دور* ${chessData.currentTurn === gameData.white ? 'الابيض' : 'الاسود'}'هو الي يتحرك*`, m, {
        contextInfo: {
          mentionedJid: [currentTurn]
        }
      });
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸*🤴كش ملك*\n*اللعبه انتهت.*\n*الفائز 🎉:* @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
    if (chess.isDraw()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』 *تعادل*\n*اللعبه انتهت*\n*الاعبين:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
        contextInfo: {
          mentionedJid: hasJoined
        }
      });
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '『 𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 』*الحركه غير ممكنة*', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const currentColor = chessData.currentTurn === gameData.white ? 'الابيض' : 'الاسود';
    const turn = `𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸 *دور:* ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId === gameData.black ? '' : '&flip=true';
    const flipParam2 = senderId === gameData.black ? '' : '-flip';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [chessData.currentTurn] });
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [chessData.currentTurn] });
    }
    chess.deleteComment();
    return;
  }

  if (feature === 'مساعده') {
    return conn.reply(m.chat, `*
    شرح اوامر *لعبه شطرنج♚*:

.شطرنج انشاء *لعمل غرفه للعبه*

.شطرنج انضم *لانضمام للغرفه*

شطرنج بدأ *لبدا غرفة بعد انضمام لاعبين*

.شطرنج حذف *لحذف غرفه*
    `, m);
  }
  return conn.reply(m.chat, '『𝐬𝐚𝐬𝐮𝐤𝐞 𝐛𝐨𝐭 🩸』“ استخدام خاطئ. استعمل*"شطرنج مساعده"* لمعرفة الاوامى شغالة.', m);
};

handler.help = ['chess [from to]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^شطرنج|لعبة-شطرنج$/i

export default handler