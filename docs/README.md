# ${package}

A wrapper for the Apple Music API written in Node.js.

> **⚠️ Deprecated:** This project has been archived and is no longer actively maintained. For more information, see the [GitHub repository](https://github.com/Exerra/node-musickit-api).

## Quick Start

### Getting Keys

#### Registering an Identifier

First, register an identifier for MusicKit. Go [here](https://developer.apple.com/account/resources/identifiers/list) and create a Media ID. While identifiers are not directly used by this package, one is required in order to create a key.

#### Creating a Key

After registering the identifier, go [here](https://developer.apple.com/account/resources/authkeys/list) and create a key for Media services. The key must have at least MusicKit permissions.

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
 fs.writeFileSync('${package}-search.json', JSON.stringify(data, 0, 4))
}, 5)
```

For more details, refer to the rest of this documentation.