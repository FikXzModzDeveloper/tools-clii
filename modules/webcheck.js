const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function checkWebsite() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL website:',
            validate: input => input.startsWith('http') ? true : 'URL harus diawali dengan http/https!'
        }
    ]);

    const spinner = ora('Memeriksa website...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/webcheck?url=${encodeURIComponent(answers.url)}`);
        const data = response.data;
        
        spinner.succeed('Pemeriksaan website selesai!');
        
        if (data.status) {
            const result = data.result;
            let content = '';
            content += `URL: ${chalk.yellow(answers.url)}\n`;
            content += `Status Code: ${chalk.yellow(result.httpStatusCode)}\n`;
            content += `Indexable: ${result.isIndexable ? chalk.green('Ya') : chalk.red('Tidak')}\n`;
            content += `OPQ Score: ${chalk.cyan(result.opq)}\n`;
            content += `Meta Title: ${chalk.yellow(result.metaTitle)}\n`;
            content += `Meta Description: ${chalk.yellow(result.metaDescription)}\n`;
            content += `Bahasa: ${chalk.yellow(result.language)}\n`;
            content += `Jumlah Kata: ${chalk.cyan(result.countWords)}\n`;
            content += `Ukuran File: ${chalk.cyan(result.fileSize + ' bytes')}\n`;
            content += `Mobile Optimized: ${result.mobile_stats.mobile_optimized ? chalk.green('Ya') : chalk.red('Tidak')}`;
            
            printBox('HASIL WEB CHECK', content);
            
        } else {
            console.log(chalk.red('Gagal memeriksa website!'));
        }
    } catch (error) {
        spinner.fail('Error memeriksa website!');
        console.log(chalk.red('Terjadi kesalahan:', error.message));
    }
}

module.exports = checkWebsite;