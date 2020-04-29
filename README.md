# LottieOptim

![npm bundle size](https://img.shields.io/bundlephobia/min/lottie-optim) ![npm](https://img.shields.io/npm/v/lottie-optim)

A simple and lightweight tool to optimise lottie files.

  * Reduced decimal precision (color values excluded)
  * Remove unused fields: `nm`, `mn`, `hd`, `ks.r`, `ks.s`, `ix`, `np`, `cix`
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
