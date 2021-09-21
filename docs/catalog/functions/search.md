# Search function

So, this wonderful function lets you search for activities, albums, apple-curators, artists, curators, music-videos, playlists, record-labels, songs aaand stations using the Apple Music API.

## Requirements

As with any function, you are required to initialize ${package}. To find out how to do so, click [here](/initialization.md)

## How to use the function
So, first I will throw a code block and then explain it.

```js
MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", (err, data) => {
	if (err) return console.log(err)
	fs.writeFileSync('./test/test-search.json', JSON.stringify(data,0,4))
}, 5)
```

| Parameter        | Example                            | What it does                                                                                                                                                                                   |
|------------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront       | lv                                 | This is the storefront for catalog you want to search in                                                                                                                                       |
| Type             | songs                              | )This is the type of thing you want to search for. You can find the types [here](https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources)                          |
| Search query     | Ariana grande no tears left to cry | This is your search query                                                                                                                                                                      |
| Callback         | (err, data) => {}                  | This is the callback. First parameter is the error, second is the actual response The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song) |
| Limit (optional) | 5                                  | This is the amount of responses you want to get                                                                                                                                                |
