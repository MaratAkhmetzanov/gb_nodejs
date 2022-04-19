import fs, { createReadStream, createWriteStream } from 'fs';
import readLine from 'readline';

const ACESS_LOG = './lesson_3/access.log';
const TEMP_LOG = './lesson_3/temp.log';

const ipList = [
  '89.123.1.41',
  '34.48.240.111'
]

let writeStreams = [];

const readStream = createReadStream(ACESS_LOG, {
  encoding: 'utf-8',
  highWaterMark: 64
});

ipList.forEach(element => {
  const wStream = createWriteStream(`./lesson_3/${element}_requests.log`, {
    encoding: 'utf-8',
    flags: 'a'
  });
  writeStreams[element] = wStream;
});

const rl = readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

for await (const line of rl) {
  ipList.forEach(element => {
    if (line.includes(element)) {
      writeStreams[element].write(line + '\n',
        (err) => {
          if (err) console.log(err)
        })
    }
  });
};