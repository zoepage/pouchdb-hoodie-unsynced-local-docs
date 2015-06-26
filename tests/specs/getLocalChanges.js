var test = require('tape')
var dbFactory = require('../utils/db')

/* create if db does not exist, ping if exists or created */
test('api.getLocalChanges() creates new db', function (t) {
  t.plan(1)
  var db = dbFactory()
  var PouchDB = db.constructor
  var remoteName = PouchDB.utils.uuid(10)
  var api = db.hoodieLocalChanges({local: 'LCDB1',remote: 'LCDB2'})

  db.put({_id: 'test'})

  .then(function () {
    return api.getLocalChanges()
  })

  .then(function () {
    return dbFactory(remoteName).info()
  })

  .then(function (info) {
    t.equal(info.db_name, remoteName, 'remote db exists 🚀   🚀   🚀')
  })
})

test('getLocalChanges()', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB1')
  var db2 = dbFactory('LCDB2')
  var PouchDB = db1.constructor
  var remoteName = PouchDB.utils.uuid(10)
  var api = db1.hoodieLocalChanges({local: 'LCDB1',remote: 'LCDB2'})

  var localObj1 = {_id: 'test1', foo1: 'bar1'}
  var localObj2 = {_id: 'test2', foo1: 'bar2'}
  var localObj3 = {_id: 'test3', foo1: 'bar3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])
  .then(function () {
    return api.getLocalChanges()
  })
  .then(function (arr) {
    t.equal(arr[0] > arr[1], true, 'local changes detected')
  })
})

test('getLocalChanges(), synced', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB3')
  var db2 = dbFactory('LCDB4')
  var PouchDB = db1.constructor
  var remoteName = PouchDB.utils.uuid(10)
  var api = db1.hoodieLocalChanges({local: 'LCDB3',remote: 'LCDB4'})

  var localObj1 = {_id: 'test1', foo1: 'bar1'}
  var localObj2 = {_id: 'test2', foo1: 'bar2'}
  var localObj3 = {_id: 'test3', foo1: 'bar3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db1.replicate.to(db2)
  })
  .then(function () {
    return api.getLocalChanges()
  })
  .then(function (arr) {
    t.equal(arr.length, 0, 'no local changes')
  })
  .catch(
    console.log.bind(console)
  )
})

test('getLocalChanges(string)', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB1')
  var db2 = dbFactory('LCDB2')
  var PouchDB = db1.constructor
  var remoteName = PouchDB.utils.uuid(10)
  var api = db1.hoodieLocalChanges({local: 'LCDB1',remote: 'LCDB2'})

  var localObj1 = {_id: 'test1', foo1: 'bar1'}
  var localObj2 = {_id: 'test2', foo1: 'bar2'}
  var localObj3 = {_id: 'test3', foo1: 'bar3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])
  .then(function () {
    return api.getLocalChanges('test2')
  })
  .then(function (arr) {
    console.log(arr[0])
    t.equal(arr[0] > arr[1], true, 'local changes detected')
  })
})
