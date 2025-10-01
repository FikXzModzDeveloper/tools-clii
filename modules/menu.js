const inquirer = require('inquirer');
const chalk = require('chalk');
const { LihatJawa } = require('../lib/banner');

// require semua command anomali
const parseNIK = require('./nik');
const sendEmail = require('./email');
const checkWebsite = require('./webcheck');
const tiktokToCatbox = require('./tiktok');
const spamNGL = require('./spamngl');
const toApp = require('./toapp');
const tiktokDownload = require('./tiktokdl');
const tinyURLShortener = require('./tinyurl');

async function TampilMenuGengsi() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'tool',
            message: chalk.cyan('Pilih Tools:'),
            pageSize: 12,
            choices: [
                { name: 'Parser NIK', value: 'nik' },
                { name: 'Send Email', value: 'email' },
                { name: 'Web Check', value: 'webcheck' },
                { name: 'TikTok to Catbox', value: 'tiktok' },
                { name: 'Spam NGL', value: 'spamngl' },
                { name: 'To App Builder', value: 'toapp' },
                { name: 'TikTok Downloader', value: 'tiktokdl' },
                { name: 'TinyURL Shortener', value: 'tinyurl' },
                { name: 'Keluar', value: 'exit' }
            ]
        }
    ]);

    switch (answers.tool) {
        case 'nik':
            await parseNIK();
            break;
        case 'email':
            await sendEmail();
            break;
        case 'webcheck':
            await checkWebsite();
            break;
        case 'tiktok':
            await tiktokToCatbox();
            break;
        case 'spamngl':
            await spamNGL();
            break;
        case 'toapp':
            await toApp();
            break;
        case 'tiktokdl':
            await tiktokDownload();
            break;
        case 'tinyurl':
            await tinyURLShortener();
            break;
        case 'exit':
            console.log(chalk.yellow('bay bay syng'));
            process.exit(0);
    }

    const { continueUsing } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continueUsing',
            message: 'Mau lnjut kga bree??',
            default: true
        }
    ]);

    if (continueUsing) {
        console.clear();
        LihatJawa();
        await TampilMenuGengsi();
    } else {
        console.log(chalk.yellow('bay bay om'));
        process.exit(0);
    }
}

module.exports = TampilMenuGengsi;