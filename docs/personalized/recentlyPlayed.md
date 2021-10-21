# Recently played

These functions let you access the users recently played resources and recently played tracks.

## Requirements

As with any function, you are required to initialize `${package}/personalized`. To find out how to do so, click [here](personalized/initialization.md)

## Get recently played resources
You can get albums, playlists and I think artists here

### Usage
```js
MusicKit.getRecentlyPlayed(1, 0)
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | What it does | Optional? |
|---|---|---|---|
| limit | 1 | How much data to fetch (Max 25) | true |
| offset | 0 | How much to offset the data | true |

## Get recently played tracks
You can get library music videos, library songs, music videos and songs

### Usage
```js
MusicKit.getRecentlyPlayed(1, 0, "songs")
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | What it does | Optional? |
|---|---|---|---|
| limit | 1 | How much data to fetch (Max 25) | false |
| offset | 0 | How much to offset the data | false |
| type | songs | What type of track to fetch. Possible types: `library-music-videos, library-songs, music-videos, songs` | false |