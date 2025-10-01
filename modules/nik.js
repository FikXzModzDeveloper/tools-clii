const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { printBox } = require('../lib/utils');

async function parseNIK() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'nik',
            message: 'Masukkan NIK:',
            validate: input => input.length === 16 ? true : 'NIK harus 16 digit!'
        }
    ]);

    const spinner = ora('Memproses NIK...').start();
    
    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/nik?nik=${answers.nik}`);
        const data = response.data;
        
        spinner.succeed('Berhasil memproses NIK!');
        
        if (data.status) {
            const result = data.result;
            let content = '';
            content += `NIK: ${chalk.yellow(result.nik)}\n`;
            content += `Jenis Kelamin: ${chalk.yellow(result.kelamin)}\n`;
            content += `Tanggal Lahir: ${chalk.yellow(result.lahir)}\n`;
            content += `Lahir Lengkap: ${chalk.yellow(result.lahir_lengkap)}\n`;
            content += `Provinsi: ${chalk.yellow(result.provinsi.nama)}\n`;
            content += `Kota/Kab: ${chalk.yellow(result.kotakab.nama)}\n`;
            content += `Kecamatan: ${chalk.yellow(result.kecamatan.nama)}\n`;
            content += `Nomor Urut: ${chalk.yellow(result.nomor_urut)}\n\n`;
            content += `${chalk.cyan('INFORMASI TAMBAHAN')}\n`;
            content += `Pasaran: ${chalk.yellow(result.tambahan.pasaran)}\n`;
            content += `Usia: ${chalk.yellow(result.tambahan.usia)}\n`;
            content += `Kategori: ${chalk.yellow(result.tambahan.kategori_usia)}\n`;
            content += `Ultah Berikutnya: ${chalk.yellow(result.tambahan.ultah)}\n`;
            content += `Zodiak: ${chalk.yellow(result.tambahan.zodiak)}`;
            
            printBox('HASIL PARSING NIK', content);
        } else {
            console.log(chalk.red('Gagal memproses NIK!'));
        }
    } catch (error) {
        spinner.fail('Error memproses NIK!');
        console.log(chalk.red('Terjadi kesalahan:', error.message));
    }
}

module.exports = parseNIK;