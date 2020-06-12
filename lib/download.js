const {promisify}=require('util');


const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const fsEx = require('fs-extra')


/**
 * @param { delPath：String } （需要删除文件的地址）
 * @param { direct：Boolean } （是否需要处理地址）
 */
function deleteFile(delPath, direct) {
    delPath = direct ? delPath : path.join(__dirname, delPath)
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
}

function deleteFolder(delPath) {
    delPath = path.join(__dirname, delPath)

    try {
        if (fs.existsSync(delPath)) {
            const delFn = function (address) {
                const files = fs.readdirSync(address)
                for (let i = 0; i < files.length; i++) {
                    const dirPath = path.join(address, files[i])
                    if (fs.statSync(dirPath).isDirectory()) {
                        delFn(dirPath)
                    } else {
                        deleteFile(dirPath, true)
                    }
                }
                /**
                 * @des 只能删空文件夹
                 */
                fs.rmdirSync(address);
            }
            delFn(delPath);
        } else {
            console.log('do not exist: ', delPath);
        }
    } catch (error) {
        console.log('del folder error', error);
    }
}

module.exports.clone=async  function (repo,desc,options) {
    const download=promisify(require('download-git-repo'));
    const ora=require('ora');
    const process=ora('下载。。。。。${repo}');

    process.start();

    await download(repo,desc,options);

    process.succeed();

    //删除多余的文件夹
    deleteFolder('../'+desc+"/.github");
    deleteFolder('../'+desc+"/.idea");
    deleteFile('../'+desc+"/README.md");



}