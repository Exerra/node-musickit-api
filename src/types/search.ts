import type { AlbumRaw, Album } from "./album";
import type { SongRaw, Song } from "./song";

// https://developer.apple.com/documentation/applemusicapi/search-for-catalog-resources-(by-type)#:~:text=objects%20to%20fetch.-,types,-%5Bstring%5D
export type SearchType = "activities" | "albums" | "apple-curators" | "artists" | "curators" | "music-videos" | "playlists" | "record-labels" | "songs" | "stations";

interface SearchRawTypeMap {
  songs: SongRaw;
  albums: AlbumRaw;
}

interface SearchParsedTypeMap {
  songs: Song;
  albums: Album;
}

type KnownSearchType = keyof SearchRawTypeMap & SearchType;

type RawBlock = {
  [K in SearchType]: K extends KnownSearchType
    ? { href: string; next?: string; data: SearchRawTypeMap[K][] }
    : { href: string; next?: string; data: any[] };
}[SearchType];

type ParsedBlock = {
  [K in SearchType]: K extends KnownSearchType
    ? SearchParsedTypeMap[K][]
    : any[];
}[SearchType];

export type SearchParams = {
    term: string;
    types: SearchType[];
    l?: string;
    limit?: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25;
    offset?: number;
    with?: string[];
}

export interface SearchResultRaw {
    results: Partial<Record<SearchType, RawBlock>>;
    meta: {
        results: {
            order: SearchType[];
            rawOrder: SearchType[];
        }
    }
}

export interface SearchResult {
    nextOffset: number | null;
    results: Partial<Record<SearchType, ParsedBlock>>;
}