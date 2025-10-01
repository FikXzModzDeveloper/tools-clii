const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function spamNGL() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL NGL:',
            validate: input => input.includes('ngl.link') ? true : 'URL harus dari ngl.link!'
        },
        {
            type: 'input',
            name: 'message',
            message: 'Pesan:',
            validate: input => input.length > 0 ? true : 'Pesan tidak boleh kosong!'
        },
        {
            type: 'input',
            name: 'count',
            message: 'Jumlah spam:',
            default: '10',
            validate: input => !isNaN(input) && input > 0 ? true : 'Jumlah harus angka!'
        }
    ]);

    const spinner = ora(`Mengirim ${answers.count} pesan...`).start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/spamngl?url=${encodeURIComponent(answers.url)}&message=${encodeURIComponent(answers.message)}&count=${answers.count}`);
        const data = response.data;
        
        spinner.succeed('Spam NGL selesai!');
        
        let content = '';
        content += `Username: ${chalk.yellow(data.username)}\n`;
        content += `Pesan: ${chalk.yellow(data.message)}\n`;
        content += `Jumlah: ${chalk.cyan(data.count)}\n`;
        content += `Berhasil: ${chalk.green(data.results.success)}\n`;
        content += `Gagal: ${chalk.red(data.results.failed)}`;
        
        printBox('HASIL SPAM NGL', content);
        
    } catch (error) {
        spinner.fail('Gagal spam NGL!');
        console.log(chalk.red('Error:', error.message));
    }
}

module.exports = spamNGL;