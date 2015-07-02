'use strict'

module.exports = toDoc

/**
 * It's an internal method. It gives back the local docs, which have not been synced yet.
 *
 * @param  {String, Object} toDoc
 * @return {Promise}
 */

function toDoc (result) {
  return result.doc
}
