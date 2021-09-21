# node-musickit-api
A wrapper for the Apple Music API written in NodeJS

## Installation
Installation is easy! Just do `npm i node-musickit-api` (or `yarn add node-musickit-api` if you use the superior package manager) and enjoy!

## Usage
This section will detail various ways of using this package. A documentation website + better code examples coming soon :)

### Initializing
This package needs to be initialized using a constructor.
To do so, you can do 
```js
const MusicKit = require('node-musickit-api')
const fs = require('fs)

var music = new MusicKit({
  key: fs.readFileSync('apple_private_key.p8').toString(), // Reads your private key
  teamId: "", // This is your developer account's team ID
  keyId: "" // This is the keys ID
})
```

### Searching
To search using keywords you can do

```js
MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", (err, data) => {
 if (err) return console.log(err)
 fs.writeFileSync('./test/test-search.json', JSON.stringify(data,0,4))
}, 5)
```
The first parameter ("lv") is the storefront. You can learn more on [Apple's documentation](https://developer.apple.com/documentation/applemusicapi/storefronts_and_localization)

Second parameter is the *type* to search. Learn more about types on [searching_for_catalog_resources](https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources)

Third is, of course, the search query. Nothing to explain here, right?

Fourth is the callback

Fifth is the limit. It defaults to 1, but you can set it to your hearts content (provided it is only 1-25)

### Getting [blank] by id

To get a song, album, music video or artist by ID you can do

```js
MusicKit.getSong("lv", "1399202959", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

As always, the first parameter is the storefront ([read more here](https://developer.apple.com/documentation/applemusicapi/storefronts_and_localization)), second is the ID of the thing you want to search and third is the callback.

Currently supported "get by ID" functions are:

* getSong()

* getAlbum()

* getMusicVideo()

* getArtist()

## Things to come

This section will focus on things that will soon come!

### Better documentation

Better documentation will ensure developers will have a better time understanding how to use this package. My goal is to create a website using [docsify](https://docsify.js.org) and (hopefully) get an musickit.js.org domain

### Searching by ISRC

My goal with this is to add methods that lets developers search for songs using their ISRC number.