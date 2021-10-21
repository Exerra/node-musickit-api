const jwt = require('jsonwebtoken')

/**
 *
 * @param {Object} credentials Apple Music credentials. Consists of a key containing MusicKit privileges, the team ID of developer account and the ID of the key
 * @param {string} credentials.key A valid key generated from developer console that has MusicKit permissions
 * @param {string} credentials.keyId ID of the credentials.key
 * @param {string} credentials.teamId ID of the team that credentials.key belongs to
 */
 const createJWT = (credentials) => {
	if (!credentials || !credentials.key || !credentials.teamId || !credentials.keyId) {
		throw new Error("No credentials supplied")
	}

	return jwt.sign({}, credentials.key, {
		algorithm: 'ES256',
		expiresIn: '180d',
		issuer: credentials.teamId,
		header: {
			alg: 'ES256',
			kid: credentials.keyId
		}
	});
}

module.exports.createJWT = createJWT