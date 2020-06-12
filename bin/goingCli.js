#!/usr/bin/env node
;(function () {
    console.log('cli -----开始进行生成操作');
    const program = require('commander');
    program.version(require('../package.json').version);
    //通过该命令从git中下载文件
    program.command('create <name>').description('create goSingleCrud').action(require('../lib/create.js'));
    program.parse(process.argv);
})()
