# Get functions
This section focuses on how to get songs, albums, music videos and artists

All of the functions in this category take in 3 parameters, of which **all** are necessary.
Currently there aren't any checks to see if they are passed (shame on me), but they are coming in v1.1.0

Also all of the functions are *extremely* similar, but I will still make them into seperate sections because why not 

## Requirements

As with any function, you are required to initialize ${package}. To find out how to do so, click [here](/initialization.md)

## Get by ID

### Get a song
To get a song by ID, you can do

```js
MusicKit.getSong("lv", "1399202959", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202959        | This is the ID of the song                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song#3002792) |

### Get an album
To get an album by ID, you can do

```js
MusicKit.getAlbum("lv", "1399202539", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202539        | This is the ID of the album                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_album#3002705) |

### Get a music video
To get a music video by ID, you can do

```js
MusicKit.getMusicVideo("lv", "1374328492", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1374328492        | This is the ID of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_music_video#3002773) |

### Get an artist
To get an artist by ID, you can do

```js
MusicKit.getArtist("lv", "412778295", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 412778295        | This is the ID of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_artist#3002797) |

## Get by industry IDs

### Get a song by ISRC
To get a song by ISRC, you can do

```js
MusicKit.getSongByISRC("lv", "USUM71805289", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | This is the ISRC of the song                                                                                                                                                                     |
| Callback   | (err, data) => {} | This is the callback. First parameter is the error, second is the actual response.<br>The response can be found [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song#3002792) |
