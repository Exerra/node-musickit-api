import { SignJWT, importPKCS8 } from 'jose'

import type { MusicKitProps } from "..";

export const createJWT = async (key: MusicKitProps['key']) => {
    if (!key?.id || !key?.teamId || !key?.p8) {
        throw new Error("No credentials supplied")
    }

    const privateKey = await importPKCS8(key.p8, 'ES256')

    return await new SignJWT({})
        .setProtectedHeader({
            alg: 'ES256',
            kid: key.id
        })
        .setIssuedAt()
        .setIssuer(key.teamId)
        .setExpirationTime('180d')
        .sign(privateKey)
}