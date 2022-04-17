import fs from 'fs';

const ACESS_LOG = './gb_nodejs_lesson_3/access.log';

const requests = [
  `127.0.0.1 - - [30/Jan/2021:11:10:15 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
  `127.0.0.2 - - [30/Jan/2021:11:10:15 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"`
]

// fs.writeFile(
//   ACESS_LOG,
//   requests[0] + '\n',
//   {
//     encoding: 'utf-8',
//     flag: 'a'
//   },
//   (err) => { if (err) console.log(err); }
// );

// fs.readFile(ACESS_LOG, 'utf-8', (err, data) => {
//   if (err) console.log(err);
//   else console.log(data)
// });