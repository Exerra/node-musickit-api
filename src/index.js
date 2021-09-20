const jwt = require('jsonwebtoken')
const axios = require('axios')

const rootPath = "https://api.music.apple.com/v1"
let token
let auth

class MusicKit {
	/**
	 * 
	 * @param {object} credentials Apple Music credentials. Consists of a key containing MusicKit priviledges, the team ID of developer account and the ID of the key
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

	updateAuth(paramToken) {
		auth = `Bearer ${paramToken}`
	}

	/**
	 * 
	 * @param {string} country The storefront. How to fetch is in https://developer.apple.com/documentation/applemusicapi/fetching_resources_by_page
	 * @param {array} type The type of thing to search. Find about possible types in https://developer.apple.com/documentation/applemusicapi/search_for_catalog_resources
	 * @param {string} searchquery The search query
	 * @param {object} cb Callback
	 */
	search(country, type, searchquery, cb, limit = 1) {
		let reqUrl = `${rootPath}/catalog/${country}/search`
		/* let auth = `Bearer ${token}` */

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


	/**
	 * 
	 * @param {string} country A country to look in
	 * @param {string} id ID of the song
	 * @param {function} cb Callback
	 * @returns Song info
	 */
	searchSong(country, id, cb) {

		let reqUrl = `${rootPath}/catalog/${country}/songs/${id}`
		/* let auth = `Bearer ${token}` */
		if (cb) {
			axios({
				"method": "GET",
				"url": reqUrl,
				"headers": {
					"Authorization": auth
				}
			}).then(res => cb(null, res.data)).catch((err) => cb(err, null))
		} else {
			axios({
				"method": "GET",
				"url": reqUrl,
				"headers": {
					"Authorization": auth
				}
			}).then(res => { return res.data })
		}
	}
}

module.exports = MusicKit;