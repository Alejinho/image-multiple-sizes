/**
 * Created by alejandro on 12/02/17.
 */

'use strict';

const lwip = require('lwip-promise');
const init = require('./init-lwip');
const fromBuffer = require('./from-buffer');

module.exports = function(source, outputDir) {
  if (typeof source === 'string' || source instanceof lwip) {
    return init({
      output: outputDir,
      path: source,
    });
  }
  if (source instanceof Buffer) {
    let imagen = fromBuffer(source);
    return init({
      output: outputDir,
      buffer: imagen.buffer,
      type: imagen.tipo,
    });
  }

  throw new TypeError(
    'El parámetro indicado debe ser del tipo: ' +
    'string (path del archivo), Buffer o un procesado por lwip'
  );
};