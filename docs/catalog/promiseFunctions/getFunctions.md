# Get functions
This section focuses on how to get songs, albums, music videos and artists

All of the functions in this category take in 3 parameters, of which **all** are necessary.

Also all of the functions are *extremely* similar, but I will still make them into seperate sections because why not

## Requirements

As with any function, you are required to initialize ${package}. To find out how to do so, click [here](/initialization.md)

## Get by ID

### Get a song
To get a song by ID, you can do

```js
MusicKit.getSong("lv", "1399202959")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202959        | This is the ID of the song                                                                                                                                                                     |

### Get an album
To get an album by ID, you can do

```js
MusicKit.getAlbum("lv", "1399202539")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1399202539        | This is the ID of the album                                                                                                                                                                     |

### Get a music video
To get a music video by ID, you can do

```js
MusicKit.getMusicVideo("lv", "1374328492")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 1374328492        | This is the ID of the music video                                                                                                                                                                     |

### Get an artist
To get an artist by ID, you can do

```js
MusicKit.getArtist("lv", "412778295")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ID         | 412778295        | This is the ID of the music video                                                                                                                                                                     |

## Get by industry IDs

### Get a song by ISRC
To get a song by ISRC, you can do

```js
MusicKit.getSongByISRC("lv", "USUM71805289")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | This is the ISRC of the song                                                                                                                                                                     |

### Get a music video by ISRC
To get a music video by ISRC, you can do

```js
MusicKit.getMusicVideoByISRC("lv", "USUM71805289")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| ISRC         | USUM71805289        | This is the ISRC of the music video                                                                                                                                                                     |

### Get an album by UPC
To get an album by UPC, you can do

```js
MusicKit.getAlbumByUPC("lv", "00602567807995")
    .then(data => { console.log(data) })
    .catch(err => { console.log(err) })
```

#### Explanation

| Parameter  | Example           | What it does                                                                                                                                                                                   |
|------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Storefront | lv                | This is the storefront for catalog you want to search in                                                                                                                                       |
| UPC         | 00602567807995        | This is the UPC of the album                                                                                                                                                                     |
