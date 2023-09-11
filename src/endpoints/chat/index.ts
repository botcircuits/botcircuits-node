import {Options} from "../../types";
import {SubscriptionCallback, Request} from "./types";

export class Subscription {
    private _subscription;

    constructor(subscription: any) {
        this._subscription = subscription;
    }

    unsubscribe() {
       this._subscription.unsubscribe()
    }
}

export class ChatEndpoint {
    protected options: Options;

    constructor(options: Options) {
        this.options = options;
    }

    public async publish(request: Request): Promise<void> {
        throw Error("Not implemented")
    }

    public subscribe(sessionId: string, callback: SubscriptionCallback): Subscription {
        throw Error("Not implemented")
    }

    public async invoke(request: Request): Promise<any> {
        throw Error("Not implemented")
    }
}