#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const optim = require('./optim');
const package = require('./package.json');
const SIZES = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

let inputValue;

program
  .version(package.version)
  .name('lottie-optim')
  .option('-p, --precision <number>', 'Round numbers to a number of decimal places to reduce filesize', parseInt, 2)
  .option('-o, --out <file>', 'Output file, without this option the original file with be overridden')
  .arguments('<file>')
  .action(input => (inputValue = input))
  .parse(process.argv);

if (inputValue == null) {
  console.error('No lottie JSON file specified.');
  process.exit(1);
}

const inputPath = path.resolve(inputValue);
const outputValue = program.out != null ? program.out : inputValue;
const outputPath = path.resolve(outputValue);

try {
  if (!fs.existsSync(inputPath))
    throw new Error(`Could not find or access ${inputValue}, please check that it exists.`);

  const content = fs.readFileSync(inputPath, 'utf8');

  if (content == null) throw new Error(`Could not open ${inputValue}`);

  const {output, inputBytes, outputBytes, nodesDeleted} = optim(content, program.precision);
  fs.writeFileSync(outputPath, output);

  console.log(`Optimised Lottie JSON written to ${outputValue}`);
  console.log(`Input:     ${readableBytes(inputBytes)}`);
  console.log(`Output:    ${readableBytes(outputBytes)}`);
  console.log(`Reduction: ${readableBytes(outputBytes - inputBytes)} (${percent(outputBytes / inputBytes - 1)})`);
} catch (error) {
  console.error(error);
  process.exit(1);
}

function readableBytes(bytes) {
  let sign = '';
  if (bytes < 0) {
    sign = '-';
    bytes = Math.abs(bytes);
  }
  const index = bytes == 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  const number = bytes == 0 ? 0 : new Number((bytes / Math.pow(1024, index)).toFixed(2));
  return `${sign}${number} ${SIZES[index]}`;
}

function percent(value) {
  return `${Math.round(value * 100)}%`;
}
