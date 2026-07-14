import type { FetchAPI, MusicKitResultWrapper } from ".."
import type { AlbumRaw, AlbumRelationships } from "../types/album"
import type { Artist, ArtistRaw } from "../types/artist"
import { flattenItem } from "../util/flatten"

export class ArtistsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<ArtistRaw[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<Artist[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(ArtistRaw)[]>(`/catalog/${storefront}/artists/${id}`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Artist)

        return {
            status: res.status,
            data: items,
            error: null
        }
    }
}