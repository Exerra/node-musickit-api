import type { PlayParams } from "./play";

export interface LibraryPlaylistRaw {
    id:         string;
    type:       string;
    href:       string;
    attributes: LibraryPlaylistAttributes;
}

export type LibraryPlaylist = {
    id:         string;
    type:       string;
} & LibraryPlaylistAttributes

export interface LibraryPlaylistAttributes {
    artwork:           LibraryPlaylistArtwork;
    canEdit:           boolean;
    dateAdded:         string;
    description:       LibraryPlaylistDescription;
    hasCatalog:        boolean;
    isPublic:          boolean;
    lastModifiedDate:  string;
    name:              string;
    playParams:        PlayParams & { globalId?: string; isLibrary?: boolean; };
}

export interface LibraryPlaylistArtwork {
    height:     number;
    url:        string;
    width:      number;
}

export interface LibraryPlaylistDescription {
    standard:   string;
}
