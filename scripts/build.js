'use strict';

const webpack = require('webpack');
const config = require('config');

const options = {};

Object.entries(config.webpack).map(([k, v]) => options[k] = v);

webpack(options, (error, statistics) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(statistics.toString({
    colors: true,
    maxModules: process.argv.find(x => x === '-v') ? Infinity : 2,
    entrypoints: 1,
    depth: true
  }));
  if (statistics.hasErrors()) process.exit(1);
  if (statistics.hasWarnings()) process.exit(1);
});
