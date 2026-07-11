import type { FetchAPI } from "../..";
import { MeHistoryResource } from "./history";

export class MeResource {
    constructor(private fetch: FetchAPI, private mediaUserToken?: string) {}

    private _history?: MeHistoryResource

    get history() {
        return this._history ??= new MeHistoryResource(this.fetch, this.mediaUserToken ?? undefined)
    }
}