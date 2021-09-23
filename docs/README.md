# ${package}
A wrapper for the Apple Music API written in NodeJS

## Quick start

### Installation
Installation is easy! Just do `npm i ${package}` (or `yarn add ${package}` if you use the superior package manager) and enjoy!

### Actually using ${package}

Here is a quick example that should get you up and running in no time!
```js
const MusicKit = require('${package}')
const fs = require('fs')

var music = new MusicKit({
  key: fs.readFileSync('apple_private_key.p8').toString(), // Reads your private key
  teamId: "", // This is your developer account's team ID
  keyId: "" // This is the keys ID
})

MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", (err, data) => {
 if (err) return console.log(err)
 fs.writeFileSync('${package}-search.json', JSON.stringify(data,0,4))
}, 5)
```
To learn more about what all of this does, read the documentation!

## TODO
This section will focus on things that are in my TODO

### Adding personalized routes
Currently ${package} doesn't support personalized routes (api.music.apple.com/v1/me)

It is going to require quite some work to support those routes, but I am certain I could pull it off