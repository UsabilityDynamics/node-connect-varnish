/**
 * Utility Methods
 *
 * @class Utility
 * @constructor
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

/**
 * Utility Properties.
 *
 */
Object.defineProperties( module.exports = Utility, {
  defaults: {
    value: require( 'lodash' ).defaults,
    enumerable: true,
    configurable: true,
    writable: true
  },
  slug: {
    /**
     * Generate Slug.
     *
     * @param data
     * @returns {s|*}
     */
    value: function slug( data ) {
      return require( 'string' )( data ).stripPunctuation().underscore().s;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  noop: {
    /**
     * Placeholder Method
     *
     * @for Utility
     * @method noop
     */
    value: function noop() {},
    enumerable: true,
    configurable: true,
    writable: true
  }
});