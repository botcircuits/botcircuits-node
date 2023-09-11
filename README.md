# BotCircuits Node API Library

[![NPM version](https://img.shields.io/npm/v/botcircuits-sdk.svg)](https://npmjs.org/package/botcircuits-sdk)

## Installation

```sh
npm install --save botcircuits-sdk
# or
yarn add botcircuits-sdk
```

## Usage

The code below shows how to get started using the chat endpoint.

```js
import { BotCircuitsClient } from "botcircuits-sdk";

const botCircuitsClient = new BotCircuitsClient({
    appId: "my app id",
    apiKey: "my api key"
});

async function main() {
    const sessionId = "session-id"; // unique id
    const subscription = botCircuitsClient.chat.subscribe(sessionId, response => {
        console.log(response);
    });

    await botCircuitsClient.chat.publish({
        sessionId: sessionId,
        inputText: "hello"
    });
}

main();
```