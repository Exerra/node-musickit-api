import type { AlbumRaw, AlbumRelationships } from "../types/album"
import type { FetchAPI } from "../index"

export class AlbumsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string) {
        return this.fetch<(AlbumRaw & {relationships: AlbumRelationships})[]>(`/catalog/${storefront}/albums/${id}`)
    }

    async getByUPC(storefront: string, upc: string) {
        return this.fetch<(AlbumRaw & {relationships: AlbumRelationships})[]>(`/catalog/${storefront}/albums?filter[upc]=${encodeURIComponent(upc)}`)
    }
}
