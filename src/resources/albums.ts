import type { Relationships } from "../types/relationships"
import type { AlbumRaw } from "../types/album"
import type { FetchAPI } from "../index"

export class AlbumsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string) {
        return this.fetch<AlbumRaw & Relationships>(`/catalog/${storefront}/albums/${id}`)
    }

    async getByUPC(storefront: string, upc: string) {
        return this.fetch<(AlbumRaw & Relationships)[]>(`/catalog/${storefront}/albums?filter[upc]=${encodeURIComponent(upc)}`)
    }
}
