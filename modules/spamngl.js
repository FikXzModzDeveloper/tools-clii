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
            message: 'NGL username or full ngl.link URL:',
            validate: input => input && input.trim().length > 0 ? true : 'Username or URL cannot be empty!'
        },
        {
            type: 'input',
            name: 'message',
            message: 'Message:',
            validate: input => input && input.trim().length > 0 ? true : 'Message cannot be empty!'
        },
        {
            type: 'input',
            name: 'count',
            message: 'Number of messages:',
            default: '10',
            validate: input => {
                const n = Number(input);
                return Number.isInteger(n) && n > 0 ? true : 'Count must be a positive integer!';
            }
        }
    ]);

    let builtUrl = answers.url.trim();
    if (!builtUrl.toLowerCase().includes('ngl.link')) {
        const username = builtUrl.replace(/^@+/, '').trim();
        builtUrl = `https://ngl.link/${encodeURIComponent(username)}`;
    } else {
        if (!/^https?:\/\//i.test(builtUrl)) builtUrl = 'https://' + builtUrl.replace(/^\/+/g, '');
    }

    const spinner = ora(`Sending ${answers.count} message(s) to ${builtUrl}...`).start();

    try {
        const response = await axios.get(`https://api.fikmydomainsz.xyz/tools/spamngl?url=${encodeURIComponent(builtUrl)}&message=${encodeURIComponent(answers.message)}&count=${encodeURIComponent(answers.count)}`);
        const data = response.data;

        spinner.succeed('NGL spam finished!');

        let content = '';
        content += `Target: ${chalk.yellow(builtUrl)}\n`;
        content += `Username: ${chalk.yellow(data.username || answers.url)}\n`;
        content += `Message: ${chalk.yellow(data.message || answers.message)}\n`;
        content += `Requested: ${chalk.cyan(data.count || answers.count)}\n`;
        content += `Successful: ${chalk.green((data.results && data.results.success) || 0)}\n`;
        content += `Failed: ${chalk.red((data.results && data.results.failed) || 0)}`;

        printBox('NGL SPAM RESULT', content);

    } catch (error) {
        spinner.fail('Failed to spam NGL!');
        if (error.response) {
            console.log(chalk.red('API responded with status', error.response.status));
            if (error.response.data) console.log(chalk.red('Response:'), error.response.data);
        } else if (error.request) {
            console.log(chalk.red('No response received from API. Network or timeout issue.'));
        } else {
            console.log(chalk.red('Error:'), error.message);
        }
    }
}

module.exports = spamNGL;
