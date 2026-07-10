import type { FetchAPI, MusicKitResultWrapper } from "..";
import type { MusicVideo, MusicVideoRaw, MusicVideoRelationships, MusicVideoRelationshipsRaw } from "../types/musicvideo";

export class MusicVideosResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(MusicVideo & {relationships: MusicVideoRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>(`/catalog/${storefront}/music-videos/${id}`)
        
        if (raw) {
            return res;
        }

        let items = []

        for (const item of res.data) {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as any
        

            // Applies the same flattening logic to relationships as well, if they exist. The relationship object *also* contains the very same next and href fields.
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
            items.push(tempItem)
        }

        return {
            status: res.status,
            data: items,
            error: res.error
        };
    }

    async getByISRC(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>>;
    async getByISRC(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(MusicVideo & {relationships: MusicVideoRelationships})[]>>;
    async getByISRC(storefront: string, isrc: string, raw = false) {
        const res = await this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>(`/catalog/${storefront}/music-videos?filter[isrc]=${encodeURIComponent(isrc)}`)

        if (raw) {
            return res;
        }

        let items = []

        for (const item of res.data) {
            let tempItem = {
                id: item.id,
                ...item.attributes
            } as any
        

            // Applies the same flattening logic to relationships as well, if they exist. The relationship object *also* contains the very same next and href fields.
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
            items.push(tempItem)
        }

        return {
            status: res.status,
            data: items,
            error: res.error
        };
    }
}