# Twittarc

My solution to the [Social Networking Serverless Kata](https://github.com/petecocoon/Social-Networking-Serverless-Kata).

# Implementation

The application is a SAM application built with [Architect](https://arc.codes).

# Available APIs

## Authentication

- `GET /login`: the `redirect_uri` for GitHub authentication;
- `GET /logout`: clears the session.

## Feed

- `GET /tweets` 

# Setting up development environment

## Setup GitHub OAuth

Follow [the instructions](https://docs.github.com/en/developers/apps/creating-an-oauth-app) to create a GitHub OAuth app.

Once this is done, create a `.env` file in the root directory of the project with the following variables:

```
GITHUB_CLIENT_SECRET=<your_client_secret>
GITHUB_REDIRECT=http://localhost:3333/login
GITHUB_CLIENT_ID=<your_client_id>
```

# Running the application locally

TODO

# Running tests

TODO

# Deploying to AWS

TODO

# License

See [license file](./LICENSE.md)