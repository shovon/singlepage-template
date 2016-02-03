'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');
const uncss = require('uncss');

function minifyJS(code) {
  return UglifyJS.minify(code, {fromString: true}).code;
}

const publicPath = path.resolve(__dirname, 'public');
const htmlFilePath = path.resolve(publicPath, 'index.html');

const $ = cheerio.load(fs.readFileSync(htmlFilePath, 'utf8'));

const resourcesToDelete = [];

new Promise((resolve, reject) => {
  uncss([htmlFilePath], {}, (error, output) => {
    if (error) { reject(error); return; }
    resolve(output);
  });
}).then(css => {
  const miniCSS = new CleanCSS({
    keepSpecialComments: 0
  }).minify(css).styles;

  $('link[rel="stylesheet"][href]').each((i, el) => {
    const $el = $(el);
    resourcesToDelete.push(path.resolve(publicPath, $el.attr('href')));
    if (i === 0) {
      const styleTag = $('<style></style>');
      styleTag.html(miniCSS);
      $el.replaceWith(styleTag);
    } else {
      $el.remove();
    }
  });

  $('script[src]').each((i, el) => {
    const $el = $(el);
    const scriptPath = path.resolve(publicPath, $el.attr('src'));
    resourcesToDelete.push(scriptPath);
    const script = fs.readFileSync(scriptPath, 'utf8');
    $el.html(minifyJS(script));
    $el.removeAttr('src');
  });

  fs.writeFileSync(htmlFilePath, $.html());

  resourcesToDelete.forEach(function (resource) {
    fs.unlinkSync(resource);
  });
}, err => {
  console.error(err);
  process.exit(1);
});
