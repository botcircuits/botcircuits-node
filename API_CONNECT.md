### BotCircuits WebSocket Integration Guide

### Initialize WebSocket Connection
#####  wss://pubsub.botcircuits.com/graphql/realtime
#####  Send Connection Initialization
```json
{
  "type": "connection_init"
}
```
##### Send Subscription Query
```
{
  "id": "{SESSION_ID}",
  "payload": {
    "data": subscription Subscribe() {
              subscribeBotMessage(appId: {APP_ID}, sessionId: {SESSION_ID}) {
                data
                appId
                sessionId
              }
            },
    "extensions": {
      "authorization": {
        "Authorization": "{ACCESS_KEY}",
        "host": "{HOST}",
        "x-amz-user-agent": "aws-amplify/4.7.14 js"
      }
    }
  },
  "type": "start"
}
```

### Handle Incoming Messages
##### Incoming Message Structure:
```
{
  "type": "data",
  "payload": {
    "data": {
      "subscribeBotMessage": {
        "data": "{MESSAGE_DATA_JSON}",
        "appId": "{APP_ID}",
        "sessionId": "{SESSION_ID}"
      }
    }
  }
}
```
### Publish Messages
```
{
  "query": "mutation Publish() {
          sendUserMessage(data: {DATA}, appId: {APP_ID}, sessionId: {SESSION_ID}) {
            data
            appId
            sessionId
          }
        }",
  "variables": {
    "appId": "{APP_ID}",
    "sessionId": "{SESSION_ID}",
    "data": "{MESSAGE_PAYLOAD_JSON}"
  }
}
```
