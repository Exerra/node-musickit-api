// https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks#query-parameters
export type MeHistoryGenericProps = {
    l?: string;
    include?: string[];
    limit?: number;
    offset?: number;
    extend?: string[];
}

export type MeHistoryRecentlyPlayedTracksProps = MeHistoryGenericProps & {
    limit?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30; // Default - 30
    types?:("library-music-videos" | "library-songs" | "music-videos" | "songs")[];
}