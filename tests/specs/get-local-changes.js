var test = require('tape')
var dbFactory = require('../utils/db')

/* create if db does not exist, ping if exists or created */
test('api.getLocalChanges() creates new db', function (t) {
  t.plan(2)
  var db = dbFactory()
  var PouchDB = db.constructor
  var remoteName = PouchDB.utils.uuid(10)
  var api = db.hoodieLocalChanges({remote: 'LCDB2'})

  db.put({_id: 'test'})

  .then(function () {
    return api.getLocalChanges()
  })

  .then(function () {
    return dbFactory(remoteName).info()
  })

  .then(function (info) {
    t.equal(info.db_name, remoteName, 'remote db exists')
    t.is(typeof api.getLocalChanges, 'function', 'has method')
  })
})

test('getLocalChanges()', function (t) {
  t.plan(4)
  var db1 = dbFactory('LCDB1')
  var api = db1.hoodieLocalChanges({remote: 'LCDB2'})

  var localObj1 = {_id: 'test1', foo: 'bar1'}
  var localObj2 = {_id: 'test2', foo: 'bar2'}
  var localObj3 = {_id: 'test3', foo: 'bar3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return api.getLocalChanges()
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 3, 'local changes detected, 3 docs')
    var ids = [
                changedDocs[0].foo,
                changedDocs[1].foo,
                changedDocs[2].foo
              ].sort()

    t.equal(ids[0], 'bar1', 'changedDocs[0].foo match')
    t.equal(ids[1], 'bar2', 'changedDocs[1].foo match')
    t.equal(ids[2], 'bar3', 'changedDocs[2].foo match')
  })
})

test('getLocalChanges(), sync before check', function (t) {
  t.plan(2)
  var db1 = dbFactory('LCDB3')
  var db2 = dbFactory('LCDB4')
  var api = db1.hoodieLocalChanges({remote: 'LCDB4'})

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return api.getLocalChanges()
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 3, '3 local changes detected, before sync')
  })

  .then(function () {
    return db1.sync(db2)
  })

  .then(function () {
    return api.getLocalChanges()
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 0, 'no local changes detected, after sync')
  })
})

test('getLocalChanges(string)', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB5')
  var api = db1.hoodieLocalChanges({remote: 'LCDB6'})

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return api.getLocalChanges('test2')
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 1, '1 local changes detected with _id:"test2"')
  })
})

test('getLocalChanges(obj)', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB7')
  var api = db1.hoodieLocalChanges({remote: 'LCDB8'})

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return api.getLocalChanges(localObj1)
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 1, '1 local changes detected with _id:"test1"')
  })
})

test('getLocalChanges([obj1, id2])', function (t) {
  t.plan(1)
  var db1 = dbFactory('LCDB9')
  var api = db1.hoodieLocalChanges({remote: 'LCDB10'})

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db1.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return api.getLocalChanges([localObj3, 'test2'])
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 2, '2 local changes detected for [obj, id]')
  })
})
