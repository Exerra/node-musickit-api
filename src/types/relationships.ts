import type { SearchType } from "./search";
import type { SongRaw } from "./song";

export type GenericRelationship = {
    href: string;
    data: Datum[];
}

export type TrackRelationship = {
    href: string;
    data: SongRaw[];
}

export interface Datum {
    id:   string;
    type: string;
    href: string;
}