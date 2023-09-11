import {API, GraphQLQuery, GraphQLSubscription} from '@aws-amplify/api';
import Amplify from '@aws-amplify/core'
import {graphqlOperation} from "aws-amplify";
import {GRAPHQL_API, REGION} from "../../../../configs";
import {Options} from "../../../../types";
import {Request, SubscriptionCallback, SubscriptionErrorCallback} from "../../types";
import {ChatEndpoint, Subscription} from "../../index";

Amplify.configure({
    "aws_appsync_region": REGION,
    "aws_appsync_graphqlEndpoint": GRAPHQL_API,
    "aws_appsync_authenticationType": "AWS_LAMBDA",
    "aws_appsync_apiKey": "null",
})

const subscribeBotMessageDoc = /* GraphQL */ `
    subscription Subscribe($appId: String!, $sessionId: String!) {
        subscribeBotMessage(appId: $appId, sessionId: $sessionId) {
            data
            appId
            sessionId
        }
    }
`;

const sendUserMessageDoc = /* GraphQL */ `
    mutation Publish($data: AWSJSON!, $appId: String!, $sessionId: String!) {
        sendUserMessage(data: $data, appId: $appId, sessionId: $sessionId) {
            data
            appId
            sessionId
        }
    }
`;

interface BotMessageData {
    appId: string;
    sessionId: string;
    data: any;
}

async function sendUserMessage(
    options: Options,
    sessionId: string,
    data: any
): Promise<any> {
    const { appId, apiKey: authToken } = options;
    return await API.graphql<GraphQLQuery<any>>({
        query: sendUserMessageDoc,
        variables: { appId, sessionId, data },
        authToken
    });
}

function subscribeBotMessage(
    options: Options,
    sessionId: string,
    next: (botMessageData: any) => void,
    error: ((err: any) => void) | null = console.log
): any {
    const { appId, apiKey: authToken } = options;
    return API.graphql<GraphQLSubscription<BotMessageData>>(
        graphqlOperation(subscribeBotMessageDoc, { appId, sessionId }, authToken),
    ).subscribe({
        next: ({ value }) => {
            next(value.data);
        },
        error: error || console.error,
    });
}

export class ChatEndpointImpl extends ChatEndpoint {
    constructor(options: Options) {
        super(options);
    }

    async publish(request: Request): Promise<void> {
        const _request = JSON.stringify({
            action:"executor",
            appId: this.options.appId,
            sessionId: request.sessionId,
            inputText: request.inputText
        })
        return await sendUserMessage(
            this.options,
            request.sessionId,
            _request
        )
    }

    subscribe(sessionId: string, callback: SubscriptionCallback, errorCallback?: SubscriptionErrorCallback): Subscription {
        const subscription = subscribeBotMessage(
            this.options,
            sessionId,
            (botMessageData => {
                try {
                    callback(JSON.parse(botMessageData.subscribeBotMessage.data));
                } catch (err) {
                    if (errorCallback) {
                        errorCallback(new Error("Unable to parse response"))
                    }
                }
            }),
            err => {
                if (errorCallback) {
                    errorCallback(err)
                }
            }
        )
        return new Subscription(subscription);
    }

    async invoke(request: Request): Promise<any> {
        throw new Error("Not supported")
    }
}
