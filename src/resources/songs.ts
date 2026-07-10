import type { Song, SongRaw, SongRelationships, SongRelationshipsRaw } from "../types/song"
import type { FetchAPI, MusicKitResultWrapper } from "../index"

export class SongsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(SongRaw & {relationships: SongRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(Song & {relationships: SongRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(SongRaw & {relationships: SongRelationshipsRaw})[]>(`/catalog/${storefront}/songs/${id}`)

        if (raw) {
            return res;
        }

        // Apply flattening logic to relationships
        const items = res.data.map(item => {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as Song & {relationships: SongRelationships}

            if (item.relationships) {
                for (const relKey of Object.keys(item.relationships)) {
                    const rel = item.relationships[relKey as keyof typeof item.relationships]

                    if (rel && rel.data) {
                        tempItem = {
                            ...tempItem,
                            relationships: {
                                ...(tempItem.relationships ?? {}),
                                [relKey]: rel.data
                            }
                        }
                    }
                }
            }
            return tempItem
        })

        return {
            status: res.status,
            data: items,
            error: res.error
        }
    }

    async getByISRC(storefront: string, isrc: string, raw: true): Promise<MusicKitResultWrapper<(SongRaw & {relationships: SongRelationshipsRaw})[]>>;
    async getByISRC(storefront: string, isrc: string, raw?: false): Promise<MusicKitResultWrapper<(Song & {relationships: SongRelationships})[]>>;
    async getByISRC(storefront: string, isrc: string, raw = false) {
        const res = await this.fetch<(SongRaw & {relationships: SongRelationshipsRaw})[]>(`/catalog/${storefront}/songs?filter[isrc]=${encodeURIComponent(isrc)}`)

        if (raw) {
            return res;
        }

        // Apply flattening logic to relationships
        const items = res.data.map(item => {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as Song & {relationships: SongRelationships}

            if (item.relationships) {
                for (const relKey of Object.keys(item.relationships)) {
                    const rel = item.relationships[relKey as keyof typeof item.relationships]

                    if (rel && rel.data) {
                        tempItem = {
                            ...tempItem,
                            relationships: {
                                ...(tempItem.relationships ?? {}),
                                [relKey]: rel.data
                            }
                        }
                    }
                }
            }
            return tempItem
        })

        return {
            status: res.status,
            data: items,
            error: res.error
        }
    }
}
