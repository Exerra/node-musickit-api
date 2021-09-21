const jwt = require('jsonwebtoken')
const axios = require('axios')

const rootPath = "https://api.music.apple.com/v1"
let token
let auth

/**
 * @author Exerra
 */
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
		
		token = jwt.sign({}, credentials.key, {
			algorithm: 'ES256',
			expiresIn: '180d',
			issuer: credentials.teamId,
			header: {
				alg: 'ES256',
				kid: credentials.keyId
			}
		});

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
	 * This callback returns either an error or the response from the Apple Music API
	 * @callback requestCallback
	 * @param {*} err The error
	 * @param {*} data The response
	 */

	/**
	 * 
	 * Searches for [type]
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {Object[]} type The type of thing to search. Find about possible types in https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources
	 * @param {string} searchquery The search query
	 * @param {requestCallback} cb Callback
	 * @param {number} [limit=1] The amount of responses to get (defaults to 1)
	 * @returns {Object} Apple Music API response
	 * @author Exerra
	 */
	search(country, type, searchquery, cb, limit = 1) {
		let reqUrl = `${rootPath}/catalog/${country}/search`

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
		}).then(res => cb(null, res.data)).catch(err => cb(err, null))
	}

	//* ----------------------------- SONGS -----------------------------


	/**
	 * 
	 * Gets a song by its ID
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} id ID of the song
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Song info
	 * @author Exerra
	 */
	getSong(storefront, id, cb) {

		let reqUrl = `${rootPath}/catalog/${storefront}/songs/${id}`
		axios({
			"method": "GET",
			"url": reqUrl,
			"headers": {
				"Authorization": auth
			}
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}

	/**
	 * 
	 * Gets a song by its ISRC
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} isrc ISRC of the song
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Song info
	 * @author Exerra
	 */
	getSongByISRC(storefront, isrc, cb) {
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
		}).then(res => cb(null, res.data)).catch(err => cb(err, null))
	}

	//* ----------------------------- ALBUMS -----------------------------

	/**
	 * 
	 * Gets an album by its ID
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} id ID of the album
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Album info
	 * @author Exerra
	 */
	getAlbum(storefront, id, cb) {
		let reqUrl = `${rootPath}/catalog/${storefront}/albums/${id}`
		axios({
			"method": "GET",
			"url": reqUrl,
			"headers": {
				"Authorization": auth
			}
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}

	/**
	 * 
	 * Gets an album by its UPC value
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} upc UPC of the album
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Album info
	 * @author Exerra
	 */
	 getAlbumByUPC(storefront, upc, cb) {
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
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}

	//* ----------------------------- MUSIC VIDEO -----------------------------

	/**
	 * 
	 * Gets a music video by its ID
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} id ID of the music video
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Music video info
	 * @author Exerra
	 */
	 getMusicVideo(storefront, id, cb) {
		let reqUrl = `${rootPath}/catalog/${storefront}/music-videos/${id}`
		axios({
			"method": "GET",
			"url": reqUrl,
			"headers": {
				"Authorization": auth
			}
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}

	/**
	 * 
	 * Gets a music video by its ISRC
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} isrc ISRC of the music video
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Music video info
	 * @author Exerra
	 */
	 getMusicVideoByISRC(storefront, isrc, cb) {
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
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}

	//* ----------------------------- ARTISTS -----------------------------

	/**
	 * 
	 * @param {string} storefront The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {string} id ID of the artist
	 * @param {requestCallback} cb Callback
	 * @returns {Object} Artist info
	 * @see The official documentation {@link https://developer.apple.com/documentation/applemusicapi/get_a_catalog_artist}
	 * @author Exerra
	 */
	getArtist(storefront, id, cb) {
		let reqUrl = `${rootPath}/catalog/${storefront}/artists/${id}`
		axios({
			"method": "GET",
			"url": reqUrl,
			"headers": {
				"Authorization": auth
			}
		}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
	}
}

module.exports = MusicKit;