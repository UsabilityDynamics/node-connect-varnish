/*
 * Connect Varnish Middleware
 *
 * http://github.com/UsabilityDynamics/node-connect-rpc
 *
 * @param {Object} options
 * @returns {Function} requestHandler method.
 *
 * @class Varnish
 * @constructor
 * @version 0.1.0
 */
function Varnish( options ) {

  // Force Instantiation.
  if( !( this instanceof Varnish ) ) {
    return Varnish.create( options || {} );
  }

  // Extend Instance Properties.
  var _self = Object.defineProperties( this, {
    options: {
      value: this.utility.defaults( options || {}, Varnish.defaults ),
      enumerable: true,
      configurable: true,
      writable: true
    }
  });

  /**
   * Handle Request.
   *
   * @method requestHandler
   */
  return function requestHandler( req, res, next ) {
    // Varnish.debug( 'requestHandler' );
    next();
  };

}

/**
 * Varnish Instance Properties
 *
 */
Object.defineProperties( Varnish.prototype, {
  utility: {
    value: require( './common/utility' ),
    enumerable: false,
    writable: false
  }
});

/**
 * Varnish Constructor Properties
 *
 */
Object.defineProperties( module.exports = Varnish, {
  debug: {
    value: require( 'debug' )( 'connect:varnish' ),
    enumerable: false,
    writable: false
  },
  create: {
    /**
     * Create Instance
     *
     * @for Varnish
     */
    value: function create( options ) {
      // Varnish.debug( 'create' );
      return new Varnish( options || {} );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  defaults: {
    /**
     * Default Options.
     *
     * @for Varnish
     */
    value: {
      "version": require( '../package' ).version
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});