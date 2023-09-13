# BotCircuits Node API Library

[![NPM version](https://img.shields.io/npm/v/botcircuits.svg)](https://npmjs.org/package/botcircuits)

[BotCircuits](https://botcircuits.com/#demo) is a No-Code AI platform enables effortless creation of intelligent chatbots with human-like conversational capabilities.

This library provides access to the BotCircuits REST API from TypeScript or JavaScript

To learn how more about BotCircuits, check out our [Product Demo](https://botcircuits.com/#demo)

## Installation

```sh
npm install --save botcircuits
# or
yarn add botcircuits
```

## Usage

The code below shows how to get started using the chat endpoint.

```js
import { BotCircuitsClient } from "botcircuits";

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