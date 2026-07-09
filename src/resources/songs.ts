import type { SongRaw, SongRelationships } from "../types/song"
import type { FetchAPI } from "../index"

export class SongsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string) {
        return this.fetch<(SongRaw & {relationships: SongRelationships})[]>(`/catalog/${storefront}/songs/${id}`)
    }

    async getByISRC(storefront: string, isrc: string) {
        return this.fetch<(SongRaw & {relationships: SongRelationships})[]>(`/catalog/${storefront}/songs?filter[isrc]=${encodeURIComponent(isrc)}`)
    }
}
