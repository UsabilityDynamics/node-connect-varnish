// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "lib/common/utility.js",[8,15,30]);
_$jscoverage_init(_$jscoverage_cond, "lib/common/utility.js",[]);
_$jscoverage["lib/common/utility.js"].source = ["/**"," * Utility Methods"," *"," * @class Utility"," * @constructor"," */","function Utility() {","  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;","}","","/**"," * Utility Properties."," *"," */","Object.defineProperties( module.exports = Utility, {","  defaults: {","    value: require( 'lodash' ).defaults,","    enumerable: true,","    configurable: true,","    writable: true","  },","  slug: {","    /**","     * Generate Slug.","     *","     * @param data","     * @returns {s|*}","     */","    value: function slug( data ) {","      return require( 'string' )( data ).stripPunctuation().underscore().s;","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  noop: {","    /**","     * Placeholder Method","     *","     * @for Utility","     * @method noop","     */","    value: function noop() {},","    enumerable: true,","    configurable: true,","    writable: true","  }","});"];
function Utility() {
    _$jscoverage_done("lib/common/utility.js", 8);
    return Object.keys(arguments) ? require("lodash").pick.apply(null, [ Utility, Array.prototype.slice.call(arguments) ]) : Utility;
}

_$jscoverage_done("lib/common/utility.js", 15);
Object.defineProperties(module.exports = Utility, {
    defaults: {
        value: require("lodash").defaults,
        enumerable: true,
        configurable: true,
        writable: true
    },
    slug: {
        value: function slug(data) {
            _$jscoverage_done("lib/common/utility.js", 30);
            return require("string")(data).stripPunctuation().underscore().s;
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    noop: {
        value: function noop() {},
        enumerable: true,
        configurable: true,
        writable: true
    }
});