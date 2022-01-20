
# A Microservice Server

a simple, express based server for creating microservices.

![Test](https://github.com/danielzzz/microservice-server/actions/workflows/test.yml/badge.svg)


## Installation

1) Clone this repository
```
git clone 
```

2) Install all the dependencies
```
yarn
```

3) Start the server
```
yarn start
```

4) In another window execute the test client
```
node client.js
```

5) make your own handler.js file

## How it works

the server listens for POST calls to /process 
then it passess the data to your handler function 
and returns a response to the client. 

I use it as a template for mini service servers:
- html2pdf processing
- web stats 
- etc..

## Example handlers

You can find example handlers in the src/handlers directory


## Test

```
yarn test
```

## Deploying on the server

It contains sample shipit and pm2 config files.


