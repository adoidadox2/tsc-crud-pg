<h1 align="center">
  tsc-crud-pg
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/adoidadox2/tsc-crud-pg?color=%23FF9000">

  <a href="https://www.linkedin.com/in/augusto-vin%C3%ADcius-vasconcelos-tabosa-71aa991a5/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-adoidadox2-%23FF9000">
  </a>
</p>

## About the project :open_file_folder::

Project - https://github.com/adoidadox2/selectFullStackDeveloper 

Made now in typescript and typeorm for future revisions (used soft delete)

## Technologies :rocket::

Technologies that I used to develop this API

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Helmet](https://helmetjs.github.io/)
- [Celebrate](https://github.com/arb/celebrate)
- [Cors](https://github.com/expressjs/cors)
- [Express-brute](https://github.com/AdamPflug/express-brute)

## Getting started :desktop_computer::

Import the `Insomnia.json` on Insomnia App

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)
- One instance of [Redis](https://redis.io/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/adoidadox2/tsc-crud-pg.git && cd tsc-crud-pg
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name tsc-crud-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=tsc-crud -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d -t postgres

# Create the instance of Redis using docker
$ docker run --name tsc-crud-redis -p 6379:6379 -d -t redis:alpine

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```

## How to contribute :thinking::

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork adoidadox2/tsc-crud-pg
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd tsc-crud-pg

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## License :memo::

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author :man_technologist::

Made with :heart: by **Augusto Vinícius** 👋🏻 [Get in touch!](https://github.com/adoidadox2)
