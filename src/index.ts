import type { SearchParams, SearchResultRaw } from "./types/search";
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
}