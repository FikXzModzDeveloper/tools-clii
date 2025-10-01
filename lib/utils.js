const chalk = require('chalk');

function printBox(title, content) {
    const lines = content.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length), title.length);
    const boxWidth = maxLength + 4;
    
    console.log(chalk.cyan('╔' + '═'.repeat(boxWidth) + '╗'));
    console.log(chalk.cyan('║') + chalk.yellow(` ${title}${' '.repeat(boxWidth - title.length - 1)}`) + chalk.cyan('║'));
    console.log(chalk.cyan('╠' + '═'.repeat(boxWidth) + '╣'));
    
    lines.forEach(line => {
        console.log(chalk.cyan('║') + ` ${line}${' '.repeat(boxWidth - line.length - 3)}` + chalk.cyan('║'));
    });
    
    console.log(chalk.cyan('╚' + '═'.repeat(boxWidth) + '╝'));
}

module.exports = { printBox };