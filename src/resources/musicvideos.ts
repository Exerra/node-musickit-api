import type { FetchAPI } from "..";
import type { MusicVideoRaw, MusicVideoRelationships } from "../types/musicvideo";

export class MusicVideosResource {
    constructor(private fetch: FetchAPI) {}

    async get(storefront: string, id: string) {
        return this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationships})[]>(`/catalog/${storefront}/music-videos/${id}`)
    }

    async getByISRC(storefront: string, isrc: string) {
        return this.fetch<(MusicVideoRaw & {relationships: MusicVideoRelationships})[]>(`/catalog/${storefront}/music-videos?filter[isrc]=${encodeURIComponent(isrc)}`)
    }
}