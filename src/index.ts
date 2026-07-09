import type { SearchParams, SearchResult, SearchResultRaw, SearchType } from "./types/search";
import { createJWT } from "./util/jwt";
import { SongsResource } from "./resources/songs";
import { AlbumsResource } from "./resources/albums";
import { ArtistsResource } from "./resources/artists";
import { MusicVideosResource } from "./resources/musicvideos";

export type MusicKitProps = {
    key: {
        id: string;
        teamId: string;
        p8: string;
    }
}

export type MusicKitResultWrapper<T> = {
    status: number;
    data: T;
    error: string | null;
}

export type FetchAPI = <T>(path: string) => Promise<MusicKitResultWrapper<T>>

export class MusicKit {
    // Public in case users want to proxy the URL or use a local server for testing
    public baseUrl = "https://api.music.apple.com/v1";

    private token: string | null = null;
    private key: MusicKitProps['key'];

    constructor(props: MusicKitProps) {
        if (!props.key.id || !props.key.teamId || !props.key.p8) {
            throw new Error("Missing required key properties");
        }

        this.key = props.key;
    }

    private async fetchAPI<T>(path: string): Promise<MusicKitResultWrapper<T>> {
        const req = await fetch(`${this.baseUrl}${path}`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })

        const body = await req.json() as { data: T }

        return {
            status: req.status,
            data: body.data,
            error: req.status !== 200 ? await req.text() : null
        }
    }

    private _songs?: SongsResource
    private _albums?: AlbumsResource
    private _artists?: ArtistsResource
    private _musicVideos?: MusicVideosResource

    get songs() {
        return this._songs ??= new SongsResource(<T>(path: string) => this.fetchAPI<T>(path))
    }

    get albums() {
        return this._albums ??= new AlbumsResource(<T>(path: string) => this.fetchAPI<T>(path))
    }

    get artists() {
        return this._artists ??= new ArtistsResource(<T>(path: string) => this.fetchAPI<T>(path))
    }

    get musicVideos() {
        return this._musicVideos ??= new MusicVideosResource(<T>(path: string) => this.fetchAPI<T>(path))
    }

    async auth() {
        this.token = await createJWT(this.key);
        return true
    }

    // Resolves issue #10
    async testAuth() {
        const req = await fetch(`${this.baseUrl}/test`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })

        return req.status
    }

    async search(storefront: string, params: SearchParams, raw: true): Promise<MusicKitResultWrapper<SearchResultRaw>>;
    async search(storefront: string, params: SearchParams, raw?: false): Promise<MusicKitResultWrapper<SearchResult>>;
    async search(storefront: string, params: SearchParams, raw = false): Promise<MusicKitResultWrapper<SearchResultRaw | SearchResult>> {
        const searchparams = new URLSearchParams(params as any)

        // Refactor to fetchAPI? Not sure if it would be worth it, access to the raw data is needed and it would be another step. Only really makes the raw response code nicer.
        const req = await fetch(`${this.baseUrl}/catalog/${storefront}/search?${searchparams.toString()}`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })

        const body = await req.json() as SearchResultRaw

        if (raw) {
            return {
                status: req.status,
                data: body,
                error: req.status !== 200 ? await req.text() : null
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

        // Removes unnecessary fields like href and next (which is already handled by nextOffset)
        for (const key of Object.keys(body.results) as SearchType[]) {
            const result = body.results[key]

            if (!result) continue

            const items: any[] = []
        
            for (const item of result.data) {
                let tempItem = {
                    id: item.id,
                    ...item.attributes
                }

                // Applies the same flattening logic to relationships as well, if they exist. The relationship object *also* contains the very same next and href fields.
                if (item.relationships) {
                    for (const relKey of Object.keys(item.relationships)) {
                        const rel = item.relationships[relKey as keyof typeof item.relationships]

                        if (rel && rel.data) {
                            tempItem = {
                                ...tempItem,
                                relationships: {
                                    ...(tempItem.relationships ?? {}),
                                    [relKey]: rel.data
                                }
                            }
                        }
                    }
                }
                items.push(tempItem)
            }

            (temp.results as any)[key] = items
        }

        return {
            status: req.status,
            data: temp,
            error: req.status !== 200 ? await req.text() : null
        }
    }

}
