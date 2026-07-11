import type { SongRaw, Song } from "./song";
import type { AlbumRaw, Album } from "./album";
import type { LibraryPlaylistRaw, LibraryPlaylist } from "./libraryplaylist";

export type HeavyRotationItemRaw =
    | (SongRaw & { type: "songs" })
    | (AlbumRaw & { type: "albums" })
    | (LibraryPlaylistRaw & { type: "library-playlists" });

export type HeavyRotationItem = Song | Album | LibraryPlaylist;
