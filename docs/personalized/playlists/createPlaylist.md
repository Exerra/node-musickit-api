# Create playlist
This function lets you create a playlist in the users library.

## Requirements

As with any function, you are required to initialize `${package}/personalized`. To find out how to do so, click [here](personalized/initialization.md)

## Usage
To use it, you do
```js
MusicKit.createPlaylist({ name: "${package}/personalized", description: "How cool is that??" }, {tracks: { data: [ { id: "1399202959", type: "songs" } ] }})
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

## Explanation
| Parameter | Example | What it does | Optional? |
|---|---|---|---|
| playlistID | 3456743567 | ID of the playlist to add the song to | false |
| songs | {data :  [{id :   " 1450330685 " } ,  {id :   " 1520233767 " }]} | Song(s) to add. Find out more [here](https://developer.apple.com/documentation/applemusicapi/libraryplaylisttracksrequest) | false |