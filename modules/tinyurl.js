const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function tinyURLShortener() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL yang akan dipendekkan:',
            validate: input => input.startsWith('http') ? true : 'URL harus diawali dengan http/https!'
        }
    ]);

    const spinner = ora('Memendekkan URL...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/tinyurl?url=${encodeURIComponent(answers.url)}`);
        const data = response.data;
        
        if (data.status) {
            spinner.succeed('URL berhasil dipendekkan!');
            let content = '';
            content += `URL Asli: ${chalk.yellow(answers.url)}\n`;
            content += `URL Pendek: ${chalk.cyan(data.result)}`;
            
            printBox('HASIL SHORTEN URL', content);
        } else {
            spinner.fail('Gagal memendekkan URL!');
            console.log(chalk.red('Terjadi kesalahan saat memendekkan URL.'));
        }
    } catch (error) {
        spinner.fail('Error memendekkan URL!');
        console.log(chalk.red('Terjadi kesalahan:', error.message));
    }
}

module.exports = tinyURLShortener;