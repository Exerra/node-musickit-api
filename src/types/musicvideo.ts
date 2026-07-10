import type { GenericRelationship, GenericRelationshipRaw } from "./relationships";

export interface MusicVideoRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
}

export type MusicVideo = {
    id:         string;
} & Attributes

export type MusicVideoRelationshipsRaw = Partial<Record<"albums" | "artists", GenericRelationshipRaw>>
export type MusicVideoRelationships = Partial<Record<"albums" | "artists", GenericRelationship>>

export interface Attributes {
    artistName:       string;
    artwork:          Artwork;
    durationInMillis: number;
    genreNames:       string[];
    has4K:            boolean;
    hasHDR:           boolean;
    isrc:             string;
    name:             string;
    playParams:       PlayParams;
    previews:         Preview[];
    releaseDate:      Date;
    url:              string;
}

export interface Artwork {
    bgColor:    string;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
}

export interface PlayParams {
    id:   string;
    kind: string;
}

export interface Preview {
    artwork: Artwork;
    hlsUrl:  string;
    url:     string;
}
