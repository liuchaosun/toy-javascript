const fs = require('fs');
const assert = require('assert');
const nodePath = require('path');

/**
 * 获取所有待测试的文件记录
 * @param {指定的待测试目录} path
 * @param {存放找到的记录} testFiles
 */
function FindTestFiles(path, testFiles) {
  // 递归读取文件
  function FindFile(path) {
    // 同步读取所有文件
    let files = fs.readdirSync(path);
    files.forEach(function (item) {
      // a 拼接每个读取到的资源的绝对路径
      let fPath = nodePath.join(path, item);
      // b 检查资源的类型
      let stat = fs.statSync(fPath);
      // c 如果是文件目录，继续深入
      if (stat.isDirectory() === true) {
        FindFile(fPath);
      }
      // d 如果是文件并且以 test.js 结尾
      else if (stat.isFile() === true && /[\s\S]+\.test\.js$/.test(item) === true) {
        testFiles.push(fPath);
      }
    });
  }
  FindFile(path);

  return testFiles;
}

/**
 * 单元测试函数
 */
function UnitTest() {
  const testFiles = FindTestFiles(nodePath.join(__dirname, '../src'), []);
  // 遍历所有待测试的文件，分别进行单元测试
  testFiles.forEach((item) => {
    let ff = require(item);
    if (ff.test && typeof ff.test === 'function') {
      /* eslint-disable no-undef */
      ff.test(describe, it, assert);
    }
  });
}

UnitTest();
