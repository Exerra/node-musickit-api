import type { GenericRelationship, GenericRelationshipRaw } from "./relationships";

export interface ArtistRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: ArtistAttributes;
    relationships: ArtistRelationshipsRaw & { albums: { next: string } };
}

export type Artist = {
    id:         string;
    type:       string;
} & ArtistAttributes & { relationships: ArtistRelationships }

export interface ArtistRelationships {
    albums: GenericRelationship;
}

export interface ArtistRelationshipsRaw {
    albums: GenericRelationshipRaw;
}

export interface ArtistAttributes {
    artwork:        ArtistArtwork;
    editorialNotes: ArtistEditorialNotes;
    genreNames:     string[];
    name:           string;
    url:            string;
}

export interface ArtistArtwork {
    bgColor:    string;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
}

export interface ArtistEditorialNotes {
    name:     string;
    short:    string;
    standard: string;
    tagline:  string;
}
