# 1inch-swap-implementation

### Project Overview

- Project Name: 1inch-swap-implementation
- Author: Tigran Bayramyan
- Contact: tigran.bayramyan3@gmail.com

## Description

This project consists of two parts: back-end and front-end.

## Back-end (BFF)

The back-end is a BFF (Backend For Frontend), which serves as a wrapper to bypass CORS errors and provides two routes.

1. Route for retrieving tokens from the 1inch website: This route is used to fetch information about tokens from the 1inch website. It is intended for interaction with the front-end part of the project.
2. Route for token exchange: This route allows for the exchange of two tokens.

## Front-end

The front-end consists of several components. The main functionality is the ability to select two tokens and view information about their exchange, depending on the number of tokens you will display.

## Project goals

1. sadavat udobni oben tokenov dlya polzvatelex

## Installation

To get started with the project, follow these steps:

## 1. Install Dependencies:

Run the following commands in your terminal:

This will install project dependencies and perform necessary post-installation steps.

## Back-end

`yarn` or `npm install`

## Front-end

`yarn` or `npm install`

## 2.Run Development Server:

Start the development server using the following command:

## Back-end

`yarn start` or `npm start`

## Front-end

`yarn dev` or `npm run dev`

## Dependencies

The project relies on the following external libraries and tools:

## Back-end

**Dependencies**:

- **@types/express**: TypeScript definitions for Express.js. (^4.17.21)
- **axios**: A promise-based HTTP client for the browser and Node.js. (^1.6.8)
- **cors**: CORS middleware for Express.js. (^2.8.5)
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. (^16.4.5)
- **express**: Fast, unopinionated, minimalist web framework for Node.js. (^4.19.2)
- **ts-node**: TypeScript execution and REPL for Node.js. (^10.9.2)
- **typescript**: A language for application-scale JavaScript. (^5.4.5)

-**Development Dependencies**:

- **nodemon**: A utility that monitors for changes in your source and automatically restarts your server. (^3.1.0)

## Front-end

**Dependencies**:

- **@ethersproject/address**: A library for Ethereum address manipulation. (^5.6.1)
- **@ethersproject/bignumber**: A library for arbitrary precision decimal and integer arithmetic. (^5.6.2)
- **@ethersproject/constants**: Constants and utility functions for Ethereum. (^5.6.1)
- **@ethersproject/contracts**: Ethereum Contract ABI encoding and decoding. (^5.6.2)
- **@ethersproject/providers**: Ethereum JSON-RPC Providers. (^5.6.8)
- **@ethersproject/solidity**: A library for Solidity ABI encoding and decoding. (^5.6.1)
- **@ethersproject/units**: Utilities for handling Ethereum units. (^5.6.1)
- **@reduxjs/toolkit**: A set of tools to simplify Redux development. (^2.2.3)
- **@web3-react/core**: Core library for building web3-react applications. (^6.1.9)
- **axios**: A promise-based HTTP client for the browser and Node.js. (^1.6.8)
- **bignumber.js**: A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic. (^9.1.2)
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. (^16.4.5)
- **next**: The React framework for production. (14.1.4)
- **react**: A JavaScript library for building user interfaces. (^18)
- **react-dom**: React package for working with the DOM. (^18)
- **react-redux**: Official React bindings for Redux. (^9.1.1)
- **redux**: A predictable state container for JavaScript apps. (^5.0.1)
- **redux-persist**: Persist and rehydrate a Redux store. (^6.0.0)
- **redux-thunk**: Thunk middleware for Redux. (^3.1.0)

  **Development Dependencies**:

  - **@types/node**: TypeScript definitions for Node.js. (^20)
  - **@types/react**: TypeScript definitions for React. (^18)
  - **@types/react-dom**: TypeScript definitions for ReactDOM. (^18)
  - **eslint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. (^8)
  - **eslint-config-next**: ESLint configuration preset for Next.js. (14.1.4)
  - **typescript**: A language for application-scale JavaScript. (^5)

## License

This project is licensed under a private license.
