'use strict'

var genReplicationId = require('pouchdb/extras/generateReplicationId')
var toId = require('./utils/to-id')
var toDoc = require('./utils/to-doc')

module.exports = unsyncedLocalDocs

/**
 * gets your unsynced docs in local DB if not synced to remote DB already
 *
 * @param  {String} docsOrIds   ID of object (optional)
 * @param  {Object} docsOrIds   object, array of objects (optional)
 * @return {Array}
 */

function unsyncedLocalDocs (options) {
  var localDB = this
  var remoteDB = new this.constructor(options.remote)
  var docsOrIds = options.keys
  var Promise = this.constructor.utils.Promise
  var errors = this.constructor.Errors

  if (Array.isArray(docsOrIds)) {
    docsOrIds = docsOrIds.map(toId)
  } else {
    docsOrIds = docsOrIds && [toId(docsOrIds)]
  }

  if (docsOrIds && docsOrIds.filter(Boolean).length !== docsOrIds.length) {
    return Promise.reject(errors.NOT_AN_OBJECT)
  }

  return genReplicationId(localDB, remoteDB, {})

  .then(function (replicationId) {
    return localDB.get(replicationId)
  })

  .then(function (localReplicationDoc) {
    return localReplicationDoc.last_seq
  })

  .catch(function () {
    // if there was no replication yet, localDB.get will fail with 404. In that case, we want return all docs, as non has been synchronised yet
    return 0
  })

  .then(function (seqNum) {
    return localDB.changes({
      since: seqNum,
      include_docs: true,
      doc_ids: docsOrIds
    })
  })

  .then(function (response) {
    return response.results.map(toDoc)
  })
}
