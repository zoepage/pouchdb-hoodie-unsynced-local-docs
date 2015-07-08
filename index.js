'use strict'

var exports = module.exports = { unsyncedLocalDocs: unsyncedLocalDocs }
var EventEmitter = require('events').EventEmitter

function unsyncedLocalDocs (options) {
  var state = {
    emitter: new EventEmitter()
  }

  return {
    db: this,
    unsyncedLocalDocs: require('./lib/unsynced-local-docs').bind(this, state, options)
  }
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports)
}
