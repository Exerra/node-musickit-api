const jwt = require('jsonwebtoken')
const axios = require('axios')

const rootPath = "https://api.music.apple.com/v1"
let token
let auth
let userToken
let reqUrl = `${rootPath}/me`

class MusicKit {
    /**
     *
     * @param {Object} credentials Apple Music credentials. Consists of a key containing MusicKit priviledges, the team ID of developer account and the ID of the key
     * @param {string} credentials.key A valid key generated from developer console that has MusicKit permissions
     * @param {string} credentials.teamId ID of the team that credentials.key belongs to
     * @param {string} credentials.userToken Users token
     * @param {string} credentials.keyId ID of the credentials.key
     */
    constructor(credentials) {
        if (!credentials || !credentials.key || !credentials.teamId || !credentials.keyId || !credentials.userToken) {
            throw new Error("No credentials supplied")
        }

        token = jwt.sign({}, credentials.key, {
            algorithm: 'ES256',
            expiresIn: '180d',
            issuer: credentials.teamId,
            header: {
                alg: 'ES256',
                kid: credentials.keyId
            }
        });

        this.updateAuth(token, credentials.userToken)
    }

    /**
     *
     * @private
     */
    updateAuth(paramToken, userTokenparam) {
        auth = `Bearer ${paramToken}`
        userToken = userTokenparam
    }

    getLibrary(limit = 1, offset = 1) {
        return new Promise((resolve, reject) => {
            axios({
                "method": "GET",
                "url": `${reqUrl}/library/playlists`,
                "headers": {
                    "Authorization": auth,
                    "Music-User-Token": userToken
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

    /**
     *
     * @param {Object} attributes The attributes for the playlist. See more [here](https://developer.apple.com/documentation/applemusicapi/libraryplaylistcreationrequest/attributes)
     * @param {string} attributes.name The name of the playlist you want to make
     * @param {string} attributes.description The description of the playlist you want to make
     * @param {{tracks: {data: [{id: string, type: string}]}}} relationships The relationships for the playlist. See more [here](https://developer.apple.com/documentation/applemusicapi/libraryplaylistcreationrequest/relationships)
     * @returns {Promise<Object>}
     */
    createPlaylist(attributes, relationships) {
        if (!attributes || !relationships) {
            throw new Error("At least one required parameter is missing. Find out about how to use the createPlaylist function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-song")
        }

        const data = {
            attributes,
            relationships
        }

        console.log(data)

        return new Promise((resolve, reject) => {
            axios({
                "method": "POST",
                "url": `${reqUrl}/library/playlists`,
                "headers": {
                    "Authorization": auth,
                    "Music-User-Token": userToken
                },
                "data": {
                    attributes,
                    relationships
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

    /**
     * Add a song to a playlist
     * @param {string} playlistId
     * @param {{data: [{id: string}]}} songs
     */
    addSongToPlaylist(playlistId, songs) {

        for (let i in songs.data) {
            songs.data[i].type = "songs"
        }

        console.log(songs)

        return new Promise((resolve, reject) => {
            axios({
                "method": "POST",
                "url": `${reqUrl}/library/playlists/${playlistId}/tracks`,
                "headers": {
                    "Authorization": auth,
                    "Music-User-Token": userToken
                },
                "data": songs
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

}

module.exports = MusicKit