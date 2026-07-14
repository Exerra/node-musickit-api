import type { Album, AlbumRaw, AlbumRelationships, AlbumRelationshipsRaw } from "../types/album"
import type { FetchAPI, MusicKitResultWrapper } from "../index"
import { flattenItem } from "../util/flatten"

export class AlbumsResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(Album & {relationships: AlbumRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>(`/catalog/${storefront}/albums/${id}`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Album & {relationships: AlbumRelationships})

        return {
            status: res.status,
            data: items,
            error: null
        }
    }

    async getByUPC(storefront: string, upc: string, raw: true): Promise<MusicKitResultWrapper<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>>;
    async getByUPC(storefront: string, upc: string, raw?: false): Promise<MusicKitResultWrapper<(Album & {relationships: AlbumRelationships})[]>>;
    async getByUPC(storefront: string, upc: string, raw = false) {
        const res = await this.fetch<(AlbumRaw & {relationships: AlbumRelationshipsRaw})[]>(`/catalog/${storefront}/albums?filter[upc]=${encodeURIComponent(upc)}`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Album & {relationships: AlbumRelationships})

        return {
            status: res.status,
            data: items,
            error: null
        }
    }
}
