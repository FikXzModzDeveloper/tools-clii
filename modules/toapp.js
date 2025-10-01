const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { selectDirectory } = require('../lib/directory');
const { downloadFile } = require('../lib/downloader');
const { printBox } = require('../lib/utils');

async function toApp() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL website:',
            validate: input => input.startsWith('http') ? true : 'URL harus diawali dengan http/https!'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email:',
            validate: input => input.includes('@') ? true : 'Format email tidak valid!'
        },
        {
            type: 'input',
            name: 'appName',
            message: 'Nama aplikasi:',
            validate: input => input.length > 0 ? true : 'Nama aplikasi tidak boleh kosong!'
        },
        {
            type: 'input',
            name: 'appIcon',
            message: 'URL icon aplikasi:',
            default: 'https://files.catbox.moe/0cszj5.jpg'
        }
    ]);

    const selectedDir = await selectDirectory();
    console.log(chalk.cyan('Direktori terpilih:'), selectedDir);

    const spinner = ora('Membuat aplikasi...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/toapp/build-complete?url=${encodeURIComponent(answers.url)}&email=${encodeURIComponent(answers.email)}&appName=${encodeURIComponent(answers.appName)}&appIcon=${encodeURIComponent(answers.appIcon)}`);
        const data = response.data;
        
        spinner.succeed('Aplikasi berhasil dibuat!');
        
        let content = '';
        content += `Nama: ${chalk.yellow(data.appName)}\n`;
        content += `Package: ${chalk.cyan(data.packageName)}\n`;
        content += `App ID: ${chalk.cyan(data.appId)}\n\n`;
        content += `${chalk.cyan('KEYSTORE INFO')}\n`;
        content += `Store Pass: ${chalk.yellow(data.storePass)}\n`;
        content += `Key Pass: ${chalk.yellow(data.keyPass)}\n`;
        content += `Key SHA: ${chalk.cyan(data.keySha)}`;
        
        printBox('INFO APLIKASI', content);

        const downloadSpinner = ora('Mengunduh file APK...').start();
        try {
            if (!fs.existsSync(selectedDir)) {
                fs.mkdirSync(selectedDir, { recursive: true });
            }
            
            const fileName = `${data.appName.replace(/\s+/g, '_')}.apk`;
            const filePath = path.join(selectedDir, fileName);
            
            await downloadFile(data.downloadUrl, filePath);
            downloadSpinner.succeed(`APK berhasil disimpan di: ${chalk.green(filePath)}`);
            
        } catch (downloadError) {
            downloadSpinner.fail('Gagal mengunduh APK');
            console.log(chalk.red('Error download:', downloadError.message));
        }
        
    } catch (error) {
        spinner.fail('Gagal membuat aplikasi!');
        console.log(chalk.red('Error:', error.message));
    }
}

module.exports = toApp;