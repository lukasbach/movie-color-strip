import * as fs from 'fs';
import * as glob from 'glob';
// @ts-ignore
import * as getAverageColorFromColorArray from 'average-colour';
import { createCanvas } from 'canvas';
import { Command, Option, OptionValues } from 'commander';

const TEMP_DIR = './tmp';
const SIZE = 77;
const OUT_HEIGHT = 200;
// Harry Potter and the Philosopher's Stone

const program = new Command('generate-image');
program
  .addOption(new Option('-f, --files <glob>', 'JSON Color files glob').default('./**/*.colors.json'))
  .addOption(new Option('-w, --width <size>', 'Output image width').default('800'))
  .addOption(new Option('-h, --height <size>', 'Output image height').default('300'))
  .addOption(new Option('-x, --orientation <size>', 'Output orientation, either "horizontal" or "vertical"').default('horizontal'))
  .addOption(new Option('-o, --output <name>', 'Output name, must be .png').default('./{name}.png'))
  .action(async (options: {
    files: string,
    width: string,
    height: string,
    orientation: string,
    output: string
  }, command: Command) => {
    try {
      const width = Number.parseInt(options.width);
      const height = Number.parseInt(options.height);
      const dominantSize = options.orientation === 'horizontal' ? width : height;
      const nonDominantSize = options.orientation === 'horizontal' ? height : width;

      const files: string[] = await new Promise(res => glob(options.files, { cwd: process.cwd() }, (err, matches) => res(matches)));
      console.log(`Parsing files ${files.join(', ')}`);

      for (const file of files) {
        const {colors, name} = JSON.parse(await fs.promises.readFile(file, { encoding: 'utf-8' }));
        console.log(`Processing ${name} (${file})...`);

        const colorsTruncated: string[] = [];
        const truncateLength = Math.floor(colors.length / dominantSize);
        console.log(`Collected ${colors.length} colors, but want ${dominantSize}, so each ${truncateLength} colors will be truncated.`);
        for (let i = 0, j = 0; i < dominantSize; i++) {
          const toTruncate: string[] = [];
          for (let k = 0; k < truncateLength; k++) {
            toTruncate.push(colors[j++]);
          }
          const avg = getAverageColorFromColorArray(toTruncate);
          colorsTruncated.push(avg);
        }

        const out = createCanvas(width, height);
        const ctx = out.getContext("2d");
        let x = 0;
        for (const color of colorsTruncated) {
          ctx.fillStyle = color;
          if (options.orientation === 'horizontal') {
            ctx.fillRect(x++, 0, 1, height);
          } else {
            ctx.fillRect(0, x++, width, 1);
          }
        }

        const outname = options.output.replace("{name}", name);
        out.createPNGStream({}).pipe(fs.createWriteStream(outname));
      }
    } catch (e) {
      console.error("Error:")
      console.log(e)
    }
  });

export default program;
