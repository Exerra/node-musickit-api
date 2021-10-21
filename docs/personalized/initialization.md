# `${package}/personalized` initialization
To initialize `${package}/personalized` you need to use a constructor. learn more about constructors [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)

## Requirements
You will **need** to be enrolled in the Apple developer program, then you will need to create a key with MusicKit priviledges.

Afterwards you will need to get a user token (usually done with MusicKit.js). Apple does not provide an easy method to do that without using their proprietary software, but maybe through reverse engineering it I will crack it (no promises tho (aH hA get ittt... bad joke. also it will have promises, why am I even saying thi- yknow what nvm lets move on))

## Actual steps

1. Import the package. For this example I will use purely JS since TS is pain and suffering

```js
const MusicKit = require('${package}/personalized')
```

2. Create a variable (or constant) with the imported MusicKit class

```js
const MusicKit = require('${package}/personalized')

const MusicKitConst = new MusicKit()
```

3. Populate the constructor with the necessary fields

```js
const MusicKit = require('${package}/personalized')

const MusicKitConst = new MusicKit({
	key: "Your key (must be converted to string",
	teamId: "Your Apple developer accounts team ID",
	keyId: "The ID of the key you have made",
	userToken: "The users token"
})
```

4. ???
5. Profit

Now you have done all the necessary steps to initialize `${package}/personalized`, but wait!

In the example I showed, the key was stored in plain text (or if you use fs, plain .p8 file). Now that may be simpler to implement for personal projects, its better and more safer to use environment variables. So,

### How to use MusicKit with dotenv

[Dotenv](https://npmjs.org/package/dotenv) is a wonderful tool that loads your projects `.env` file into environment variables (since Node doesn't).

To use it with `${package}/personalized`, do all the steps above BUT instead of adding the strings in the constructor, do this

index.js
```js
const MusicKit = require('${package}/personalized')
require('dotenv').config()

const MusicKitConst = new MusicKit({
	key: process.env.MUSICKIT_KEY.replace(/\\n/g, '\n').toString(), // In my testing, I had to do this. Explained later
	teamId: process.env.MUSICKIT_TEAMID,
	keyId: process.env.MUSICKIT_KEYID,
	userToken: process.env.MUSICKIT_USERTOKEN
})
```

`.env`
```your mum
MUSICKIT_KEY="-----BEGIN PRIVATE KEY-----\nSTRING\nSTRING\nSTRING\n-----END PRIVATE KEY-----"
MUSICKIT_TEAMID="blahblahdeeblah"
MUSICKIT_KEYID="blahblahdeeblah"
```

Now, you may be wondering: "Why make `MUSICKIT_KEY` one line that gets seperated with `\n`, but still replace `\n` with `\n` in the JS file?"

Well dear reader, it is because in my testing the `\n` in `.env` doesn't work. Maybe it is only an issue for me, but I am showing you how it worked for me.

Also, add `.env` to your `.gitignore` (otherwise it just defeats the whole purpose of `.env`)

Anyway, now we are done with the *safe* method of initializing MusicKit, hooray!