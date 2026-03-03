# Get Functions

This section covers retrieving songs, albums, music videos, and artists.

All functions in this category require 2 parameters.

The functions follow the same pattern and are documented separately below.

## Requirements

You must first initialize ${package}. See the [Initialization](/initialization.md) guide.

## Get by ID

### Get a Song

```js
MusicKit.getSong("lv", "1399202959")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1399202959        | The ID of the song                                                                                                                                                                     |

### Get an Album

```js
MusicKit.getAlbum("lv", "1399202539")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1399202539        | The ID of the album                                                                                                                                                                     |

### Get a Music Video

```js
MusicKit.getMusicVideo("lv", "1374328492")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 1374328492        | The ID of the music video                                                                                                                                                                     |

### Get an Artist

```js
MusicKit.getArtist("lv", "412778295")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ID         | 412778295         | The ID of the artist                                                                                                                                                                     |

## Get by Industry IDs

### Get a Song by ISRC

```js
MusicKit.getSongByISRC("lv", "USUM71805289")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | The ISRC of the song                                                                                                                                                                     |

### Get a Music Video by ISRC

```js
MusicKit.getMusicVideoByISRC("lv", "USUM71805289")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | The ISRC of the music video                                                                                                                                                                     |

### Get an Album by UPC

```js
MusicKit.getAlbumByUPC("lv", "00602567807995")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | Description                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | The storefront for the catalog you want to search in                                                                                                                                       |
| UPC         | 00602567807995        | The UPC of the album                                                                                                                                                                     |
