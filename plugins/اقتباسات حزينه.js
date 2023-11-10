const dir = [
'https://telegra.ph/file/d145be338f61292cfa20b.jpg',
'https://telegra.ph/file/055810a5bc81850a6937f.jpg',
'https://telegra.ph/file/f6635db58e8becb63e808.jpg',
'https://telegra.ph/file/c9ef3d560512d56f09a54.jpg',
'https://telegra.ph/file/a33f7f8714e0bf906c3b3.jpg',
'https://telegra.ph/file/670dc212dc9ca391bde05.jpg',
'https://telegra.ph/file/5cff770eff6530d3d2111.jpg',
'https://telegra.ph/file/be0d6f0d61084382815b9.jpg',
'https://telegra.ph/file/386e658eba13860c787d2.jpg',
'https://telegra.ph/file/677d51167d7ad614e03db.jpg',
'https://telegra.ph/file/fceee21359d35d9ab0e30.jpg',
'https://telegra.ph/file/a33f7f8714e0bf906c3b3.jpg',
'https://telegra.ph/file/bb6357fdaa00fb401e8e0.jpg',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['حكم', 'حكمة'] 

export default handler