# Search Function

The search function allows you to query for activities, albums, apple-curators, artists, curators, music-videos, playlists, record-labels, songs, and stations using the Apple Music API.

## Requirements

Initialize the package with `${package}/promises` (instead of `${package}`). See the [Initialization](/initialization.md) guide.

## Usage

```js
MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", 5)
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

| Parameter        | Example                            | Description                                                                                                                                                                                   |
|------------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront       | lv                                 | The storefront for the catalog you want to search in                                                                                                                                       |
| Type             | songs                              | The type of resource to search for. See available types [here](https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources)                          |
| Search query     | Ariana grande no tears left to cry | The search query string                                                                                                                                                                      |
| Limit (optional) | 5                                  | Maximum number of results to return                                                                                                                                                |
