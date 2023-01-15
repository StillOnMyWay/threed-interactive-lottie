import fs from 'fs-extra';
import fetch from 'node-fetch';
// import { version, main as path, name, bin as library } from '../package.json';
// import pkg from '../package.json';
const pkg = fs.readFileSync('./package.json', 'utf8');

const { version, main: path, name, bin: library } = JSON.parse(pkg);
// const file = {
//   path: './dist/vite-lit-starter.iife.js',
//   version: '0.0.2',
//   library: 'LixComponents',
//   name: 'lixnotifications-main',
// };
const fileData = fs.readFileSync('./' + path, 'utf8');
// console.log(fileData);
const token = 'c9071307-0e8c-4b02-b227-724336db4024';

console.log(
  `https://www.dev-site-2x1426.wix-dev-sites.org/_functions/cdnupload?filename=${name}&version=${version}&library=${library}&token=${token}`
);
try {
  const data = await fetch(
    `https://www.dev-site-2x1426.wix-dev-sites.org/_functions-dev/cdnupload?filename=${name}&version=${version}&library=${library}&token=${token}`,
    {
      method: 'POST',
      body: fileData,
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );

  console.log(data);
} catch (err) {
  console.error('Fetch Failed:' + err);
}
