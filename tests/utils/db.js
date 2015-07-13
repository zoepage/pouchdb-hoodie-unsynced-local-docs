'use strict'

var PouchDB = require('pouchdb').defaults({
  db: require('memdown')
})

if (!PouchDB.prototype.unsyncedLocalDocs) PouchDB.plugin(require('../../'))

module.exports = function (name) {
  name = name || uniqueName()

  return new PouchDB(name)
}

var uniqueNr = 0
function uniqueName () {
  uniqueNr += 1
  return 'db-' + uniqueNr
}
