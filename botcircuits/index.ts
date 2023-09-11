import {Connection, ConnectionProtocol, Options} from "./types";
import {ChatEndpoint} from "./endpoints/chat";
import {ChatEndpointImpl as WebSocketChatEndpoint } from "./endpoints/chat/connectors/websocket";

const defaultConnection: Connection = { protocol: ConnectionProtocol.WEBSOCKET };

function chatEndpointFactory(options: Options): ChatEndpoint {
    if (options.connection?.protocol === ConnectionProtocol.WEBSOCKET) {
        return new WebSocketChatEndpoint(options);
    } else {
        throw new Error("Connection protocol not supported")
    }
}

export class BotCircuitsClient {
    private options: Options;
    private readonly _chat: ChatEndpoint;

    constructor(options: Options) {
        // Assigning default values
        this.options = {
            connection: defaultConnection,
            ...options,
        };

        // Override the connection property with the default values if not provided
        this.options.connection = {
            ...defaultConnection,
            ...options.connection
        };

        this._chat = chatEndpointFactory(this.options);
    }

    public get chat(): ChatEndpoint {
        return this._chat
    }
}