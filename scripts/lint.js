// "lint": "eslint main.js core/**/*.js !demos/**/*",

import fs from 'fs';
import * as child from 'child_process';
const exec = child.exec;

const devconfig = './.devconfig';

let devConfig;

if ( fs.existsSync(devconfig) ) {
  JSON.parse( fs.readFileSync(devconfig) );
}

console.log('devConfig', devConfig )

if ( devConfig && devConfig.precommitLint ) {
  exec('lint-staged');
} else {
  exec('lint');
}
