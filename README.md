# node-musickit-api

A TypeScript wrapper for the [Apple Music API](https://developer.apple.com/documentation/applemusicapi) for Node.js. Fully typed, promise-based, and ready for production.

[![npm version](https://img.shields.io/npm/v/node-musickit-api)](https://www.npmjs.com/package/node-musickit-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Requirements

You must be enrolled in the paid [Apple Developer Program](https://developer.apple.com/programs/) ($99/yr) and have created a key with MusicKit privileges.

## Installation

```bash
npm install node-musickit-api
# or
yarn add node-musickit-api
# or
bun add node-musickit-api
```

## Quick Start

```ts
import { MusicKit } from "node-musickit-api";

const musicKit = new MusicKit({
  key: {
    id: "YOUR_KEY_ID",
    teamId: "YOUR_TEAM_ID",
    p8: process.env.MUSICKIT_P8!, // Full content of the .p8 key
  },
});

// Authenticate (generates a JWT developer token valid for 180d)
await musicKit.auth();

// Fetch a song by its Apple Music catalog ID
const song = await musicKit.songs.get("us", "203709340");
console.log(song.data);
```

> **Security note:** Never hardcode your private key (`p8`) in source code. Always load it from environment variables (e.g. `process.env.MUSICKIT_P8`) or a secrets manager. The example above uses `MUSICKIT_P8` - set it in a `.env` file or your deployment environment.

## API

### `auth()`

Generates and caches a JWT developer token from your MusicKit key. **Must be called before any other request.**

### `testAuth()`

Validates your developer token against the Apple Music API. Returns the HTTP status code.

### Resources

Every resource method returns `MusicKitResultWrapper<T>`:

```ts
{
  status: number;     // HTTP status code
  data: T | null;     // response data (null on error)
  error: string | null; // error body (null on success)
}
```

All `get*` methods accept an optional `raw` parameter:
- `raw: true` → returns the unflattened API response
- `raw: false` (default) → returns a flattened/parsed response with cleaned-up `attributes` and `relationships`

#### Songs

| Method | Description |
|---|---|
| `get(storefront, id, raw?)` | Fetch a song by catalog ID |
| `getByISRC(storefront, isrc, raw?)` | Fetch songs by ISRC code |

#### Albums

| Method | Description |
|---|---|
| `get(storefront, id, raw?)` | Fetch an album by catalog ID |
| `getByUPC(storefront, upc, raw?)` | Fetch albums by UPC code |

#### Artists

| Method | Description |
|---|---|
| `get(storefront, id, raw?)` | Fetch an artist by catalog ID |

#### Music Videos

| Method | Description |
|---|---|
| `get(storefront, id, raw?)` | Fetch a music video by catalog ID |
| `getByISRC(storefront, isrc, raw?)` | Fetch music videos by ISRC code |

#### Storefronts

| Method | Description |
|---|---|
| `getAll(props?, raw?)` | List all storefronts (`limit`, `offset` supported) |
| `get(storefront, props?, raw?)` | Fetch a single storefront (`l`, `include`, `extend` supported) |

#### Search

```ts
search(storefront, params, raw?): Promise<MusicKitResultWrapper<SearchResult>>
```

`SearchParams`:

| Param | Type | Description |
|---|---|---|
| `term` | `string` | Search query |
| `types` | `SearchType[]` | Resource types to search (e.g. `"songs"`, `"albums"`, `"artists"`) |
| `l` | `string` | Language tag (optional) |
| `limit` | `number` (1–25) | Results per type (optional) |
| `offset` | `number` | Pagination offset (optional) |
| `with` | `string[]` | Additional resources to include (optional) |

Usage:

```ts
const results = await musicKit.search("us", {
  term: "Tame Impala",
  types: ["songs", "albums"],
  limit: 5,
});

console.log(results.data.results.songs);
```

## TypeScript

This package is written in TypeScript and ships with full type definitions. Import types directly:

```ts
import { MusicKit, type MusicKitProps, type MusicKitResultWrapper } from "node-musickit-api";
import type { Song, Album, Artist } from "node-musickit-api";
```

## Documentation

Full API reference is available at [musickit.js.org](https://musickit.js.org/#/).

## License

MIT
