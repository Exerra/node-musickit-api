# Get by ID
This section focuses on how to get songs, albums, music videos and artists by their Apple Music ID's

All of the functions in this category take in 3 parameters, of which **all** are necessary.
Currently there aren't any checks to see if they are passed (shame on me), but they are coming in v1.1.0

Also all of the functions are *extremely* similar, but I will still make them into seperate sections because why not 

## Get a song
To get a song, you can do

```js
MusicKit.getSong("lv", "1399202959", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202959        | This is the ID of the song                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song#3002792) |

## Get an album
To get an album, you can do

```js
MusicKit.getAlbum("lv", "1399202539", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202539        | This is the ID of the album                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_album#3002705) |

## Get a music video
To get a music video, you can do

```js
MusicKit.getMusicVideo("lv", "1374328492", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1374328492        | This is the ID of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_music_video#3002773) |

## Get a music video
To get an artist, you can do

```js
MusicKit.getArtist("lv", "412778295", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 412778295        | This is the ID of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_artist#3002797) |
