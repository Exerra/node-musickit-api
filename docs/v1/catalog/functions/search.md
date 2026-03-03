# Search Function

The search function allows you to query for activities, albums, apple-curators, artists, curators, music-videos, playlists, record-labels, songs, and stations using the Apple Music API.

## Requirements

You must first initialize ${package}. See the [Initialization](/initialization.md) guide.

## Usage

```js
MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", (err, data) => {
	if (err) return console.log(err)
	fs.writeFileSync('./test/test-search.json', JSON.stringify(data,0,4))
}, 5)
```

| Parameter        | Example                            | Description                                                                                                                                                                                   |
|------------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront       | lv                                 | The storefront for the catalog you want to search in                                                                                                                                       |
| Type             | songs                              | The type of resource to search for. See available types [here](https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources)                          |
| Search query     | Ariana grande no tears left to cry | The search query string                                                                                                                                                                      |
| Callback         | (err, data) => {}                  | Callback function. The first parameter is the error, the second is the response. See the response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song) |
| Limit (optional) | 5                                  | Maximum number of results to return                                                                                                                                                |
