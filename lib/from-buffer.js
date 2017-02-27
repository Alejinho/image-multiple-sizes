/**
 * Created by alejandro on 12/02/17.
 */

'use strict';

const fileType = require('file-type');
const MIME_TYPES = ['image/png', 'image/jpeg'];
const PNG = 'png';
const JPG = 'jpg';

/**
 *
 * @property {Buffer} buffer
 */
function imageFromBuffer(buffer) {
  if (!(buffer instanceof Buffer)) {
    throw new Error('Parámetro invalido, debe ser un Buffer')
  }
  const type = fileType(buffer) || {};
  validateMime(type.mime);
  const tipo = type.mime === MIME_TYPES[0] ? PNG : JPG;
  return {
    buffer: buffer,
    mime: type.mime,
    tipo: tipo,
  }
}

/**
 *
 * @param mime
 */
function validateMime(mime) {
  if (!MIME_TYPES.includes(mime)) {
    throw new Error('El archivo no tiene un formato valido.')
  }
}

exports = module.exports = imageFromBuffer;
exports.MIME_TYPES = MIME_TYPES;
exports.JPG = JPG;
exports.PNG = PNG;