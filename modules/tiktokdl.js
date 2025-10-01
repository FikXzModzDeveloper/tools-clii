const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { selectDirectory } = require('../lib/directory');
const { downloadFile } = require('../lib/downloader');
const { printBox } = require('../lib/utils');

async function tiktokDownload() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'URL TikTok:',
            validate: input => input.includes('tiktok.com') ? true : 'URL harus dari TikTok!'
        }
    ]);

    const selectedDir = await selectDirectory();
    console.log(chalk.cyan('Direktori terpilih:'), selectedDir);

    const spinner = ora('Mengambil data TikTok...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/download/tiktok-v2?url=${encodeURIComponent(answers.url)}`);
        const data = response.data;
        
        if (data.status && data.result) {
            spinner.succeed('Data TikTok berhasil diambil!');
            const tiktokData = data.result.data;
            
            let content = '';
            content += `Judul: ${chalk.yellow(tiktokData.title || 'Tidak ada judul')}\n`;
            content += `Durasi: ${chalk.cyan(tiktokData.duration + ' detik')}\n`;
            content += `Pembuat: ${chalk.yellow(tiktokData.author.nickname)}\n`;
            content += `Username: ${chalk.cyan(tiktokData.author.unique_id)}\n`;
            content += `Like: ${chalk.green(tiktokData.digg_count.toLocaleString())}\n`;
            content += `Komentar: ${chalk.cyan(tiktokData.comment_count.toLocaleString())}\n`;
            content += `Share: ${chalk.yellow(tiktokData.share_count.toLocaleString())}`;
            
            printBox('INFO VIDEO', content);
            
            const downloadChoices = [
                { name: 'Video WM (Watermark)', value: 'wm', url: tiktokData.wmplay },
                { name: 'Video HD (No Watermark)', value: 'hd', url: tiktokData.hdplay },
                { name: 'Video Original', value: 'play', url: tiktokData.play },
                { name: 'Audio Only', value: 'audio', url: tiktokData.music }
            ].filter(choice => choice.url);

            const downloadAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: 'Pilih yang ingin diunduh:',
                    choices: downloadChoices
                }
            ]);

            const selectedChoice = downloadChoices.find(choice => choice.value === downloadAnswer.type);
            const downloadSpinner = ora('Mengunduh file...').start();

            try {
                if (!fs.existsSync(selectedDir)) {
                    fs.mkdirSync(selectedDir, { recursive: true });
                }

                const extension = downloadAnswer.type === 'audio' ? 'mp3' : 'mp4';
                const fileName = `tiktok_${tiktokData.id}_${downloadAnswer.type}.${extension}`;
                const filePath = path.join(selectedDir, fileName);

                await downloadFile(selectedChoice.url, filePath);
                downloadSpinner.succeed(`File berhasil disimpan di: ${chalk.green(filePath)}`);

                const stats = fs.statSync(filePath);
                console.log(chalk.cyan(`Ukuran file: ${(stats.size / 1024 / 1024).toFixed(2)} MB`));

            } catch (downloadError) {
                downloadSpinner.fail('Gagal mengunduh file');
                console.log(chalk.red('Error download:', downloadError.message));
            }

        } else {
            spinner.fail('Tidak ada hasil!');
            console.log(chalk.red('Video TikTok tidak ditemukan.'));
        }
    } catch (error) {
        spinner.fail('Error mengambil data TikTok!');
        console.log(chalk.red('Terjadi kesalahan:', error.message));
    }
}

module.exports = tiktokDownload;