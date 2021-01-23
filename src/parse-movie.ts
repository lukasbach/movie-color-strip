import * as fs from 'fs';
import * as glob from 'glob';
import * as rimraf from 'rimraf';
import {getAverageColor} from 'fast-average-color-node';
import * as path from 'path';
// @ts-ignore
import * as getAverageColorFromColorArray from 'average-colour';
import { Command, Option } from 'commander';
import { exec } from 'child_process';

const program = new Command('parse-movie');
program
  .addOption(new Option('-t, --tmp-dir <directory>', 'Temporary directory for storing image files').default('./tmp'))
  .addOption(new Option('-o, --out <filename>', 'Output filename, must be .json').default('./{moviename}.colors.json'))
  .addOption(new Option('-n, --name <name>', 'Movie name, will be encoded into json file').default('{moviename}'))
  .addOption(new Option('-m, --movies <glob>', 'Glob for finding movies').default('./movies/**/*.mkv'))
  .addOption(new Option('-f, --every-frames <frames>', 'How often to grab a frame from the movie, i.e. every n frames.').default('120'))
  .action(async (options: {
    tmpDir: string,
    out: string,
    name: string,
    movies: string,
    everyFrames: string
  }, command: Command) => {
    try {
      if (!fs.existsSync(options.tmpDir)) {
        await fs.promises.mkdir(options.tmpDir);
      }

      const files: string[] = await new Promise(res => glob(options.movies, { cwd: process.cwd() }, (err, matches) => res(matches)));
      console.log(`Parsing movies ${files.join(', ')}`);

      for (const file of files) {
        console.log(`Working on ${file}`);
        await new Promise(res => rimraf(options.tmpDir, {}, res));
        if (!fs.existsSync(options.tmpDir)) {
          await fs.promises.mkdir(options.tmpDir);
        }

        console.log(`Splitting movie into frames...`);
        await new Promise<void>((res, rej) => {
          exec(
            `ffmpeg -i "${file}" -vsync 0 -filter_complex ` +
            ` "scale=iw*sar:ih, pad=max(iw\\,ih*(12/5)):ow/(12/5):(ow-iw)/2:(oh-ih)/2:black, select=not(mod(n\\,${Number.parseFloat(options.everyFrames)}))" ` +
            path.join(options.tmpDir, `frame_%d.jpg`),
            {
              maxBuffer: 1024*1024*50,
              cwd: process.cwd(),
            },
            (error, stdout) => {
              if (error) {
                console.error("FFMPEG resulted in an error:");
                console.log(error);
                rej(error);
              } else {
                res();
              }
            }
          );
        });

        console.log(`Computing average colors...`);
        const colors: string[] = [];
        const colorImages = await fs.promises.readdir(options.tmpDir);
        const colorImagesSorted = colorImages.sort((a, b) => {
          const aNo = Number.parseInt(/[^\_]+\_(\d+)\./.exec(a)[1]);
          const bNo = Number.parseInt(/[^\_]+\_(\d+)\./.exec(b)[1]);
          return aNo - bNo;
        });
        for (const image of colorImagesSorted) {
          colors.push((await getAverageColor(path.join(options.tmpDir, image))).hex);
        }

        const filename = options.out.replace('{moviename}', path.parse(file).name);
        const name = options.name.replace('{moviename}', path.parse(file).name);

        console.log(`Writing color file...`);
        await fs.promises.writeFile(filename, JSON.stringify({
          name, colors
        }));

        console.log(`Done with ${file}`);
      }
    } catch (e) {
      console.error("Error:")
      console.log(e)
    }
  });

export default program;
