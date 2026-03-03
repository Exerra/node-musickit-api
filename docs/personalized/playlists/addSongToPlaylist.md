# Add Song to Playlist

Adds one or more songs to a user's playlist.

## Requirements

You must first initialize `${package}/personalized`. See the [Initialization](personalized/initialization.md) guide.

## Usage

```js
MusicKit.addSongToPlaylist("3456743567", {data: [{id: "1450330685"}, {id: "1520233767"}]})
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

## Explanation
| Parameter | Example | Description | Optional? |
|---|---|---|---|
| playlistID | 3456743567 | ID of the playlist to add the song to | false |
| songs | {data :  [{id :   " 1450330685 " } ,  {id :   " 1520233767 " }]} | Song(s) to add. See the [API reference](https://developer.apple.com/documentation/applemusicapi/libraryplaylisttracksrequest/tracks) for details | false |