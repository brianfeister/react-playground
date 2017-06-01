import fs from 'fs';
import 'path'
import child_process from 'child_process';
import jest from 'jest-cli';

const exec = child_process.execSync;
const devconfigPath = './.devconfig';
let devconfig;

if ( fs.existsSync(devconfigPath) ) {
  devconfig = JSON.parse( fs.readFileSync(devconfigPath) );
}

if ( devconfig && devconfig.prepushTest ) {
  console.log('running jest tests prior to push ... ' );
  try {
    exec('npm test', {stdio:'inherit'});
  } catch (e) {
    // swallow the ugly node default error this throws, since we only do this in a developer context
  }
}
