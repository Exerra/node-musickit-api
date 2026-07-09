import type { PlayParams } from "./play";

export interface SongRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
}

export interface Attributes {
    albumName:            string;
    artistName:           string;
    artwork:              Artwork;
    composerName:         string;
    discNumber:           number;
    durationInMillis:     number;
    genreNames:           string[];
    hasLyrics:            boolean;
    isAppleDigitalMaster: boolean;
    isrc:                 string;
    name:                 string;
    playParams:           PlayParams;
    previews:             Preview[];
    releaseDate:          Date;
    trackNumber:          number;
    url:                  string;
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

export interface Preview {
    url: string;
}