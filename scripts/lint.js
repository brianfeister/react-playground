import fs from 'fs';
import * as child from 'child_process';
import * as staged from 'lint-staged';

const exec = child.exec;

const devconfigPath = './.devconfig';
let devconfig;

if ( fs.existsSync(devconfigPath) ) {
  devconfig = JSON.parse( fs.readFileSync(devconfigPath) );
}

if ( devconfig && devconfig.precommitLint ) {
  console.log('linting staged files precommit ... ' )
  exec('./node_modules/babel-cli/bin/babel-node.js staged')
} else {
  exec('git add');
}
