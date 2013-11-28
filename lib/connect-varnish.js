/*
 * connect-varnish
 * http://github.com/UsabilityDynamics/node-connect-varnish
 *
 * @class connect-varnish
 * @constructor
 * @version 0.1.0
 */
function Varnish() {

  // Force new instance.
  if( !( this instanceof Varnish ) ) {
    return new Varnish( arguments[0], arguments[1] );
  }

  var settings  = 'object' === typeof arguments[0] ? arguments[0] : {};
  var callback  = 'function' === typeof arguments[1] ? arguments[1] : Varnish.utility.noop;
  var self      = this;

  // @chainable
  return this;

}

/**
 * Instance Properties
 *
 */
Object.defineProperties( Varnish.prototype, {
  some_action: {
    /**
     * Some Actions
     *
     * @for connect-varnish
     */
    value: function some_action() {},
    enumerable: true,
    configurable: true,
    writable: true
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Varnish, {
  utility: {
    value: require( './utility' ),
    enumerable: false,
    writable: false
  },
  create: {
    /**
     * Create Instance
     *
     * @for connect-varnish
     */
    value: function create() {},
    enumerable: true,
    configurable: true,
    writable: true
  }
});