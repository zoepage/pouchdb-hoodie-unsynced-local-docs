var test = require('tape')
var dbFactory = require('../utils/db')

/* create if db does not exist, ping if exists or created */
test('db.unsyncedLocalDocs() resolves with array', function (t) {
  t.plan(1)
  var db = dbFactory()

  db.put({_id: 'test'})

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB2', keys: ''})
  })

  .then(function (docs) {
    t.ok(Array.isArray(docs), 'resolves array')
  })
})

test('db.unsyncedLocalDocs()', function (t) {
  t.plan(4)
  var db = dbFactory('LCDB1')

  var localObj1 = {_id: 'test1', foo: 'bar1'}
  var localObj2 = {_id: 'test2', foo: 'bar2'}
  var localObj3 = {_id: 'test3', foo: 'bar3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB2', keys: ''})
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

test('db.unsyncedLocalDocs(), sync before check', function (t) {
  t.plan(2)
  var db = dbFactory('LCDB3')
  var db2 = dbFactory('LCDB4')

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB4', keys: ''})
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 3, '3 local changes detected, before sync')
  })

  .then(function () {
    return db.sync(db2)
  })

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB4', keys: ''})
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 0, 'no local changes detected, after sync')
  })
})

test('db.unsyncedLocalDocs(string)', function (t) {
  t.plan(1)
  var db = dbFactory('LCDB5')

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB6', keys: 'test2'})
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 1, '1 local changes detected with _id:"test2"')
  })
})

test('db.unsyncedLocalDocs(obj)', function (t) {
  t.plan(1)
  var db = dbFactory('LCDB7')

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB8', keys: localObj1})
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 1, '1 local changes detected with _id:"test1"')
  })
})

test('api.unsyncedLocalDocs([obj1, id2])', function (t) {
  t.plan(1)
  var db = dbFactory('LCDB9')

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB10', keys: [localObj3, 'test2']})
  })

  .then(function (changedDocs) {
    t.equal(changedDocs.length, 2, '2 local changes detected for [obj, id]')
  })
})

test('api.unsyncedLocalDocs([obj1, undefined]), ', function (t) {
  t.plan(1)
  var db = dbFactory('LCDB9')

  var localObj1 = {_id: 'test1'}
  var localObj2 = {_id: 'test2'}
  var localObj3 = {_id: 'test3'}

  db.bulkDocs([localObj1, localObj2, localObj3])

  .then(function () {
    return db.unsyncedLocalDocs({remote: 'LCDB10', keys: [localObj3, undefined]})
  })

  .catch(function () {
    t.pass('object is undefined and get fails')
  })
})
