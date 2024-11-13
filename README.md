# Service Worker Example in an iframe

Service Worker only works on `https://` sites or `localhost`.

This example app tests the following:
- Service Worker works within an iframe
- Service Worker works within an iframe embedded in a parent page hosted using `file://` protocol

As a result, in all cases, the Service Worker works fine.

## Setup

1. `npm install`

## Check Service Worker

1. `npm run start:child-with-sw`
2. Open `http://localhost:3011`
3. The react app will display its Service Worker status

## Check Service Worker in an iframe

1. `npm run start:child-with-sw`
2. `npm run start:parent`
3. Open `http://localhost:3010`
4. The react app within the iframe will display its Service Worker status

## Check Service Worker in iframe in the parent app that hosted on file://

1. `npm run start:child-with-sw`
2. Drag `packages/parent/index.html` file into your browser
3. The React app within the iframe will display its Service Worker status
