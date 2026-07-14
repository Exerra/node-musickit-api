import type { GenericRelationship, GenericRelationshipRaw } from "./relationships";

export interface MusicVideoRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: MusicVideoAttributes;
}

export type MusicVideo = {
    id:         string;
    type:       string;
} & MusicVideoAttributes

export type MusicVideoRelationshipsRaw = Partial<Record<"albums" | "artists", GenericRelationshipRaw>>
export type MusicVideoRelationships = Partial<Record<"albums" | "artists", GenericRelationship>>

export interface MusicVideoAttributes {
    artistName:       string;
    artwork:          MusicVideoArtwork;
    durationInMillis: number;
    genreNames:       string[];
    has4K:            boolean;
    hasHDR:           boolean;
    isrc:             string;
    name:             string;
    playParams:       MusicVideoPlayParams;
    previews:         Preview[];
    releaseDate:      string;//Date;
    url:              string;
}

export interface MusicVideoArtwork {
    bgColor:    string;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
}

export interface MusicVideoPlayParams {
    id:   string;
    kind: string;
}

export interface Preview {
    artwork: MusicVideoArtwork;
    hlsUrl:  string;
    url:     string;
}
