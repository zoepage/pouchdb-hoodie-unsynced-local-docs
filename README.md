# pouchdb-hoodie-local-changes


This [PouchDB](http://pouchdb.com/) plugin provides simple methods to
check if local DB has unsynced changes.

## Usage

```js
// Initialisation

var db = new PouchDB('dbname')
var api = db.hoodieLocalChanges({remote: 'http://example.com/mydb'})

api.getLocalChanges()
.then(function(changes) {
  // changes is array of docs?
})

api.getLocalChanges('docid') // pass doc id
api.getLocalChanges({_id: 'docid'}) // pass doc with _id property
api.getLocalChanges(['docid', {_id: 'docid'}]) // array of IDs and objects
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
npm install --save pouchdb-hoodie-local-changes
````

#### Install via npm

````
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-hoodie-local-changes'))
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