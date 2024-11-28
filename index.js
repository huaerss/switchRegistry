#!/usr/bin/env node
const { showNpmConfig } = require('./npmconfig');
const { changeMirror } = require('./mirrorRegistry');
const { default: inquirer } = require('inquirer');

async function main() {
    try {
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'type',
                message: '请选择操作:',
                choices: [
                    'Git全局配置', 
                    '修改镜像源'
                ]
            }
        ]);

        switch (action.type) {
            case 'Git全局配置':
                await showNpmConfig();
                break;
            case '修改镜像源':
                await changeMirror();
                break;
        }
    } catch (error) {
        if (error.message.includes('User force closed the prompt')) {
            process.exit(0);
        } else {
            console.error('发生错误:', error.message);
            process.exit(1);
        }
    }
}

main()
