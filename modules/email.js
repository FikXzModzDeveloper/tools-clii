const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function sendEmail() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'to',
            message: 'Email tujuan:',
            validate: input => input.includes('@') ? true : 'Format email tidak valid!'
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Subjek email:',
            validate: input => input.length > 0 ? true : 'Subjek tidak boleh kosong!'
        },
        {
            type: 'input',
            name: 'message',
            message: 'Pesan email:',
            validate: input => input.length > 0 ? true : 'Pesan tidak boleh kosong!'
        }
    ]);

    const spinner = ora('Mengirim email...').start();
    
    try {
        const response = await axios.get(
            `https://api.fikmydomainsz.xyz/tools/sendmail/send?to=${encodeURIComponent(answers.to)}&subject=${encodeURIComponent(answers.subject)}&message=${encodeURIComponent(answers.message)}`
        );
        const data = response.data;
        
        spinner.succeed('Email berhasil dikirim!');
        
        let content = '';
        content += `Status: ${chalk.green('Berhasil')}\n`;
        content += `Penerima: ${chalk.yellow(data.summary.recipient)}\n`;
        content += `Subjek: ${chalk.yellow(data.summary.subject)}\n`;
        content += `Waktu: ${chalk.yellow(new Date(data.summary.sentAt).toLocaleString())}\n`;
        content += `Response SMTP: ${chalk.cyan(data.meta.smtpResponse)}`;
        
        printBox('STATUS PENGIRIMAN', content);
        
    } catch (error) {
        spinner.fail('Gagal mengirim email!');
        console.log(chalk.red('Error:', error.message));
    }
}

module.exports = sendEmail;