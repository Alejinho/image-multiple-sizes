/**
 * Created by alejandro on 12/02/17.
 */

let index = require('../');

describe('Deberia almacenar las imagenes redimensionadas correctamente', function() {

  it('Deberia tomar una imagen donde el ancho es mayor', function(done) {

    index(__dirname + '/images/src/480x320.jpg', __dirname + '/images/output/1')
      .then(() => {
        done()
      })
      .catch(err => done(err))

  });

  it('Deberia tomar una imagen donde el alto es mayor', function(done) {

    index(__dirname + '/images/src/600x300.jpg', __dirname + '/images/output/2')
      .then(() => {
        done()
      })
      .catch(err => done(err))
  });

  it('Deberia tomar una imagen de 1920x1080', function(done) {

    index(__dirname + '/images/src/1920x1080.jpg', __dirname + '/images/output/3')
      .then(() => {
        done()
      })
      .catch(err => done(err))
  })

});