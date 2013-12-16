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
_$jscoverage_init(_$jscoverage, "lib/connect-varnish.js",[14,15,18,19,20,21,22,25,77,78,81,96,97,100,118,119,123,124,128,133,143,144,145,156,173,201]);
_$jscoverage_init(_$jscoverage_cond, "lib/connect-varnish.js",[14]);
_$jscoverage["lib/connect-varnish.js"].source = ["/**"," * Connect connectVarnish Middleware"," *"," * @param {Object} options"," * @returns {Function} requestHandler method."," *"," * @class connectVarnish"," * @constructor"," * @version 0.1.0"," */","function connectVarnish( options ) {","","  // Force Instantiation.","  if( !( this instanceof connectVarnish ) ) {","    return connectVarnish.create( options || {} );","  }","","  var express   = require( 'express' );","  var settings  = require( 'object-settings' );","  var emitter   = require( 'object-emitter' );","  var client    = require( 'varnish-client' );","  var format    = require( 'util' ).format;","","  // Extend Instance Properties.","  var self = Object.defineProperties( this, {","    app: {","      /**","       * Middleware Application Instance.","       *","       * @property app","       */","      value: require( 'express' ).call(),","      enumerable: true,","      configurable: true,","      writable: true","    },","    options: {","      /**","       * Middleware Application Instance.","       *","       * @property options","       */","      value: settings.mixin( this ).set( this.utility.defaults( options || {}, connectVarnish.defaults ) ),","      enumerable: true,","      configurable: true,","      writable: true","    },","    emitter: {","      /**","       * Event Emitter.","       *","       * @property options","       */","      value: new emitter.mixin( this ),","      enumerable: true,","      configurable: true,","      writable: true","    },","    parent: {","      /**","       * Parent Application Instance.","       *","       * @property parent","       */","      value: undefined,","      enumerable: true,","      configurable: true,","      writable: true","    }","  });","","  /**","   * Return Middleware Application Instance.","   *","   * @method requestHandler","   */","  return self.app.configure( function varnishApplication() {","    connectVarnish.debug( 'varnishApplication' );","","    // Instantiate Varnish Client.","    Object.defineProperties( this, {","      client: {","        /**","         * Varnish Client.","         *","         * @property varnishClient","         */","        value: client.create({ host: self.options.get( 'host' ), port: self.options.get( 'port' )}),","        enumerable: true,","        configurable: true,","        writable: true","      }","    });","","    // Middleware Mounted to Parent Application.","    this.on( 'mount', function mounted( parent ) {","      connectVarnish.debug( 'app:mount' );","","      // Extend Request Prototype.","      Object.defineProperties( parent.request, {","        purge: {","          /**","           * Purge Result.","           *","           * @todo Add purging for req.url.","           *","           */","          value: function purge() {},","          enumerable: true,","          configurable: true,","          writable: true","        }","      })","","    });","","    // Varnish Client Connection Failed..","    this.client.on( 'error', function clientError( error ) {","      connectVarnish.debug( ':error [%s]', error.message, self.options );","    });","","    // Varnish Client Connected.","    this.client.on( 'ready', function clientReady( error, client ) {","      connectVarnish.debug( ':ready' );","","      //this.run_cmd( 'backend.list', console.log );","","      var vcl = format( 'backend %s {.host = \\\\\"%s\\\\\"; .port = \\\\\"%s\\\\\"; }', self.utility.slug( self.get( 'name' ) ), self.get( 'target.host' ), self.get( 'target.port' ) );","","      //this.run_cmd( 'help vcl', console.log );","      //this.run_cmd( 'status', console.log );","      //this.run_cmd( 'vcl.discard express', console.log );","      this.run_cmd( format( 'vcl.inline \"%s\" \"%s\"', self.utility.slug( self.get( 'name' ) ), vcl ), console.log );","      //this.run_cmd( 'vcl.use express', console.log );","","      //console.log( vcl );","","      //client.run_cmd('purge obj.http.X == test', function(){});","","    });","","    // Middleware.","    this.use( function varnishMiddleware( req, res, next ) {","      connectVarnish.debug( 'varnishMiddleware' );","      next();","    });","","  });","","}","","/**"," * Instance Properties"," *"," */","Object.defineProperties( connectVarnish.prototype, {","  utility: {","    /**","     * Middleware Application Instance.","     *","     * @property utility","     */","    value: require( './common/utility' ),","    enumerable: false,","    writable: false","  }","});","","/**"," * Constructor Properties"," *"," */","Object.defineProperties( module.exports = connectVarnish, {","  debug: {","    /**","     * Debug Method.","     *","     * @method debug","     */","    value: require( 'debug' )( 'connect:varnish' ),","    enumerable: false,","    writable: false","  },","  version: {","    /**","     * Module Version.","     *","     * @method version","     */","    value: require( '../package' ).version,","    enumerable: true,","    writable: false","  },","  create: {","    /**","     * Create Instance","     *","     * @for connectVarnish","     */","    value: function create( options ) {","      return new connectVarnish( options || {} );","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  defaults: {","    /**","     * Default Options.","     *","     * @for connectVarnish","     */","    value: {","      name: 'express',","      vcl: undefined,","      host: '127.0.0.1',","      port: 6082,","      target: {","        host: '127.0.0.1',","        port: 3000","      }","    },","    enumerable: false,","    configurable: true,","    writable: true","  }","});"];
function connectVarnish(options) {
    _$jscoverage_done("lib/connect-varnish.js", 14);
    if (_$jscoverage_done("lib/connect-varnish.js", 14, !(this instanceof connectVarnish))) {
        _$jscoverage_done("lib/connect-varnish.js", 15);
        return connectVarnish.create(options || {});
    }
    _$jscoverage_done("lib/connect-varnish.js", 18);
    var express = require("express");
    _$jscoverage_done("lib/connect-varnish.js", 19);
    var settings = require("object-settings");
    _$jscoverage_done("lib/connect-varnish.js", 20);
    var emitter = require("object-emitter");
    _$jscoverage_done("lib/connect-varnish.js", 21);
    var client = require("varnish-client");
    _$jscoverage_done("lib/connect-varnish.js", 22);
    var format = require("util").format;
    _$jscoverage_done("lib/connect-varnish.js", 25);
    var self = Object.defineProperties(this, {
        app: {
            value: require("express").call(),
            enumerable: true,
            configurable: true,
            writable: true
        },
        options: {
            value: settings.mixin(this).set(this.utility.defaults(options || {}, connectVarnish.defaults)),
            enumerable: true,
            configurable: true,
            writable: true
        },
        emitter: {
            value: new emitter.mixin(this),
            enumerable: true,
            configurable: true,
            writable: true
        },
        parent: {
            value: undefined,
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    _$jscoverage_done("lib/connect-varnish.js", 77);
    return self.app.configure(function varnishApplication() {
        _$jscoverage_done("lib/connect-varnish.js", 78);
        connectVarnish.debug("varnishApplication");
        _$jscoverage_done("lib/connect-varnish.js", 81);
        Object.defineProperties(this, {
            client: {
                value: client.create({
                    host: self.options.get("host"),
                    port: self.options.get("port")
                }),
                enumerable: true,
                configurable: true,
                writable: true
            }
        });
        _$jscoverage_done("lib/connect-varnish.js", 96);
        this.on("mount", function mounted(parent) {
            _$jscoverage_done("lib/connect-varnish.js", 97);
            connectVarnish.debug("app:mount");
            _$jscoverage_done("lib/connect-varnish.js", 100);
            Object.defineProperties(parent.request, {
                purge: {
                    value: function purge() {},
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            });
        });
        _$jscoverage_done("lib/connect-varnish.js", 118);
        this.client.on("error", function clientError(error) {
            _$jscoverage_done("lib/connect-varnish.js", 119);
            connectVarnish.debug(":error [%s]", error.message, self.options);
        });
        _$jscoverage_done("lib/connect-varnish.js", 123);
        this.client.on("ready", function clientReady(error, client) {
            _$jscoverage_done("lib/connect-varnish.js", 124);
            connectVarnish.debug(":ready");
            _$jscoverage_done("lib/connect-varnish.js", 128);
            var vcl = format('backend %s {.host = \\"%s\\"; .port = \\"%s\\"; }', self.utility.slug(self.get("name")), self.get("target.host"), self.get("target.port"));
            _$jscoverage_done("lib/connect-varnish.js", 133);
            this.run_cmd(format('vcl.inline "%s" "%s"', self.utility.slug(self.get("name")), vcl), console.log);
        });
        _$jscoverage_done("lib/connect-varnish.js", 143);
        this.use(function varnishMiddleware(req, res, next) {
            _$jscoverage_done("lib/connect-varnish.js", 144);
            connectVarnish.debug("varnishMiddleware");
            _$jscoverage_done("lib/connect-varnish.js", 145);
            next();
        });
    });
}

_$jscoverage_done("lib/connect-varnish.js", 156);
Object.defineProperties(connectVarnish.prototype, {
    utility: {
        value: require("./common/utility"),
        enumerable: false,
        writable: false
    }
});

_$jscoverage_done("lib/connect-varnish.js", 173);
Object.defineProperties(module.exports = connectVarnish, {
    debug: {
        value: require("debug")("connect:varnish"),
        enumerable: false,
        writable: false
    },
    version: {
        value: require("../package").version,
        enumerable: true,
        writable: false
    },
    create: {
        value: function create(options) {
            _$jscoverage_done("lib/connect-varnish.js", 201);
            return new connectVarnish(options || {});
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    defaults: {
        value: {
            name: "express",
            vcl: undefined,
            host: "127.0.0.1",
            port: 6082,
            target: {
                host: "127.0.0.1",
                port: 3e3
            }
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
});