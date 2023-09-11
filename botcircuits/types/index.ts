export enum ConnectionProtocol {
    HTTP = "http",
    WEBSOCKET = "websocket"
}

export interface Connection {
    protocol: ConnectionProtocol;
}

export interface Options {
    apiKey: string;
    appId: string;
    connection?: Connection
}