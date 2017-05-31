import fs from 'fs';
import * as child from 'child_process';
const exec = child.exec;

const devconfigPath = './.devconfig';
let devconfig;

if ( fs.existsSync(devconfigPath) ) {
  devconfig = JSON.parse( fs.readFileSync(devconfigPath) );
}

if ( devconfig && devconfig.prepushTest ) {
  console.log('running jest tests prior to push ... ' );
  exec('jest --coverage');
}
