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

db.unsyncedLocalDocs({remote: 'http://example.com/mydb', keys: ''})
.then(function(changes) {
  // returns array of unsynced local docs
})

db.unsyncedLocalDocs({remote: 'http://example.com/mydb', keys: 'docid'}) // pass doc id
db.unsyncedLocalDocs({remote: 'http://example.com/mydb', keys: {_id: 'docid'}}) // pass doc with _id property
db.unsyncedLocalDocs({remote: 'http://example.com/mydb', keys: ['docid', {_id: 'docid'}]}) // array of IDs and objects
```

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