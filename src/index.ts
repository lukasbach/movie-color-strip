import parseMovie from './parse-movie';
import generateImage from './generate-image';
import { program } from 'commander';

program
  .version('0.0.1')
  .addCommand(parseMovie)
  .addCommand(generateImage)
  .parse(process.argv);