import type { PlayParams } from "./play";
import type { GenericRelationship, GenericRelationshipRaw, TrackRelationship, TrackRelationshipRaw } from "./relationships";

export interface AlbumRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
}

export type Album = {
    id:         string;
} & Attributes

export type AlbumRelationships = {
    artists: GenericRelationship;
    tracks: TrackRelationship;
}

export type AlbumRelationshipsRaw = {
    artists: GenericRelationshipRaw;
    tracks: TrackRelationshipRaw;
}

export interface Attributes {
    artistName:          string;
    artwork:             Artwork;
    copyright:           string;
    editorialNotes:      EditorialNotes;
    genreNames:          string[];
    isCompilation:       boolean;
    isComplete:          boolean;
    isMasteredForItunes: boolean;
    isSingle:            boolean;
    name:                string;
    playParams:          PlayParams;
    recordLabel:         string;
    releaseDate:         string;//Date;
    trackCount:          number;
    upc:                 string;
    url:                 string;
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

export interface EditorialNotes {
    short:    string;
    standard: string;
    tagline:  string;
}