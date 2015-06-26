'use strict'

var exports = module.exports = { hoodieLocalChanges: hoodieLocalChanges }
var EventEmitter = require('events').EventEmitter

function hoodieLocalChanges (options) {
  var state = {
    emitter: new EventEmitter()
  }

  return {
    db: this,
    getLocalChanges: require('./lib/getLocalChanges').bind(this, state, options)
  }
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports)
}
