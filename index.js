'use strict'

var exports = module.exports = {
  unsyncedLocalDocs: require('./lib/unsynced-local-docs')
}

/* istanbul ignore next */
if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(exports)
}
