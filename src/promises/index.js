const jwt = require('jsonwebtoken')
const axios = require('axios')
const { createJWT } = require("../../modules/createJWT")

const rootPath = "https://api.music.apple.com/v1"
let token
let auth

class MusicKit {
    /**
     *
     * @param {Object} credentials Apple Music credentials. Consists of a key containing MusicKit priviledges, the team ID of developer account and the ID of the key
     * @param {string} credentials.key A valid key generated from developer console that has MusicKit permissions
     * @param {string} credentials.teamId ID of the team that credentials.key belongs to
     * @param {string} credentials.keyId ID of the credentials.key
     */
    constructor(credentials) {
        if (!credentials || !credentials.key || !credentials.teamId || !credentials.keyId) {
            throw new Error("No credentials supplied")
        }

        token = createJWT(credentials)

        this.updateAuth(token)
    }

    /**
     *
     * @private
     */
    updateAuth(paramToken) {
        auth = `Bearer ${paramToken}`
    }

    /**
     *
     * Searches for [type]
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {Object[]} type The type of thing to search. Find about possible types in https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources
     * @param {string} searchquery The search query
     * @param {number} [limit=1] The amount of responses to get (defaults to 1)
     * @returns {Promise<Object>} Apple Music API response
     * @author Exerra
     */
    search(storefront, type, searchquery, limit = 1) {

        return new Promise((resolve, reject) => {
            if (!storefront || !type || !searchquery) {
                throw new Error("At least one required parameter is missing. Find out about how to use the search function in https://musickit.js.org/#/catalog/functions/search")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/search`

            axios({
                "method": "GET",
                "url": reqUrl,
                "params": {
                    "term": searchquery,
                    "types": type,
                    "limit": limit
                },
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch(err => reject(err.response.data))
        })
    }

    //* ----------------------------- SONGS -----------------------------


    /**
     *
     * Gets a song by its ID
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} id ID of the song
     * @returns {Promise<Object>} Song info
     * @author Exerra
     */
    getSong(storefront, id) {

        return new Promise((resolve, reject) => {
            if (!storefront || !id) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getSong function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-song")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/songs/${id}`
            axios({
                "method": "GET",
                "url": reqUrl,
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

    /**
     *
     * Gets a song by its ISRC
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} isrc ISRC of the song
     * @returns {Promise<Object>} Song info
     * @author Exerra
     */
    getSongByISRC(storefront, isrc) {

        return new Promise((resolve, reject) => {
            if (!storefront || !isrc) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getSongByISRC function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-song-by-isrc")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/songs`

            axios({
                "method": "GET",
                "url": reqUrl,
                "params": {
                    "filter[isrc]": isrc,
                },
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

    //* ----------------------------- ALBUMS -----------------------------

    /**
     *
     * Gets an album by its ID
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} id ID of the album
     * @returns {Promise<Object>} Album info
     * @author Exerra
     */
    getAlbum(storefront, id) {

        return new Promise((resolve, reject) => {
            if (!storefront || !id) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getAlbum function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-an-album")
            }
    
            let reqUrl = `${rootPath}/catalog/${storefront}/albums/${id}`
            axios({
                "method": "GET",
                "url": reqUrl,
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }

    /**
     *
     * Gets an album by its UPC value
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} upc UPC of the album
     * @returns {Promise<Object>} Album info
     * @author Exerra
     */
    getAlbumByUPC(storefront, upc) {

        return new Promise((resolve, reject) => {
            if (!storefront || !upc) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getAlbumByUPC function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-an-album-by-upc")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/albums`
            axios({
                "method": "GET",
                "url": reqUrl,
                "params": {
                    "filter[upc]": upc
                },
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })

        
    }

    //* ----------------------------- MUSIC VIDEO -----------------------------

    /**
     *
     * Gets a music video by its ID
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} id ID of the music video
     * @returns {Promise<Object>} Music video info
     * @author Exerra
     */
    getMusicVideo(storefront, id) {

        return new Promise((resolve, reject) => {
            if (!storefront || !id) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getMusicVideo function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-music-video")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/music-videos/${id}`
            axios({
                "method": "GET",
                "url": reqUrl,
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })

        
    }

    /**
     *
     * Gets a music video by its ISRC
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} isrc ISRC of the music video
     * @returns {Promise<Object>} Music video info
     * @author Exerra
     */
    getMusicVideoByISRC(storefront, isrc) {

        return new Promise((resolve, reject) => {
            if (!storefront || !isrc) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getMusicVideoByISRC function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-a-music-video-by-isrc")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/music-videos`
            axios({
                "method": "GET",
                "url": reqUrl,
                "params": {
                    "filter[isrc]": isrc,
                },
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })

        
    }

    //* ----------------------------- ARTISTS -----------------------------

    /**
     *
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} id ID of the artist
     * @returns {Promise<Object>} Artist info
     * @see The official documentation {@link https://developer.apple.com/documentation/applemusicapi/get_a_catalog_artist}
     * @author Exerra
     */
    getArtist(storefront, id) {

        return new Promise((resolve, reject) => {
            if (!storefront || !id) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getArtist function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-an-artist")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/artists/${id}`
            axios({
                "method": "GET",
                "url": reqUrl,
                "headers": {
                    "Authorization": auth
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })

        
    }

    /**
     * Gets the most played songs for a storefront
     * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
     * @param {string} types Types to get. Currently only `songs` supported
     * @param limit
     * @returns {Promise<unknown>}
     */
    getCharts(storefront, types, limit = 20) {
        return new Promise((resolve, reject) => {
            if (!storefront || !types) {
                throw new Error("At least one required parameter is missing. Find out about how to use the getArtist function in https://musickit.js.org/#/catalog/functions/getFunctions?id=get-an-artist")
            }

            let reqUrl = `${rootPath}/catalog/${storefront}/charts`
            axios({
                "method": "GET",
                "url": reqUrl,
                "headers": {
                    "Authorization": auth
                },
                "params": {
                    types,
                    limit
                }
            }).then(res => resolve(res.data)).catch((err) => reject(err.response.data))
        })
    }
}

module.exports = MusicKit