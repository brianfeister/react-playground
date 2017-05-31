import fs from 'fs';
import * as child from 'child_process';
const exec = child.exec;

const devconfigPath = './.devconfig';
let devconfig;

if ( fs.existsSync(devconfigPath) ) {
  devconfig = JSON.parse( fs.readFileSync(devconfigPath) );
}

if ( devconfig && devconfig.precommitLint ) {
  console.log('linting staged files precommit ... ' )
  exec('lint-staged');
} else {
  exec('git add');
}
