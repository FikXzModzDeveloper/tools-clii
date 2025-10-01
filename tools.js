/*
ᴊᴀɴɢᴀɴ ʜᴀᴘᴜs ᴄʀᴇᴅɪᴛ ɪɴɪ ᴅᴇᴍɪ ʜᴀʀɢᴀɪ ɢᴡ ʟᴀʜ..
ᴍʏ ᴄᴏɴᴛᴀᴄᴛ
ᴄʜ : https://whatsapp.com/channel/0029Vb6Jjyf8KMqtrGJZJy0y
ᴛᴇʟᴇ : t.me/FikXzModzz

ɪsɪ ᴀᴊᴀ ʏɴɢ ᴅɪ ʙᴀᴡᴀʜ
ʀᴇᴄᴏᴅᴇ ʙʏ : ɴᴀᴍᴀ ʟᴜ

ʜᴀᴘᴜs ᴄʀᴇᴅɪᴛ ʏᴛɪᴍ ᴡᴇ ᴘᴏᴋᴏɴᴀ ᴍᴀ ᴀᴘᴀʟɪ ᴀᴍᴘᴇ ᴊᴜᴀʟ ᴘᴅʜʟ ғʀᴇᴇ😂😂
*/

const { openBo } = require('./lib/openChannel');
const { LihatJawa } = require('./lib/banner');
const TampilMenuGengsi = require('./modules/menu');

// meluncurkan muwani
console.clear();
openBo();
LihatJawa();
TampilMenuGengsi().catch(console.error);
