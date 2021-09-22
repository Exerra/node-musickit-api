# Search function

So, this wonderful function lets you search for activities, albums, apple-curators, artists, curators, music-videos, playlists, record-labels, songs aaand stations using the Apple Music API.

## Requirements

So as with any promise function, you need to initialize it with `${package}/promises` (instead of `${package}`. Find out about how to initialize [here](/initialization.md)

## How to use the function
So, first I will throw a code block and then explain it.

```js
MusicKit.search("lv", "songs", "Ariana grande no tears left to cry", 5)
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

| Parameter        | Example                            | What it does                                                                                                                                                                                   |
|------------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront       | lv                                 | This is the storefront for catalog you want to search in                                                                                                                                       |
| Type             | songs                              | This is the type of thing you want to search for. You can find the types [here](https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources)                          |
| Search query     | Ariana grande no tears left to cry | This is your search query                                                                                                                                                                      |
| Limit (optional) | 5                                  | This is the amount of responses you want to get                                                                                                                                                |
