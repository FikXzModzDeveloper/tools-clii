const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function tiktokToCatbox() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL TikTok:',
            validate: input => input.includes('tiktok.com') ? true : 'URL harus dari TikTok!'
        }
    ]);

    const spinner = ora('Mengkonversi TikTok ke Catbox...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/tttocatbox?url=${encodeURIComponent(answers.url)}`);
        const data = response.data;
        
        if (data.status && data.result) {
            spinner.succeed('Berhasil mengkonversi!');
            let content = '';
            content += `Video: ${chalk.cyan(data.result.video)}\n`;
            content += `Audio: ${chalk.cyan(data.result.audio)}`;
            
            printBox('HASIL KONVERSI', content);
        } else {
            spinner.fail('Tidak ada hasil!');
            console.log(chalk.red('Video TikTok tidak ditemukan atau tidak dapat dikonversi.'));
        }
    } catch (error) {
        spinner.fail('Error mengkonversi TikTok!');
        console.log(chalk.red('Terjadi kesalahan:', error.message));
    }
}

module.exports = tiktokToCatbox;