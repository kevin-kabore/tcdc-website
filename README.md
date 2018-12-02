# TVGla Boilerplate - README #
---

#Node.js and NPM
If you don't have Node.js and NPM installed you can download them here: [https://nodejs.org/en/](https://nodejs.org/en/)

You will only need to install this once and they will be installed system wide.  NPM is installed as part of Node.js so you should only need the one download.

#Initializing

If you need to do a global install of gulp type __npm install -g gulp__

Navigate to the project folder in Terminal and type __npm install__.  This will install all the packages listed below.

##Gulp
*Task automation tool*

[https://www.npmjs.com/package/gulp](https://www.npmjs.com/package/gulp)

# Gulp Plugins

## gulp-jshint
*Validates JavaScript*

[https://www.npmjs.com/package/gulp-jshint](https://www.npmjs.com/package/gulp-jshint)

## jshint-stylish
*Formats jshint error messages for easier readability with color coding and icons*

[https://www.npmjs.com/package/jshint-stylish](https://www.npmjs.com/package/jshint-stylish)

## gulp-htmlhint
*Validates HTML*

[https://www.npmjs.com/package/gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint)

## htmlhint-stylish
*Formats htmlhint error messages for easier readability with color coding and icons*

[https://www.npmjs.com/package/htmlhint-stylish](https://www.npmjs.com/package/htmlhint-stylish)

## gulp-sass
*Compiles SASS*

[https://www.npmjs.com/package/gulp-sass](https://www.npmjs.com/package/gulp-sass)

## gulp-autoprefixer
*Automatically add vendor prefixes to css properties*

[https://www.npmjs.com/package/gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

## gulp-useref
*Parse build blocks in HTML files to replace references to non-optimized scripts or stylesheets*

[https://www.npmjs.com/package/gulp-useref](https://www.npmjs.com/package/gulp-useref)

## gulp-uglify
*Minify JavaScript*

[https://www.npmjs.com/package/gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

## gulp-if
*Add conditional statements to gulp tasks*

[https://www.npmjs.com/package/gulp-if](https://www.npmjs.com/package/gulp-if)

## gulp-concat
*Concatenate files*

[https://www.npmjs.com/package/gulp-concat](https://www.npmjs.com/package/gulp-concat)

## gulp-cssnano
*Minify CSS*

[https://www.npmjs.com/package/gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)

## gulp-imagemin
*Minify PNG, JPEG, GIF and SVG images*

[https://www.npmjs.com/package/gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)

## gulp-cache
*Cache task results to save time on future builds*

[https://www.npmjs.com/package/gulp-cache](https://www.npmjs.com/package/gulp-cache)

## del
*Delete files and folders*

[https://www.npmjs.com/package/del](https://www.npmjs.com/package/del)

## run-sequence
*Run a series of dependent gulp tasks in order, for example the "sass" task must complete before the "css" task starts*

[https://www.npmjs.com/package/run-sequence](https://www.npmjs.com/package/run-sequence)

## gulp-sourcemaps
*Generate sourcemaps for minified and concatenated files*

[https://www.npmjs.com/package/gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)

## gulp-plumber
*Gracefully handle errors in the pipeline without killing watch tasks*

[https://www.npmjs.com/package/gulp-plumber](https://www.npmjs.com/package/gulp-plumber)

## gulp-notify
*Display error messages in the console from the plumber task*

[https://www.npmjs.com/package/gulp-notify](https://www.npmjs.com/package/gulp-notify)

---
# Available Gulp Tasks
*Any of these can be called in the terminal by typing "__gulp {task name}__", for example the css task could be called by typing "__gulp css__"*

## jsHint
*Validates all javascript files in the __src/js__ folder and reports any errors*

Use "__gulp jsHint__" to call this task.

## jsMinify
*Minifies all files in the __src/js__ folder and concatenates them into a single __main.min.js__ file in the __build/js__ folder*

Use "__gulp jsMinify__" to call this task.

## scripts
*Calls the __jsHint__ then __jsMinify__ tasks in that order*

Use "__gulp scripts__" to call this task.

## sass
*Compiles all __sass__ files in the __src/scss__ folder and puts the results into __src/css__*

Use "__gulp sass__" to call this task.

## css
*Removes all styles for selectors that aren't being used, adds vendor prefixes where necessary, minifies and concatenates all CSS files and generate a source map in the __build/css__ folder*

Use "__gulp css__" to call this task.

## styles
*Calls the __sass__ then __css__ tasks in that order*

Use "__gulp styles__" to call this task.

## watch
*Monitors all html, javascript, css and sass files for changes and automatically calls the __pages__, __styles__ and __scripts__ tasks as needed*

Use "__gulp watch__" to call this task.

## images
*Optimizes all __png__, __jpg__, __jpeg__, __gif__ and __svg__ files in the src/img folder and copies the optimized files into __build/img__, the results are cached so the same image won't be processed twice unless it changes*

Use "__gulp images__" to call this task.

## cache:clear
*Clears the cache from the __images__ task*

Use "__gulp cache:clear__" to call this task.

## fonts
*Copies all fonts from the __src/fonts__ folder to the __build/fonts__ folder*

Since font files are typically already optimized we don't perform any optimizations on them, we just copy them over to the build folder.

Use "__gulp fonts__" to call this task.

## media
*Copies all files from __src/media__ to __build/media__*

Use "__gulp media__" to call this task.

## htmlHint
*Validates all html files in the __src/__ folder and reports any errors*

Use "__gulp htmlHint__" to call this task.

## copyPages
*Copies all __html__ and __php__ files from the __src__ folder to the __build__ folder*

Use "__gulp copyPages__" to call this task.

## pages
*Calls the __htmlHint__ then __copyPages__ tasks in that order*

Use "__gulp pages__" to call this task.

## clean:build
*Deletes the __build__ folder so old files aren't held onto unnecessarily*

Use "__gulp clean:build__" to call this task.

## build
*Calls the tasks in this order __clean:build__, __sass__, __css__, __scripts__, __images__, __fonts__, __media__, __pages__*

Use "__gulp build__" to call this task.