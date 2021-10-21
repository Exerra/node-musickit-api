# Get library
This function lets you get the users library (well, playlists atleast).

## Requirements

As with any function, you are required to initialize `${package}/personalized`. To find out how to do so, click [here](personalized/initialization.md)

## Usage
To use it, you do 
```js
MusicKit.getLibrary(1, 0)
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | What it does                           | Optional? |
|-----------|---------|----------------------------------------|-----------|
| Limit     | 1       | How much results to get? Maximum is 25 | true      |
| Offset    | 0       | How much to offset the results         | true      |