const jwt = require('jsonwebtoken')
const axios = require('axios')
const qs = require('qs')

const rootPath = "https://api.music.apple.com/v1"
let token
let auth
let userToken
let reqUrl = `${rootPath}/me`

const createBody = (status, body) => {
    if (body === "") body = {}
    return ({
        status,
        body
    })
}

class MusicKit {
    /**
     *
     * @param {Object} credentials Apple Music credentials. Consists of a key containing MusicKit privileges, the team ID of developer account and the ID of the key
     * @param {string} credentials.key A valid key generated from developer console that has MusicKit permissions
     * @param {string} credentials.keyId ID of the credentials.key
     * @param {string} credentials.teamId ID of the team that credentials.key belongs to
     * @param {string} credentials.userToken Users token
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
     * This updates the auth. Only used by the module
     * @private
     */
    updateAuth(paramToken, userTokenParam) {
        auth = `Bearer ${paramToken}`
        userToken = userTokenParam
    }

    /**
     * Get the users library
     * @param limit How much results to get
     * @param offset How much to offset the results
     * @returns {Promise<Object>}
     */
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
     * Create a playlist
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
     * @param {string} playlistId ID of the playlist to add the song to
     * @param {{data: [{id: string}]}} songs The songs
     * @returns {Promise<Object>}
     */
    addSongToPlaylist(playlistId, songs) {

        if (!playlistId || !songs) {
            throw new Error("At least one required parameter is missing. Find out about how to use the createPlaylist function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-song")
        }

        // Adds the song type to all of the data
        for (let i in songs.data) {
            songs.data[i].type = "songs"
        }

        // Used for testing
        //console.log(songs)

        return new Promise((resolve, reject) => {
            axios({
                "method": "POST",
                "url": `${reqUrl}/library/playlists/${playlistId}/tracks`,
                "headers": {
                    "Authorization": auth,
                    "Music-User-Token": userToken
                },
                "data": songs
            }).then(res => resolve(createBody(res.status, res.data))).catch((err) => reject(createBody(err.status, err.response.data)))
        })
    }

    getRecentlyPlayed(limit, offset, type) {

        if (typeof limit !== "number" || typeof offset !== "number") {
            throw new Error("Atleast one parameter is of the incorrect type. Find out more here: REMINDMETOADDLINKHERE")
            return
        }

        limit ||= 1
        offset ||= 0

        let params = {
            limit: limit,
            offset: offset
        }

        // If the types are there, then get recently played *Tracks* (https://developer.apple.com/documentation/applemusicapi/get_recently_played_tracks)
        if (type) {
            if (typeof type !== "string") {
                throw new Error("The 'type' parameter is a string. Find out more here: REMINDMETOADDLINKHERE")
                return
            }

            params = {...params, types: type}


            // Why is this here? So I can add MULTIPLE FUCKING TYPES AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            // yknow what fuck it
            let recentlyPlayedAxios = axios.create({
                paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
            })

            // endless console logs
            /*console.log(params)
            console.log(recentlyPlayedAxios)*/

            return new Promise((resolve, reject) => {
                axios({
                    "method": "GET",
                    "url": `${reqUrl}/recent/played/tracks`,
                    "headers": {
                        "Authorization": auth,
                        "Music-User-Token": userToken
                    },
                    "params": params
                }).then(res => resolve(createBody(res.status, res.data))).catch(err => reject(createBody(err.status, err.response.data)))
            })
        }

        return new Promise((resolve, reject) => {
            axios({
                "method": "GET",
                "url": `${reqUrl}/recent/played`,
                "headers": {
                    "Authorization": auth,
                    "Music-User-Token": userToken
                },
                "params": params
            }).then(res => resolve(createBody(res.status, res.data))).catch(err => reject(createBody(err.status, err.response.data)))
        })
    }

}

module.exports = MusicKit