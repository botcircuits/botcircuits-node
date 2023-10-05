import { customAlphabet } from "nanoid";
import {Options} from "../../types";
import {SubscriptionCallback, Request, SubscriptionErrorCallback} from "./types";

const customNanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 15)

export class Subscription {
    private _subscription;

    constructor(subscription: any) {
        this._subscription = subscription;
    }

    unsubscribe() {
       this._subscription.unsubscribe()
    }
}

export class ChatResource {
    protected options: Options;

    constructor(options: Options) {
        this.options = options;
    }

    public createSessionId(): string {
        return customNanoid();
    }

    public async publish(request: Request): Promise<void> {
        throw Error("Not implemented")
    }

    public subscribe(sessionId: string, callback: SubscriptionCallback, errorCallback?: SubscriptionErrorCallback): Subscription {
        throw Error("Not implemented")
    }

    public async invoke(request: Request): Promise<any> {
        throw Error("Not implemented")
    }
}