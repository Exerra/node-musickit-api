# ${package}

A wrapper for the Apple Music API written in Node.js.

> **⚠️ Deprecated:** This project has been archived and is no longer actively maintained. For more information, see the [GitHub repository](https://github.com/Exerra/node-musickit-api).

> **Note:** This is the documentation for v1.x.x. For the latest version, see the [v2.x.x documentation](/).

## Quick Start

### Installation

```bash
npm install ${package}
# or
yarn add ${package}
```

### Basic Usage

```js
const MusicKit = require('${package}')
const fs = require('fs')

var music = new MusicKit({
  key: fs.readFileSync('apple_private_key.p8').toString(),
  teamId: "", // Your developer account's team ID
  keyId: ""   // Your key's ID
})

MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", (err, data) => {
 if (err) return console.log(err)
 fs.writeFileSync('./test/test-search.json', JSON.stringify(data, 0, 4))
}, 5)
```

For more details, refer to the rest of this documentation.