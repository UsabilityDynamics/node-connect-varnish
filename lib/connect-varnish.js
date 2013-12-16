/**
 * Connect connectVarnish Middleware
 *
 * @param options {Object}
 * @param options.name {String}
 * @param options.vcl {String}
 * @param options.static {String}
 * @param options.host {String}
 * @param options.port {String}
 * @param options.target {Object}
 * @param options.target.host {String}
 * @param options.target.port {Number}
 *
 * @returns {Function} requestHandler method.
 * @class connectVarnish
 * @constructor
 * @version 0.1.0
 */
function connectVarnish( options ) {

  // Force Instantiation.
  if( !( this instanceof connectVarnish ) ) {
    return connectVarnish.create( options || {} );
  }

  var express   = require( 'express' );
  var settings  = require( 'object-settings' );
  var emitter   = require( 'object-emitter' );
  var client    = require( 'varnish-client' );
  var format    = require( 'util' ).format;

  // Extend Instance Properties.
  var self = Object.defineProperties( this, {
    app: {
      /**
       * Middleware Application Instance.
       *
       * @property app
       */
      value: require( 'express' ).call(),
      enumerable: true,
      configurable: true,
      writable: true
    },
    options: {
      /**
       * Middleware Application Instance.
       *
       * @property options
       */
      value: settings.mixin( this ).set( this.utility.defaults( options || {}, connectVarnish.defaults ) ),
      enumerable: true,
      configurable: true,
      writable: true
    },
    emitter: {
      /**
       * Event Emitter.
       *
       * @property options
       */
      value: new emitter.mixin( this ),
      enumerable: true,
      configurable: true,
      writable: true
    },
    parent: {
      /**
       * Parent Application Instance.
       *
       * @property parent
       */
      value: undefined,
      enumerable: true,
      configurable: true,
      writable: true
    }
  });

  /**
   * Return Middleware Application Instance.
   *
   * @method requestHandler
   */
  return self.app.configure( function varnishApplication() {
    connectVarnish.debug( 'Configuring Middlware Application.' );

    // Instantiate Varnish Client.
    Object.defineProperties( this, {
      client: {
        /**
         * Varnish Client.
         *
         * @property varnishClient
         */
        value: client.create({ host: self.options.get( 'host' ), port: self.options.get( 'port' )}),
        enumerable: true,
        configurable: true,
        writable: true
      }
    });

    // Middleware Mounted to Parent Application.
    this.on( 'mount', function mounted( parent ) {
      connectVarnish.debug( 'Middleware mounted to parent.' );

      // To handle x- redirection-related headers.
      parent.set( 'trust proxy', true );

      // Extend Request Prototype.
      Object.defineProperties( parent.request, {
        purge: {
          /**
           * Purge Result.
           *
           * @todo Add purging for req.url.
           *
           */
          value: function purge() {},
          enumerable: true,
          configurable: true,
          writable: true
        }
      })

    });

    // Varnish Client Connection Failed..
    this.client.on( 'error', function clientError( error ) {
      connectVarnish.debug( 'Terminal connection error. [message:%s]', error.message );
    });

    // Varnish Client Connected.
    this.client.on( 'ready', function clientReady( error, client ) {
      connectVarnish.debug( 'Terminal connection established.' );

      //this.run_cmd( 'backend.list', console.log );

      var vcl = format( 'backend %s {.host = \\"%s\\"; .port = \\"%s\\"; }', self.utility.slug( self.get( 'name' ) ), self.get( 'target.host' ), self.get( 'target.port' ) );

      this.run_cmd( format( 'vcl.inline "%s" "%s"', self.utility.slug( self.get( 'name' ) ), vcl ), self.response );

      //this.run_cmd( 'help vcl', console.log );
      //this.run_cmd( 'status', console.log );
      //this.run_cmd( 'vcl.discard express', console.log );
      //this.run_cmd( 'vcl.use express', console.log );
      //console.log( vcl );
      //client.run_cmd('purge obj.http.X == test', function(){});

    });

    // Middleware.
    this.use( function varnishMiddleware( req, res, next ) {
      connectVarnish.debug( 'varnishMiddleware' );
      next();
    });

    // Enable Static Directory Middleware.
    if( self.get( 'static' ) ) {
      connectVarnish.debug( 'Adding static cache server. [%s].', self.get( 'static' ) );

      this.use( express.static( self.get( 'static' ), {
        maxAge: 0,
        hidden: false,
        redirect: true,
        index: 'index.html'
      }));

    }

  });

}

/**
 * Instance Properties
 *
 */
Object.defineProperties( connectVarnish.prototype, {
  response: {
    /**
     * Parse Command Responses.
     *
     * @param error
     * @param code
     * @param message
     */
    value: function response( error, code, message ) {
      connectVarnish.debug( 'Command Response: [%s].', message );

      // @chainable
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: false
  },
  utility: {
    /**
     * Middleware Application Instance.
     *
     * @property utility
     */
    value: require( './common/utility' ),
    enumerable: false,
    writable: false
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = connectVarnish, {
  debug: {
    /**
     * Debug Method.
     *
     * @method debug
     */
    value: require( 'debug' )( 'connect:varnish' ),
    enumerable: false,
    writable: false
  },
  version: {
    /**
     * Module Version.
     *
     * @method version
     */
    value: require( '../package' ).version,
    enumerable: true,
    writable: false
  },
  create: {
    /**
     * Create Instance
     *
     * @for connectVarnish
     */
    value: function create( options ) {
      return new connectVarnish( options || {} );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  defaults: {
    /**
     * Default Options.
     *
     * @for connectVarnish
     */
    value: {
      name: 'express',
      vcl: undefined,
      static: undefined,
      host: '127.0.0.1',
      port: 6082,
      target: {
        host: '127.0.0.1',
        port: 3000
      }
    },
    enumerable: false,
    configurable: true,
    writable: true
  }
});