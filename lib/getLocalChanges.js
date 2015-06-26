'use strict'

var toId = require('./utils/to-id')

module.exports = getLocalChanges

/**
 * gets your localChanges if not synced to remote DB already
 *
 * @param  {String,Object} docsOrIds   object, ID of object or array of objects/ids (all optional)
 * @return {Promise}
 */

function getLocalChanges (state, options, docsOrIds) {
  var localChangesObjects = []
  var localDB = new this.constructor(options.local)
  var remoteDB = new this.constructor(options.remote)
  var Promise = this.constructor.utils.Promise
  var errors = this.constructor.Errors

  console.log('🙊  ' + docsOrIds)

  if (Array.isArray(docsOrIds)) {
    docsOrIds = docsOrIds.map(toId)
  } else {
    docsOrIds = docsOrIds && [toId(docsOrIds)]
  }

  if (docsOrIds && docsOrIds.filter(Boolean).length !== docsOrIds.length) {
    return Promise.reject(errors.NOT_AN_OBJECT)
  }

  console.log('🙊  ' + docsOrIds)

  return Promise.all([
      localDB.info().then(toSeq),
      remoteDB.info().then(toSeq)
  ])
  .then(function(args) {
    if(args[0] === args[1]) {
      return Promise.resolve([])
    } else {
      return Promise.resolve(args)
    }
  })
} 

function toSeq(info) {
  return info.update_seq
}

/*


*/
