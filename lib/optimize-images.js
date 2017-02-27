/**
 * Created by alejandro on 21/01/17.
 */

const spawn = require('child_process').spawn;

module.exports = (path, quality = 5) => {
  if (quality > 7 || quality < 0) {
    throw new RangeError('La cualidad se debe especificar entre 0 y 7');
  }
  return new Promise((f, r) => {
    let process = spawn('optipng', ['-o', quality.toString(), path]);
    process.stderr.on('data', err => r(err));
    process.on('close', () => f())
  })
};