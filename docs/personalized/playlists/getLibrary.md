# Get Library

Retrieves the user's playlist library.

## Requirements

You must first initialize `${package}/personalized`. See the [Initialization](personalized/initialization.md) guide.

## Usage

```js
MusicKit.getLibrary(1, 0)
  .then(data => { console.log(data) })
  .catch(err => { console.log(err) })
```

### Explanation
| Parameter | Example | Description                            | Optional? |
|-----------|---------|----------------------------------------|-----------|
| Limit     | 1       | Maximum number of results (max 25)     | true      |
| Offset    | 0       | Number of results to skip              | true      |