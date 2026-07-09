// https://developer.apple.com/documentation/applemusicapi/search-for-catalog-resources-(by-type)#:~:text=objects%20to%20fetch.-,types,-%5Bstring%5D
export type SearchType = "activities" | "albums" | "apple-curators" | "artists" | "curators" | "music-videos" | "playlists" | "record-labels" | "songs" | "stations";

export type SearchParams = {
    term: string;
    types: SearchType[];
    l?: string;
    // ? Could there be a cleaner way to do this?
    limit?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25;
    offset?: number;
    // No idea what this does. Keeping for full parity. Needs research.
    // https://developer.apple.com/documentation/applemusicapi/search-for-catalog-resources-(by-type)#:~:text=labels%2C%20songs%2C%20stations-,with,-%5Bstring%5D
    with?: string[];
}

export interface SearchResultRaw {
    results: Partial<Record<SearchType, {
        href: string;
        next?: string;
        data: any[];
    }>>;
    meta: {
        results: {
            order: SearchType[];
            rawOrder: SearchType[];
        }
    }
}