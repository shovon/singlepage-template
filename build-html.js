const jade = require('jade');
const path = require('path');
const fs = require('fs');

const fn = jade.compileFile(path.resolve(__dirname, 'src/index.jade'), {
  pretty: process.env.NODE_ENV !== 'production'
});

fs.writeFileSync(path.resolve(__dirname, 'public/index.html'), fn({}));
