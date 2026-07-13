import type { SearchParams, SearchResult, SearchResultRaw, SearchType } from "./types/search";
import { createJWT } from "./util/jwt";
import { flattenItem } from "./util/flatten";
import { SongsResource } from "./resources/songs";
import { AlbumsResource } from "./resources/albums";
import { ArtistsResource } from "./resources/artists";
import { MusicVideosResource } from "./resources/musicvideos";
import { StorefrontsResource } from "./resources/storefronts";
import { MeResource } from "./resources/me";

export type MusicKitProps = {
    key: {
        id: string;
        teamId: string;
        p8: string;
    },
    mediaUserToken?: string;
}

export type MusicKitResultWrapper<T> =
    | { status: number; data: T; error: null }
    | { status: number; data: null; error: string }

export type FetchAPI = <T>(path: string, opts?: BunFetchRequestInit) => Promise<MusicKitResultWrapper<T>>

export class MusicKit {
    // Public in case users want to proxy the URL or use a local server for testing
    public baseUrl = "https://api.music.apple.com/v1";

    token: string | null = null;
    // Single source of truth for personalised routes (injected as Music-User-Token on each request)
    mediaUserToken: string | null = null;

    // Mostly to allow users to add origin headers, etc.
    headers: Record<string, string> = {}

    private key: MusicKitProps['key'];

    constructor(props: MusicKitProps) {
        if (!props.key.id || !props.key.teamId || !props.key.p8) {
            throw new Error("Missing required key properties");
        }

        if (props.mediaUserToken) {
            this.mediaUserToken = props.mediaUserToken;
        }

        this.key = props.key;
    }

    private getRequestHeaders(): Record<string, string> {
        return {
            "Authorization": `Bearer ${this.token}`,
            ...this.headers,
            ...(this.mediaUserToken ? { "Music-User-Token": this.mediaUserToken } : {}),
        }
    }

    // Was private, made public for extendability.
    async fetchAPI<T>(path: string, opts?: BunFetchRequestInit): Promise<MusicKitResultWrapper<T>> {
        if (!this.token) {
            throw new Error("You must call auth() before making requests")
        }

        const req = await fetch(`${this.baseUrl}${path}`, {
            headers: this.getRequestHeaders(),
            ...opts
        })

        if (req.status >= 300 || req.status < 200) {
            return {
                status: req.status,
                data: null,
                error: await req.text()
            }
        }

        const body = await req.json() as { data: T }

        if (!body) {
            return {
                status: req.status,
                data: null as T,
                error: null
            }
        }

        return {
            status: req.status,
            data: (body.data ?? null) as T,
            error: null
        }
    }

    private _songs?: SongsResource
    private _albums?: AlbumsResource
    private _artists?: ArtistsResource
    private _musicVideos?: MusicVideosResource
    private _storefronts?: StorefrontsResource
    private _me?: MeResource

    get songs() {
        return this._songs ??= new SongsResource(<T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts))
    }

    get albums() {
        return this._albums ??= new AlbumsResource(<T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts))
    }

    get artists() {
        return this._artists ??= new ArtistsResource(<T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts))
    }

    get musicVideos() {
        return this._musicVideos ??= new MusicVideosResource(<T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts))
    }

    get storefronts() {
        return this._storefronts ??= new StorefrontsResource(<T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts))
    }

    get me() {
        return this._me ??= new MeResource(
            <T>(path: string, opts?: BunFetchRequestInit) => this.fetchAPI<T>(path, opts),
            () => this.mediaUserToken,
        )
    }

    async auth() {
        this.token = await createJWT(this.key);
        return true
    }

    // Resolves issue #10
    async testAuth() {
        if (!this.token) {
            throw new Error("You must call auth() before making requests")
        }

        const req = await fetch(`${this.baseUrl}/test`, {
            headers: this.getRequestHeaders()
        })

        return req.status
    }

    async search(storefront: string, params: SearchParams, raw: true): Promise<MusicKitResultWrapper<SearchResultRaw>>;
    async search(storefront: string, params: SearchParams, raw?: false): Promise<MusicKitResultWrapper<SearchResult>>;
    async search(storefront: string, params: SearchParams, raw = false): Promise<MusicKitResultWrapper<SearchResultRaw | SearchResult>> {
        if (!this.token) {
            throw new Error("You must call auth() before making requests")
        }
        
        const searchparams = new URLSearchParams(params as any)

        // Search response shape is { results, meta }, not { data }, so it cannot use fetchAPI as-is.
        const req = await fetch(`${this.baseUrl}/catalog/${storefront}/search?${searchparams.toString()}`, {
            headers: this.getRequestHeaders()
        })

        if (req.status >= 300 || req.status < 200) {
            return {
                status: req.status,
                data: null,
                error: await req.text()
            }
        }

        const body = await req.json() as SearchResultRaw

        if (raw) {
            return {
                status: req.status,
                data: body,
                error: null
            }
        }

        const temp: SearchResult = {
            nextOffset: null,
            results: {}
        }

        const firstKey = Object.keys(body.results)[0] as SearchType | undefined
        const nextOffsetHref = firstKey ? body.results[firstKey]?.next : undefined

        if (nextOffsetHref) {
            const nextOffsetUrl = new URL(this.baseUrl + nextOffsetHref)
            const nextOffsetParam = nextOffsetUrl.searchParams.get("offset")

            if (nextOffsetParam) {
                temp.nextOffset = parseInt(nextOffsetParam)
            }
        }

        for (const key of Object.keys(body.results) as SearchType[]) {
            const result = body.results[key]

            if (!result) continue

            (temp.results as any)[key] = result.data.map(item => flattenItem(item))
        }

        return {
            status: req.status,
            data: temp,
            error: null
        }
    }

}

// Export every type from the types folder for convenience
export * from "./types/album"
export * from "./types/artist"
export * from "./types/song"
export * from "./types/musicvideo"
export * from "./types/storefront"
export * from "./types/search"