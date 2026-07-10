import type { SearchType } from "./search";
import type { SongRaw } from "./song";

export type GenericRelationshipRaw = {
    href: string;
    data: Datum[];
}

export type GenericRelationship = Datum[]

export type TrackRelationshipRaw = {
    href: string;
    data: SongRaw[];
}

export type TrackRelationship = SongRaw[]

export interface Datum {
    id:   string;
    type: string;
    href: string;
}