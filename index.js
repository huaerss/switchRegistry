#!/usr/bin/env node

const { execSync } = require('child_process');
const { default: inquirer } = require('inquirer');
const registries = {
    'npm官方': 'https://registry.npmjs.org/',
    '淘宝镜像': 'https://registry.npmmirror.com/',
    "腾讯镜像": "https://mirrors.cloud.tencent.com/npm/",
    "华为镜像": "https://mirrors.huaweicloud.com/repository/npm/",
  };
function getCurrentRegistry() {
    try {
      return execSync('npm config get registry').toString().trim();
    } catch (error) {
      console.error('获取镜像源失败:', error.message);
      return null;
    }
  }


  async function main() {
    try {
        const currentRegistry = getCurrentRegistry();
        console.log('当前的镜像源为:', currentRegistry ,'当前的镜像名称为:', Object.keys(registries).find(key => registries[key] === currentRegistry));
        const registry = await inquirer.prompt([
            {
                type: 'list',
                name: 'registry',
                message: '请选择镜像源:',
                choices: Object.keys(registries),
            },
        ]);
        const registryUrl = registries[registry.registry]
        execSync(`npm config set registry ${registryUrl}`)
        console.log(`已将镜像源设置为: ${registryUrl}`)
    } catch (error) {
        if (error.message.includes('User force closed the prompt')) {
            // console.log('\n程序已被用户终止');
            process.exit(0); // 正常退出程序
        } else {
            console.error('发生错误:', error.message);
            process.exit(1); // 发生错误时退出
        }
    }
} 
main()
