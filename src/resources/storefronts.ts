import type { FetchAPI, MusicKitResultWrapper } from "..";
import type { Storefront, StorefrontRaw } from "../types/storefront";
import { flattenItem } from "../util/flatten";

export type GetStorefrontsProps = {
    l?: string;
    include?: string[];
    extend?: string[];
}

export type GetAllStorefrontsProps = GetStorefrontsProps & {
    limit?: number;
    offset?: number;
}

export class StorefrontsResource {
    constructor(private fetch: FetchAPI) {}

    async getAll(props?: GetAllStorefrontsProps, raw?: true): Promise<MusicKitResultWrapper<StorefrontRaw[]>>;
    async getAll(props?: GetAllStorefrontsProps, raw?: false): Promise<MusicKitResultWrapper<Storefront[]>>;
    async getAll(props?: GetAllStorefrontsProps, raw = false) {
        // autocomplete suggested the record, not sure why, but TS is black magic and without it it screams
        const queryParams = "?" + new URLSearchParams(props as Record<string, string> || {}).toString();

        const res = await this.fetch<StorefrontRaw[]>("/storefronts" + queryParams)

        if (raw || res.error) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Storefront)

        return {
            status: res.status,
            data: items,
            error: res.error
        }
    }

    async get(storefront: string, props?: GetStorefrontsProps, raw?: true): Promise<MusicKitResultWrapper<StorefrontRaw[]>>;
    async get(storefront: string, props?: GetStorefrontsProps, raw?: false): Promise<MusicKitResultWrapper<Storefront[]>>;
    async get(storefront: string, props?: GetStorefrontsProps, raw = false) {
        const queryParams = "?" + new URLSearchParams(props as Record<string, string> || {}).toString();

        const res = await this.fetch<StorefrontRaw[]>(`/storefronts/${storefront}` + queryParams)

        if (raw || res.error) {
            return res;
        }

        const items = res.data.map(item => flattenItem(item) as Storefront)

        return {
            status: res.status,
            data: items,
            error: res.error
        }
    }
}