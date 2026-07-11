import type { FetchAPI, MusicKitResultWrapper } from "../..";
import type { Storefront, StorefrontRaw } from "../../types/storefront";
import { flattenItem } from "../../util/flatten";
import { MeHistoryResource } from "./history";

export class MeResource {
    constructor(
        private fetch: FetchAPI,
        private getMediaUserToken: () => string | null | undefined,
    ) {}

    private _history?: MeHistoryResource

    get history() {
        return this._history ??= new MeHistoryResource(this.fetch, this.getMediaUserToken)
    }

    async getStorefront(raw: true): Promise<MusicKitResultWrapper<StorefrontRaw[]>>;
    async getStorefront(raw?: false): Promise<MusicKitResultWrapper<Storefront[]>>;
    async getStorefront(raw = false) {
        if (!this.getMediaUserToken()) {
            throw new Error("Missing required mediaUserToken");
        }

        const res = await this.fetch<StorefrontRaw[]>(`/me/storefront`)

        if (raw) {
            return res;
        }

        if (res.error !== null) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item))

        return {
            status: res.status,
            data: items,
            error: null
        }
    }
}
