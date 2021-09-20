# node-musickit-api
A wrapper for the Apple Music API written in NodeJS

## Installation
Installation is easy! Just do `npm i node-musickit-api` (or `yarn add node-musickit-api` if you use the superior package manager) and enjoy!

## Usage
This section will detail various ways of using this package. A documentation website + better code examples coming soon :)

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