# Create Playlist

Creates a new playlist in the user's library.

## Requirements

You must first initialize `${package}/personalized`. See the [Initialization](personalized/initialization.md) guide.

## Usage

```js
MusicKit.createPlaylist({ name: "My Playlist", description: "A new playlist" }, {tracks: { data: [ { id: "1399202959", type: "songs" } ] }})
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

## Explanation
| Parameter | Example | Description | Optional? |
|---|---|---|---|
| playlistID | 3456743567 | ID of the playlist to add the song to | false |
| songs | {data :  [{id :   " 1450330685 " } ,  {id :   " 1520233767 " }]} | Song(s) to add. See the [API reference](https://developer.apple.com/documentation/applemusicapi/libraryplaylisttracksrequest) for details | false |