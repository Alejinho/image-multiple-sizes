/**
 * Created by alejandro on 12/02/17.
 */

'use strict';

const lwip = require('lwip-promise');
const join = require('path').join;
const optimize = require('./optimize-images');
const asyncLoop = require('node-async-loop');


const sizes = {
  max: {
    width: 1280,
    height: 720,
  },
  standard: {
    width: 640,
    height: 480,
  },
  high: {
    width: 480,
    height: 360,
  },
  medium: {
    width: 320,
    height: 180,
  },
  default: {
    width: 120,
    height: 90,
  },
};

module.exports = function({buffer, path, type, output}) {
  let params = [buffer || path];
  if (buffer) {
    params.push(type);
  }
  return lwip.openAsync.apply(null, params)
    .then(image => {
      let sizes = obtenerMedidas(image.width(), image.height());
      return processImages(sizes, image, output);
    })
};

function processImages(sizes, image, baseDir) {
  let paths = {};
  let promises = [];
  for (let index in sizes) {
    if (!sizes.hasOwnProperty(index)) {
      continue;
    }
    let item = sizes[index];
    let name = `${index}.png`;
    let promise = resizeAndWrite(
      join(baseDir, name),
      image,
      item.width,
      item.height
    );
    paths[index] = {
      url: name,
      width: item.width,
      height: item.height,
    };
    promises.push(promise)
  }
  Promise.all(promises).then(() => optimize(baseDir));

  return paths;
}

function resizeAndWrite(path, image, width, height) {
  return image.batch()
    .resize(width, height, 'lanczos')
    .writeFileAsync(path, 'png')
}

function obtenerMedidas(width, height) {
  let orientation = width > height ? 'width' : 'height';
  let toCompare = width > height ? width : height;
  let dimensions = [];
  let flag = false;
  for (let index in sizes) {
    if (!sizes.hasOwnProperty(index)) {
      continue;
    }
    let item = sizes[index][orientation];
    if (!flag && item <= toCompare) {
      flag = true;
    }
    if (flag) {
      let percentage = sizes[index][orientation] / toCompare;
      dimensions[index] = {
        width: percentage * width,
        height: percentage * height,
      }
    }
  }
  return dimensions;
}