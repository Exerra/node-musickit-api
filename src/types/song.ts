import type { PlayParams } from "./play";
import type { GenericRelationship, GenericRelationshipRaw } from "./relationships";

export interface SongRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: SongAttributes;
}

export type Song = {
    id:         string;
    type:       string;
} & SongAttributes

export type SongRelationshipsRaw = Partial<Record<"albums" | "artists", GenericRelationshipRaw>>
export type SongRelationships = Partial<Record<"albums" | "artists", GenericRelationship>>

export interface SongAttributes {
    albumName:            string;
    artistName:           string;
    artwork:              SongArtwork;
    composerName:         string;
    discNumber:           number;
    durationInMillis:     number;
    genreNames:           string[];
    hasLyrics:            boolean;
    isAppleDigitalMaster: boolean;
    isrc:                 string;
    name:                 string;
    playParams:           PlayParams;
    previews:             SongPreview[];
    releaseDate:          string;//Date;
    trackNumber:          number;
    url:                  string;
}

export interface SongArtwork {
    bgColor:    string;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
}

export interface SongPreview {
    url: string;
}