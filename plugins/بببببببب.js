/* Generar error */
const handler = async (m, {conn, command}) => {
  console.log(XDDDDDDDDD);
  new Error('ها هو الخطاء يا سيدي ايتاتشي');
};
handler.command = /^(اين-الخطاء)$/i;
handler.owner = true;
export default handler; 
