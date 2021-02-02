# Library API :book:

> Backend API that supports both REST and GraphQL.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Library management API build in Nest.js which uses TypeORM so it can be migrated to any database as per requirement. API has custom validations and cursor based pagination.

#### Documentation

**1. GraphQL**
GraphQL api runs on apollo playground which is self documented. It'll run on following url :rocket:

```bash
http://localhost:3000/graphql
```

**2. REST**

- add book

  ```bash
  POST http://localhost:3000/book
  content-type: application/json

  {
    "title":"spirit of the day",
    "author":{
      "author_name":"john doe",
      "author_email":"johndoe@gmail.com"
    },
    "quantity":20
  }
  ```

- get book by id
  ```bash
  GET http://localhost:3000/book/1
  ```
- get books
  - normal request
    ```bash
    GET http://localhost:3000/book
    ```
  - pagination request with query params
    ```bash
    GET http://localhost:3000/book?page=1&limit=10
    ```
- update book

  ```bash
  PUT http://localhost:3000/book/1
  content-type: application/json

  {
    "title":"heaven"
  }
  ```

- delete book
  ```bash
  DELETE http://localhost:3000/book/1
  ```
- issue book

  - issue single book per request to user

    ```bash
    POST http://localhost:3000/library/issue
    content-type: application/json

    {
      "bookid":1,
      "userid":1
    }
    ```

  - issue multiple books per request to user

    ```bash
    POST http://localhost:3000/library/issue
    content-type: application/json

    {
      "bookid":[1,2,3],
      "userid":1
    }
    ```

- return book

  ```bash
  POST http://localhost:3000/library/return
  content-type: application/json

  {
    "bookid":1,
    "userid":1
  }
  ```

- add user

  ```bash
  POST http://localhost:3000/user
  content-type: application/json

  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndow@gmail.com",
    "age": 10,
  }
  ```

- get user by id
  ```bash
  GET http://localhost:3000/user/1
  ```
- get users
  - normal request
    ```bash
    GET http://localhost:3000/user
    ```
  - pagination request with query params
    ```bash
    GET http://localhost:3000/user?page=1&limit=10
    ```
- update user

  ```bash
  PUT http://localhost:3000/user/1
  content-type: application/json

  {
    "firstname":"Kevin"
  }
  ```

- delete user
  ```bash
  DELETE http://localhost:3000/user/1
  ```

## Installation

```bash
# Setting app for developement
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker Setup

```bash
# Building image form Dockerfile
$ docker build -t image-name:tag .

# Spinnig up the container with docker-compose
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Author

Dhananjay Shinde [Twitter](www.twitter.com/jay.speaks___)

## License

Library-API is [MIT licensed](LICENSE).
