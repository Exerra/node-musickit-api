# Create playlist
This function lets you add a song to a users playlist.

## Requirements

As with any function, you are required to initialize `${package}/personalized`. To find out how to do so, click [here](personalized/initialization.md)

## Usage
To use it, you do
```js
MusicKit.addSongToPlaylist("3456743567", {data: [{id: "1450330685"}, {id: "1520233767"}]})
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

## Explanation
| Parameter | Example | What it does | Optional? |
|---|---|---|---|
| playlistID | 3456743567 | ID of the playlist to add the song to | false |
| songs | {data :  [{id :   " 1450330685 " } ,  {id :   " 1520233767 " }]} | Song(s) to add. Find out more [here](https://developer.apple.com/documentation/applemusicapi/libraryplaylisttracksrequest/tracks) | false |