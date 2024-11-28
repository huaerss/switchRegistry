const { execSync } = require('child_process');
const { default: inquirer } = require('inquirer');

async function showNpmConfig() {
    try {
        const config = execSync('git config --global --list').toString();
        console.log('当前gitConfig配置:\n', config);

        const proxyAction = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: '是否进行操作:',
                choices: ['设置代理', '删除代理', '关闭']
            }
        ]);

        switch (proxyAction.action) {
            case '设置代理':
                await setProxy();
                break;
            case '删除代理':
                removeProxy();
                break;
            default:
                return;
        }
    } catch (error) {
        console.error('获取配置失败:', error.message);
    }
}

async function setProxy() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'httpProxy',
                message: '请输入HTTP代理地址 (例如: http://127.0.0.1:10809):',
            }
        ]);

        execSync(`git config --global http.proxy ${answers.httpProxy}`);
        execSync(`git config --global https.proxy ${answers.httpProxy}`);
        console.log('代理设置成功！当前代理配置为:');
        const config = execSync('git config --global --list').toString();
        console.log(config);
    } catch (error) {
        console.error('设置代理失败:', error.message);
    }
}

function removeProxy() {
    try {
        execSync('git config --global --unset http.proxy');
        execSync('git config --global --unset https.proxy');
        console.log('代理已成功删除！当前配置为:');
        const config = execSync('git config --global --list').toString();
        console.log(config);
    } catch (error) {
        console.error('删除代理失败:', error.message);
    }
}

module.exports = {
    showNpmConfig,
    setProxy,
    removeProxy
}
