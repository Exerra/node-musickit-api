import type { SearchType } from "./search";

export interface Relationship {
    href: string;
    data: Datum[];
}

export type Relationships = Partial<Record<SearchType, Relationship>>

export interface Datum {
    id:   string;
    type: string;
    href: string;
}