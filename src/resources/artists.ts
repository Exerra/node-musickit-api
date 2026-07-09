import type { FetchAPI } from ".."
import type { AlbumRaw, AlbumRelationships } from "../types/album"
import type { ArtistRaw, ArtistRelationships } from "../types/artist"

export class ArtistsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string) {
        return this.fetch<ArtistRaw[]>(`/catalog/${storefront}/artists/${id}`)
    }

    // async getByUPC(storefront: string, upc: string) {
    //     return this.fetch<(AlbumRaw & {relationships: AlbumRelationships})[]>(`/catalog/${storefront}/artists?filter[upc]=${encodeURIComponent(upc)}`)
    // }
}