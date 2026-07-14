import type { FetchAPI, MusicKitResultWrapper } from "../..";
import type { Song, SongRaw } from "../../types/song";
import type { HeavyRotationItem, HeavyRotationItemRaw } from "../../types/heavyrotation";
import { flattenItem } from "../../util/flatten";
import type { MeHistoryRecentlyPlayedTracksProps, MeHistoryGenericProps } from "../../types/me";

export class MeHistoryResource {
    constructor(
        private fetch: FetchAPI,
        private getMediaUserToken: () => string | null | undefined,
    ) {}

    async getRecentlyPlayedTracks(props: MeHistoryRecentlyPlayedTracksProps, raw: true): Promise<MusicKitResultWrapper<SongRaw[]>>;
    async getRecentlyPlayedTracks(props: MeHistoryRecentlyPlayedTracksProps, raw?: false): Promise<MusicKitResultWrapper<Song[]>>;
    async getRecentlyPlayedTracks(props: MeHistoryRecentlyPlayedTracksProps, raw = false) {
        if (!this.getMediaUserToken()) {
            throw new Error("Media user token is required for this endpoint");
        }

        const queryParams = "?" + new URLSearchParams(props as Record<string, string> || {}).toString();

        const res = await this.fetch<SongRaw[]>(`/me/recent/played/tracks` + queryParams)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item))

        return {
            status: res.status,
            data: items,
            error: null
        }
    }

    async getHeavyRotation(props: MeHistoryGenericProps, raw: true): Promise<MusicKitResultWrapper<HeavyRotationItemRaw[]>>;
    async getHeavyRotation(props: MeHistoryGenericProps, raw?: false): Promise<MusicKitResultWrapper<HeavyRotationItem[]>>;
    async getHeavyRotation(props: MeHistoryGenericProps, raw = false) {
        if (!this.getMediaUserToken()) {
            throw new Error("Media user token is required for this endpoint");
        }

        const queryParams = "?" + new URLSearchParams(props as Record<string, string> || {}).toString();

        const res = await this.fetch<HeavyRotationItemRaw[]>(`/me/history/heavy-rotation` + queryParams)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as HeavyRotationItem)

        return {
            status: res.status,
            data: items,
            error: null
        }
    }
}
