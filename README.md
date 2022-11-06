# Forex-trading-application

Forex trading application to make mock trades. You can trade JPY(Japanese yen) for USD(Dolar). First, it's necessary to create an account and login. Then, every user starts with 5000JPY and 5000USD and can make mock trades and look their own past trades.

## How to run this app locally?

First, it's necessary to use or create your account on https://twelvedata.com/account, and get your own api key
There are two folders, frontend and backend.

You will need to create a .env on the root folder with the following variables:

PORT={PORT}
API_KEY=YOUR_API_KEY
MONGO_URL=YOUR_MONGO_URL
JWT_SECRET=YOUR_JWT_SECRET
WEBSOCKET_PORT=WEBSOCKET_PORT
REACT_APP_SOCKET_URL={SOCKET_URL} ex 'http://localhost:{WEBSOCKET_PORT}'

Next your will need to run the following commands on the root folder:

```
npm build
npm start

```

## Techonologies:

- React.JS
- Material UI
- WebSocket
- Typescript
- Jest
- Node.JS
- Express.JS
- RESTful API
- MongoDB

Link to see the application:
https://forex-trading-mock-app.herokuapp.com/
