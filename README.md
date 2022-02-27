# LottieOptim

[![npm bundle size](https://img.shields.io/bundlephobia/min/lottie-optim)](https://www.npmjs.com/package/lottie-optim) [![npm](https://img.shields.io/npm/v/lottie-optim)](https://www.npmjs.com/package/lottie-optim)

A simple and lightweight tool to optimise lottie files.

  * Reduced decimal precision (color values excluded)
  * Remove unused fields:
    * `nm` - After Effect's Name. Used for expressions.
    * `mn` - After Effect's Match Name. Used for expressions.
    * `hd` - Undocumented boolean that always seems to be false.
    * `ks.r` - Transform Rotation
    * `ks.s` - Transform Scale
    * `ix` - Effect Index. Used for expressions.
    * `np` - Group number of properties. Used for expressions.
    * `cix` - Undocumented
  * Minify JSON

## Usage

```bash
npx lottie-optim [options] <file>

Options:
  -V, --version             output the version number
  -p, --precision <number>  Round numbers to a number of decimal places to reduce filesize (default: 2)
  -o, --out <file>          Output file, without this option the original file with be overridden
  -h, --help                output usage information
```

#### Example

```bash
npx lottie-optim -p 1 -o lottie.min.json lottie.json
```
