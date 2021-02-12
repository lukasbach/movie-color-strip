# ``movie-color-strip``

CLI tool for generating a color composition of a movies colors, inspired by
[thecolorsofmotion.com](https://thecolorsofmotion.com). The tool generates a
linear arrangement of color stripes, each strip representing the average of
several frames within the movie, ordered by timestamp. The result visualizes
the tone and ambience of the movie, as well as its progress.

<p align="center">
    <img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-8.png">
</p>

This image is the result for the last Harry Potter movie. Some segments are
easily mappable to specific segments of the movie, such as the orange segment
in the middle which was generated from the fire in the room of requirements,
or the bright whitish area at the end generated from the segment when Harry met
dead Dumbledore at Kings Cross.

More examples are available [below](#Examples).

## Contributions

There exist several similar projects already. This project is written as a NPM
package, which means you can just run it in your command line with only NodeJS
and FFMPEG installed. Additionally, it works on arbitrarily many movies,
so you can start a batch of several movies at once and have images generated
from all of them. Finally, this project splits the process of computing
the colors from an video file, and generating the resulting image, into distinct
commands. You can extract the colors from a movie once into a JSON file (which
is the long part), and then generate multiple image formats from them with a different
command. You can specify the exact dimensions of the image and whether it
should be generated horizontally or vertically.

## Usage

Install NodeJS and FFMPEG globally. Then, invoke ``npx movie-color-strip``.

    Usage: npx movie-color-strip [options] [command]

    Options:
    -V, --version             output the version number
    -h, --help                display help for command
    
    Commands:
    parse-movie [options]
    generate-image [options]
    help [command]            display help for command

First, call ``npx movie-color-strip parse-movie`` to generate color files
from movies. This might take a significant amount of time (~30 minutes per movie).
This will be computed for every movie detected by the glob supplied via ``--movies``
(defaults to ``./movies/**/*.mkv``).

    Usage: npx movie-color-strip parse-movie [options]

    Options:
    -t, --tmp-dir <directory>    Temporary directory for storing image files (default: "./tmp")
    -o, --out <filename>         Output filename, must be .json (default: "./{moviename}.colors.json")
    -n, --name <name>            Movie name, will be encoded into json file (default: "{moviename}")
    -m, --movies <glob>          Glob for finding movies (default: "./movies/**/*.mkv")
    -f, --every-frames <frames>  How often to grab a frame from the movie, i.e. every n frames. (default: "120")
    -h, --help                   display help for command

Then, call ``npx movie-color-strip generate-image`` to create image files from the resulting
color files.

    Usage: npx movie-color-strip generate-image [options]
    
    Options:
    -f, --files <glob>        JSON Color files glob (default: "./**/*.colors.json")
    -w, --width <size>        Output image width (default: "800")
    -h, --height <size>       Output image height (default: "300")
    -x, --orientation <size>  Output orientation, either "horizontal" or "vertical" (default: "horizontal")
    -o, --output <name>       Output name, must be .png (default: "./{name}.png")
    --help                    display help for command

## Examples

<p align="center">
Harry Potter and the Philosophers Stone

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-1.png" />
</p>

<p align="center">
Harry Potter and the Chamber of Secrets

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-2.png" />
</p>

<p align="center">
Harry Potter and the Prisoner of Azkaban

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-3.png" />
</p>

<p align="center">
Harry Potter and the Goblet of Fire

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-4.png" />
</p>

<p align="center">
Harry Potter and the Order of the Phoenix

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-5.png" />
</p>

<p align="center">
Harry Potter and the Half Blood Prince

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-6.png" />
</p>

<p align="center">
Harry Potter and the Deathly Hollows 1

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-7.png" />
</p>

<p align="center">
Harry Potter and the Deathly Hollows 2

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/harry-potter-8.png" />
</p>

<p align="center">
Star Wars I: A Phantom Menace

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-phantom-menace.png" />
</p>

<p align="center">
Star Wars II: Attack of the Clones

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-attack-of-the-clones.png" />
</p>

<p align="center">
Star Wars III: Revenge of the Sith

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-revenge-of-the-sith.png" />
</p>

<p align="center">
Star Wars IV: A new Hope

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-new-hope.png" />
</p>

<p align="center">
Star Wars V: The Empire Strikes back

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-empire-strikes-back.png" />
</p>

<p align="center">
Star Wars VI: Return of the Jedi

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-return-of-the-jedi.png" />
</p>

<p align="center">
Star Wars VII: Force Awakens

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-force-awakens.png" />
</p>

<p align="center">
Star Wars VIII: Last Jedi

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-last-jedi.png" />
</p>

<p align="center">
Star Wars - Rogue One

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-rogue-one.png" />
</p>

<p align="center">
Star Wars - Solo

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/star-wars-solo.png" />
</p>

<p align="center">
The Martian

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/themartian.png" />
</p>

<p align="center">
Sonic the Hedgehog (2020)

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/sonic.png" />
</p>

<p align="center">
Mulan (2020)

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/mulan2020.png" />
</p>

<p align="center">
Mortal Engines

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/mortalengines.png" />
</p>

<p align="center">
Lion King (2019)

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/lionking2019.png" />
</p>

<p align="center">
Hidden Figures

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/hiddenfigures.png" />
</p>

<p align="center">
Interstellar

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/interstellar.png" />
</p>

<p align="center">
Deadpool

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/deadpool.png" />
</p>

<p align="center">
Ex Machina

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/exmachina.png" />
</p>

<p align="center">
Glass

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/glass.png" />
</p>

<p align="center">
Grinch (2000)

<img src="https://raw.githubusercontent.com/lukasbach/movie-color-strip/master/examples/grinch.png" />
</p>