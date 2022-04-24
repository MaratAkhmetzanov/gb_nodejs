#!/usr/bin/node
import fs, { createReadStream } from 'fs';
import path from 'path';
import yargs from 'yargs';
import inquirer from 'inquirer';
import readLine from 'readline';

const __dirname = path.resolve();

const options = yargs(process.argv.slice(2))
  .usage('Usage: text')
  .option('p', {
    alias: 'path',
    default: __dirname,
    describe: 'start directory',
    type: 'string'
  })
  .option('s', {
    alias: 'search',
    default: '',
    describe: 'Text to search',
    type: 'string'
  })
  .argv;

const isDirectory = (element) => fs.lstatSync(element).isDirectory();
const fileList = (directory) => fs.readdirSync(directory);

const searchInFile = (filePath, text1) => {
  const readStream = createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 64
  });

  const rl = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.includes(text1)) {
      console.log(line);
    }
  })
}

const selectFile = (directory, searchSubString) => inquirer.prompt([
  {
    name: 'fileName',
    type: 'list',
    message: 'Выберите файл:',
    choices: ['..', ...fileList(directory)]
  }
])
  .then(answer => {
    isDirectory(`${directory}/${answer.fileName}`)
      ? selectFile(`${directory}/${answer.fileName}`, searchSubString)
      : searchInFile(`${directory}/${answer.fileName}`, searchSubString)
  })
  .catch(err => console.log(err));

console.log(__dirname);
selectFile(options['p'], options['s']);