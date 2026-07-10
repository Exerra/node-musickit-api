import type { Album, AlbumRaw, AlbumRelationships, AlbumRelationshipsRaw } from "../types/album"
import type { FetchAPI, MusicKitResultWrapper } from "../index"

export class AlbumsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(Album & {relationships: AlbumRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>(`/catalog/${storefront}/albums/${id}`)

        if (raw) {
            return res;
        }

        // Apply flattening logic to relationships
        const items = res.data.map(item => {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as Album & {relationships: AlbumRelationships}

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

    async getByUPC(storefront: string, upc: string, raw: true): Promise<MusicKitResultWrapper<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>>;
    async getByUPC(storefront: string, upc: string, raw?: false): Promise<MusicKitResultWrapper<(Album & {relationships: AlbumRelationships})[]>>;
    async getByUPC(storefront: string, upc: string, raw = false) {
        const res = await this.fetch<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>(`/catalog/${storefront}/albums?filter[upc]=${encodeURIComponent(upc)}`)

        if (raw) {
            return res;
        }

        // Apply flattening logic to relationships
        const items = res.data.map(item => {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as Album & {relationships: AlbumRelationships}

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
