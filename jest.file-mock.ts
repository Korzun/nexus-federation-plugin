const path = require('path');

module.exports = {
  process(src: string, filename: string) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
