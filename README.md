# Forex-trading-application
Forex trading application to make mock trades. You can trade JPY(Japanese yen) for USD(Dolar). First, it's necessary to create an account and login. Then, every user starts with 5000JPY and 5000USD and can make mock trades andlook their own past trades.

## How to run this app locally?
First, it's necessary to use your account on https://twelvedata.com/account, and get your own api key
There are two folders, frontend and backend. 
You will need to create a .env file on both:

On the backend:
~~~~
PORT_1={PORT_1}
PORT_2={PORT_2}
API_KEY=YOUR_API_KEY
MONGO_URL=YOUR_MONGO_URL
JWT_SECRET=YOUR_JWT_SECRET
~~~~

On the frontend:
~~~~
REACT_APP_API_PORT={PORT_1}
REACT_APP_SOCKET_PORT={PORT_2}
~~~~

To start the backend, enter the /backend folder and run: 
~~~~
npm install
npm start 
~~~~
To start the frontend, enter the /frontend folder and run: 
~~~~
npm install
npm start
~~~~


## Techonologies:
* React.JS
* WebSocket
* Typescript
* Jest
* Node.JS
* Express.JS
* RESTful API
* MongoDB
