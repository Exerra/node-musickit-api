import type { PlayParams } from "./play";

export interface LibraryPlaylistRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: Attributes;
}

export type LibraryPlaylist = {
    id:         string;
} & Attributes

export interface Attributes {
    artwork:           Artwork;
    canEdit:           boolean;
    dateAdded:         string;
    description:       Description;
    hasCatalog:        boolean;
    isPublic:          boolean;
    lastModifiedDate:  string;
    name:              string;
    playParams:        PlayParams & { globalId?: string; isLibrary?: boolean; };
}

export interface Artwork {
    height:     number;
    url:        string;
    width:      number;
}

export interface Description {
    standard:   string;
}
