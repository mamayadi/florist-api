# Florist API
Build with nodejs using typescript, mongodb and jwt

## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database](#database)
- [Swagger](#swagger)

## Prerequisites
You need nodejs or docker

## Installation
### Docker
To build project in docker
```bash
npm run docker-up
```
Enter container
```bash
npm run docker-start
```
Run server in container
```bash
npm run start:dev
```
### Node
Install dependencies
```bash
npm install
```
Run server
```bash
npm run start:dev
```

## Database
This project is using mongodb.
The database viewer hosted on [http://localhost:3001/](http://localhost:3001/).

You can use ```admin123``` as login and password.
## Swagger

The swagger documentation hosted on [http://localhost:3000/dev/api-docs](http://localhost:3000/dev/api-docs).