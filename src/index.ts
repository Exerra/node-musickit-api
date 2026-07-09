import type { SearchParams, SearchResult, SearchResultRaw } from "./types/search";
import { createJWT } from "./util/jwt";

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

    async auth() {
        this.token = await createJWT(this.key);
        return true
    }

    // Resolves issue #10
    async testAuth() {
        const req = await fetch("https://api.music.apple.com/v1/test", {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })

        return req.status
    }

    // TODO make the SearchResult and SearchResultRaw type dynamically list what keys will be returned based on the params
    // TODO make the return value vary based on the raw param. If raw is true, return SearchResultRaw, else return SearchResult
    async search(storefront: string, params: SearchParams, raw = false): Promise<MusicKitResultWrapper<SearchResultRaw>> {
        const searchparams = new URLSearchParams(params as any)

        const req = await fetch(`https://api.music.apple.com/v1/catalog/${storefront}/search?${searchparams.toString()}`, {
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

        let temp = {
            nextOffset: null as number | null,
            results: {}
        } as SearchResult

        const nextOffsetHref = body.results[Object.keys(body.results)[0] as keyof typeof body.results]?.next

        if (nextOffsetHref) {
            const nextOffsetUrl = new URL(this.baseUrl + nextOffsetHref)
            const nextOffsetParam = nextOffsetUrl.searchParams.get("offset")

            if (nextOffsetParam) {
                temp.nextOffset = parseInt(nextOffsetParam)
            }
        }

        for (const key of Object.keys(body.results)) {
            const result = body.results[key as keyof typeof body.results]

            if (!result) continue

            let results = []
        
            for (const item of result.data) {
                results.push({
                    id: item.id,
                    ...item.attributes
                })
            }

            temp.results[key as keyof typeof body.results] = results
        }

        return {
            status: req.status,
            data: temp,
            error: req.status !== 200 ? await req.text() : null
        }
    }
}