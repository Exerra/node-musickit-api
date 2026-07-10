import type { FetchAPI, MusicKitResultWrapper } from "..";
import type { MusicVideo, MusicVideoRaw, MusicVideoRelationships, MusicVideoRelationshipsRaw } from "../types/musicvideo";
import { flattenItem } from "../util/flatten";

export class MusicVideosResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string, raw: true): Promise<MusicKitResultWrapper<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>>;
    async get(storefront: string, id: string, raw?: false): Promise<MusicKitResultWrapper<(MusicVideo & {relationships: MusicVideoRelationships})[]>>;
    async get(storefront: string, id: string, raw = false) {
        const res = await this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>(`/catalog/${storefront}/music-videos/${id}`)
        
        if (raw) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item))

        return {
            status: res.status,
            data: items,
            error: res.error
        };
    }

    async getByISRC(storefront: string, isrc: string, raw: true): Promise<MusicKitResultWrapper<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>>;
    async getByISRC(storefront: string, isrc: string, raw?: false): Promise<MusicKitResultWrapper<(MusicVideo & {relationships: MusicVideoRelationships})[]>>;
    async getByISRC(storefront: string, isrc: string, raw = false) {
        const res = await this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationshipsRaw})[]>(`/catalog/${storefront}/music-videos?filter[isrc]=${encodeURIComponent(isrc)}`)

        if (raw) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item))

        return {
            status: res.status,
            data: items,
            error: res.error
        };
    }
}