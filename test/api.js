/**
 * API Tests
 *
 *
 */
module.exports = {

  'Connect Varnish': {

    'returns expected methods': function () {

      var cVarnish = require( '../' );

      cVarnish.should.have.property( 'debug' );
      cVarnish.should.have.property( 'create' );
      cVarnish.should.have.property( 'version' );
      cVarnish.should.have.property( 'defaults' );
      cVarnish.should.have.property( 'prototype' );
      cVarnish.prototype.should.have.property( 'response' );
      cVarnish.prototype.should.have.property( 'utility' );

    }

  }

}