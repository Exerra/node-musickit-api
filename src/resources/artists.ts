import type { FetchAPI, MusicKitResultWrapper } from ".."
import type { AlbumRaw, AlbumRelationships } from "../types/album"
import type { Artist, ArtistRaw, ArtistRelationships, ArtistRelationshipsRaw } from "../types/artist"

export class ArtistsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<ArtistRaw[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<Artist[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(ArtistRaw & {relationships: ArtistRelationshipsRaw})[]>(`/catalog/${storefront}/artists/${id}`)

        if (raw) {
            return res;
        }

        // Apply flattening logic to relationships
        const items = res.data.map(item => {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as Artist

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