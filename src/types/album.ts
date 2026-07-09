import type { PlayParams } from "./play";

export interface AlbumRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
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
    releaseDate:         Date;
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