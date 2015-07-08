# pouchdb-hoodie-unsynced-local-docs

[![Build Status](https://travis-ci.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs.svg?branch=master)](https://travis-ci.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs)
[![Coverage Status](https://coveralls.io/repos/hoodiehq/pouchdb-hoodie-unsynced-local-docs/badge.svg?branch=master&service=github)](https://coveralls.io/github/hoodiehq/pouchdb-hoodie-unsynced-local-docs?branch=master)
[![Dependency Status](https://david-dm.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs.svg)](https://david-dm.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs)
[![devDependency Status](https://david-dm.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs/dev-status.svg)](https://david-dm.org/hoodiehq/pouchdb-hoodie-unsynced-local-docs#info=devDependencies)

[![NPM](https://nodei.co/npm/pouchdb-hoodie-unsynced-local-docs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pouchdb-hoodie-unsynced-local-docs/)

This [PouchDB](http://pouchdb.com/) plugin provides simple methods to
check if local DB has unsynced changes.

## Usage

```js
// Initialisation

var db = new PouchDB('dbname')
var api = db.unsyncedLocalDocs({remote: 'http://example.com/mydb'})

api.unsyncedLocalDocs()
.then(function(changes) {
  // changes is array of docs?
})

api.unsyncedLocalDocs('docid') // pass doc id
api.unsyncedLocalDocs({_id: 'docid'}) // pass doc with _id property
api.unsyncedLocalDocs(['docid', {_id: 'docid'}]) // array of IDs and objects
```

## Approach
1. we know localDb, but not the state of remoteDB when we are offline
2. update_seq(for localDb/remoteDb) + get `_local/` ids for both, 1-time replication & continuous replication*
3. localDb/_changes?since=<seq>
4. if it returns anything: there are changes

hint: 
* `https://github.com/pouchdb/pouchdb/blob/master/lib/replicate/genReplicationId.js`

## Installation

#### With browserify or on node.js/io.js

Attach this plugin to the PouchDB object: 
````
npm install --save pouchdb
npm install --save pouchdb-hoodie-unsynced-local-docs
````

#### Install via npm

````
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-hoodie-unsynced-local-docs'))
````

<!--
### In the browser

```html
<script src="pouchdb.js"></script>
<script src="pouchdb-hoodie-local-changes.js"></script>
```

### In node.js

```js
var PouchDB = require('pouchdb')
PouchDB.plugin( require('pouchdb-hoodie-local-changes') )
```

## Testing

### In Node.js

Run all tests and validates JavaScript Code Style using [standard](https://www.npmjs.com/package/standard)

```
npm test
```

To run only the tests

```
npm run test:node
```
-->
## Contributing

Have a look at the Hoodie project's [contribution guidelines](https://github.com/hoodiehq/hoodie-dotfiles/blob/master/static/CONTRIBUTING.md).
If you want to hang out you can join #hoodie-pouch on our [Hoodie Community Slack](http://hood.ie/chat/).