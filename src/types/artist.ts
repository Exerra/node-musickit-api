import type { GenericRelationship } from "./relationships";

export interface ArtistRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
    relationships: ArtistRelationships & { albums: { next: string } };
}

export type Artist = {
    id:         string;
} & Attributes & { relationships: ArtistRelationships }

export interface ArtistRelationships {
    albums: GenericRelationship;
}

export interface Attributes {
    artwork:        Artwork;
    editorialNotes: EditorialNotes;
    genreNames:     string[];
    name:           string;
    url:            string;
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
    name:     string;
    short:    string;
    standard: string;
    tagline:  string;
}
