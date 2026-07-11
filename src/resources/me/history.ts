import type { FetchAPI, MusicKitResultWrapper } from "../..";
import type { Song, SongRaw } from "../../types/song";
import { flattenItem } from "../../util/flatten";

// https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks#query-parameters
type MeHistoryProps = {
    l?: string;
    include?: string[];
    limit?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30; // Default - 30
    offset?: number;
    extend?: string[];
    types?: ("library-music-videos" | "library-songs" | "music-videos" | "songs")[];
}

export class MeHistoryResource {
    constructor(private fetch: FetchAPI, private mediaUserToken?: string) {}

    async getRecentlyPlayedTracks(props: MeHistoryProps, raw: true): Promise<MusicKitResultWrapper<SongRaw[]>>;
    async getRecentlyPlayedTracks(props: MeHistoryProps, raw?: false): Promise<MusicKitResultWrapper<Song[]>>;
    async getRecentlyPlayedTracks(props: MeHistoryProps, raw = false) {
        if (!this.mediaUserToken) {
            throw new Error("Media user token is required for this endpoint");
        }

        const queryParams = "?" + new URLSearchParams(props as Record<string, string> || {}).toString();

        const res = await this.fetch<SongRaw[]>(`/me/recent/played/tracks` + queryParams)

        if (raw || res.error) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item))

        return {
            status: res.status,
            data: items,
            error: res.error
        }
    }
}