# ${package} Initialization

To initialize ${package}, create a new instance using the constructor. For more information on constructors, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).

## Requirements

You must be enrolled in the [Apple Developer Program](https://developer.apple.com/programs/) and have created a key with MusicKit privileges.

## Steps

1. Import the package.

```js
const MusicKit = require('${package}') // or '${package}/promises' for promise-based functions
```

2. Create a new instance of the MusicKit class.

```js
const MusicKit = require('${package}')

const MusicKitConst = new MusicKit()
```

3. Provide the required configuration to the constructor.

```js
const MusicKit = require('${package}')

const MusicKitConst = new MusicKit({
	key: "Your key (must be converted to string)",
	teamId: "Your Apple Developer account team ID",
	keyId: "The ID of the key you created"
})
```

The above example stores the key in plain text, which may be acceptable for personal projects. For production use, it is recommended to use environment variables instead.

### Using Environment Variables with dotenv

[dotenv](https://npmjs.org/package/dotenv) loads variables from a `.env` file into `process.env`.

**index.js**
```js
const MusicKit = require('${package}')
require('dotenv').config()

const MusicKitConst = new MusicKit({
	key: process.env.MUSICKIT_KEY.replace(/\\n/g, '\n').toString(),
	teamId: process.env.MUSICKIT_TEAMID,
	keyId: process.env.MUSICKIT_KEYID
})
```

**.env**
```env
MUSICKIT_KEY="-----BEGIN PRIVATE KEY-----\nSTRING\nSTRING\nSTRING\n-----END PRIVATE KEY-----"
MUSICKIT_TEAMID="your_team_id"
MUSICKIT_KEYID="your_key_id"
```

> **Note:** The `MUSICKIT_KEY` value is stored as a single line with literal `\n` characters. The `.replace(/\\n/g, '\n')` call in the JavaScript file converts these back to actual newlines, since `.env` files may not correctly handle multi-line values.

Make sure to add `.env` to your `.gitignore` to avoid committing sensitive credentials.