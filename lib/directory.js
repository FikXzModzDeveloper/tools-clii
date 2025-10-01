const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const os = require('os');

function getDefaultDirectory() {
    const platform = os.platform();
    return platform === 'android' ? '/sdcard/Download' : path.join(os.homedir(), 'Downloads');
}

function getCommonDirectories() {
    const defaultDir = getDefaultDirectory();
    const commonDirs = [
        { name: 'Download (Default)', value: defaultDir },
        { name: 'Home Directory', value: os.homedir() },
        { name: 'Current Directory', value: process.cwd() },
        { name: 'Desktop', value: path.join(os.homedir(), 'Desktop') },
        { name: 'Documents', value: path.join(os.homedir(), 'Documents') }
    ];
    
    const uniqueDirs = [];
    const seen = new Set();
    
    commonDirs.forEach(dir => {
        if (!seen.has(dir.value) && fs.existsSync(dir.value)) {
            uniqueDirs.push(dir);
            seen.add(dir.value);
        }
    });
    
    return uniqueDirs;
}

async function selectDirectory() {
    const commonDirs = getCommonDirectories();
    
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'directory',
            message: 'Pilih direktori penyimpanan:',
            choices: [
                ...commonDirs,
                new inquirer.Separator(),
                { name: 'Input manual path...', value: 'manual' }
            ]
        }
    ]);
    
    if (answers.directory === 'manual') {
        const manualAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'manualPath',
                message: 'Masukkan path direktori:',
                default: getDefaultDirectory(),
                validate: input => {
                    try {
                        path.resolve(input);
                        return true;
                    } catch {
                        return 'Path tidak valid!';
                    }
                }
            }
        ]);
        return manualAnswer.manualPath;
    }
    
    return answers.directory;
}

module.exports = { selectDirectory, getDefaultDirectory };