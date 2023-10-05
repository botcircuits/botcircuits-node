export interface Request {
    sessionId: string;
    inputText: any;
}

export interface Response {
    sessionId: string;
    data: any;
}

export type SubscriptionCallback = (response: any) => void;

export type SubscriptionErrorCallback = (err: any) => void;