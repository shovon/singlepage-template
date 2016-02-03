const jade = require('jade');
const path = require('path');
const fs = require('fs');

const publicDir = path.resolve(__dirname, 'public');

const fn = jade.compileFile(path.resolve(__dirname, 'src/index.jade'), {
  pretty: process.env.NODE_ENV !== 'production'
});

fs.writeFileSync(path.resolve(publicDir, 'index.html'), fn({}));
