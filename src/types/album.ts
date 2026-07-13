import type { PlayParams } from "./play";
import type { GenericRelationship, GenericRelationshipRaw, TrackRelationship, TrackRelationshipRaw } from "./relationships";

export interface AlbumRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: AlbumAttributes;
}

export type Album = {
    id:         string;
    type:       string;
} & AlbumAttributes

export type AlbumRelationships = {
    artists: GenericRelationship;
    tracks: TrackRelationship;
}

export type AlbumRelationshipsRaw = {
    artists: GenericRelationshipRaw;
    tracks: TrackRelationshipRaw;
}

export interface AlbumAttributes {
    artistName:          string;
    artwork:             AlbumArtwork;
    copyright:           string;
    editorialNotes:      AlbumEditorialNotes;
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

export interface AlbumArtwork {
    bgColor:    string;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
}

export interface AlbumEditorialNotes {
    short:    string;
    standard: string;
    tagline:  string;
}