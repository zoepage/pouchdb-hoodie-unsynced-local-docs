'use strict'

var exports = module.exports = { unsyncedLocalDocs: unsyncedLocalDocs }
var EventEmitter = require('events').EventEmitter

function unsyncedLocalDocs (options) {
  var state = {
    emitter: options && options.emitter || new EventEmitter()
  }

  return require('./lib/unsynced-local-docs').call(this, state, options)
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports)
}
