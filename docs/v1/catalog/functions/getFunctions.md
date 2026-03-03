# Get Functions

This section covers retrieving songs, albums, music videos, and artists.

All functions in this category require 3 parameters.

The functions follow the same pattern and are documented separately below.

## Requirements

You must first initialize ${package}. See the [Initialization](/initialization.md) guide.

## Get by ID

### Get a Song

```js
MusicKit.getSong("lv", "1399202959", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1399202959        | The ID of the song                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song#3002792) |

### Get an Album

```js
MusicKit.getAlbum("lv", "1399202539", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1399202539        | The ID of the album                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_album#3002705) |

### Get a Music Video

```js
MusicKit.getMusicVideo("lv", "1374328492", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1374328492        | The ID of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_music_video#3002773) |

### Get an Artist

```js
MusicKit.getArtist("lv", "412778295", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 412778295         | The ID of the artist                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_artist#3002797) |

## Get by Industry IDs

### Get a Song by ISRC

```js
MusicKit.getSongByISRC("lv", "USUM71805289", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | The ISRC of the song                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song#3002792) |

### Get a Music Video by ISRC

```js
MusicKit.getMusicVideoByISRC("lv", "USUM71805289", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | The ISRC of the music video                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_album#3002705) |

### Get an Album by UPC

```js
MusicKit.getAlbumByUPC("lv", "00602567807995", (err, data) => {
 if (err) return console.log(err)
 // Code
})
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| UPC         | 00602567807995        | The UPC of the album                                                                                                                                                                     |
| Callback   | (err, data) => {} | Callback function. First parameter is the error, second is the response.<br>See response format [here](https://developer.apple.com/documentation/applemusicapi/get_a_catalog_album#3002705) |
