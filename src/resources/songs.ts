import type { Song, SongRaw, SongRelationships, SongRelationshipsRaw } from "../types/song"
import type { FetchAPI, MusicKitResultWrapper } from "../index"
import { flattenItem } from "../util/flatten"

export class SongsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(SongRaw & {relationships: SongRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(Song & {relationships: SongRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(SongRaw & {relationships: SongRelationshipsRaw})[]>(`/catalog/${storefront}/songs/${id}`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Song & {relationships: SongRelationships})

        return {
            status: res.status,
            data: items,
            error: null
        }
    }

    async getByISRC(storefront: string, isrc: string, raw: true): Promise<MusicKitResultWrapper<(SongRaw & {relationships: SongRelationshipsRaw})[]>>;
    async getByISRC(storefront: string, isrc: string, raw?: false): Promise<MusicKitResultWrapper<(Song & {relationships: SongRelationships})[]>>;
    async getByISRC(storefront: string, isrc: string, raw = false) {
        const res = await this.fetch<(SongRaw & {relationships: SongRelationshipsRaw})[]>(`/catalog/${storefront}/songs?filter[isrc]=${encodeURIComponent(isrc)}`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Song & {relationships: SongRelationships})

        return {
            status: res.status,
            data: items,
            error: null
        }
    }
}
