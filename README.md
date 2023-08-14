# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/larisagonchar/nodejs2022Q4-service.git
```

## Changing branch

```
git checkout dev_docker-db
```

## Installing NPM modules

```
npm install
```

## Running application in docker

1. Download and install [Docker](https://docs.docker.com/engine/install/)
2. Run command

```
npm run docker:start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Stop application in docker

```
npm run docker:down
```

## Scan docker images

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

