const chalk = require('chalk');

function LihatJawa() {
    console.log(chalk.cyan('╔══════════════════════════╗'));
    console.log(chalk.cyan('║') + chalk.yellow('   𝗠𝗨𝗟𝗧𝗜 𝗧𝗢𝗢𝗟𝗦 - 𝗩𝟭.𝟬.𝟬   ') + chalk.cyan('║'));
    console.log(chalk.cyan('║') + chalk.white('   ᴘᴏᴡᴇʀᴇᴅ ʙʏ ғɪᴋxᴢᴍᴏᴅs   ') + chalk.cyan('║'));
    console.log(chalk.cyan('╚══════════════════════════╝'));
    console.log('');
}

module.exports = { LihatJawa };