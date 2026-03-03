# Recently Played

These functions retrieve the user's recently played resources and recently played tracks.

## Requirements

You must first initialize `${package}/personalized`. See the [Initialization](personalized/initialization.md) guide.

## Get Recently Played Resources

Returns recently played albums, playlists, and artists.

### Usage
```js
MusicKit.getRecentlyPlayed(1, 0)
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | Description | Optional? |
|---|---|---|---|
| limit | 1 | Maximum number of results to fetch (max 25) | true |
| offset | 0 | Number of results to skip | true |

## Get Recently Played Tracks

Returns library music videos, library songs, music videos, and songs.

### Usage
```js
MusicKit.getRecentlyPlayed(1, 0, "songs")
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | Description | Optional? |
|---|---|---|---|
| limit | 1 | Maximum number of results to fetch (max 25) | false |
| offset | 0 | Number of results to skip | false |
| type | songs | Type of track to fetch. Possible types: `library-music-videos, library-songs, music-videos, songs` | false |