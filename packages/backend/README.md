# Payroll system

This is a school management payroll system that should manage employees and probably students who might also be part of it

# Development
After cloning the the project you can install dependencies using `yarn`

```sh
yarn install
```

Run in dev mode
```sh
yarn dev
```

Run in prod
```sh
yarn start
```

Build
```sh
yarn build
```

Linting
```sh
yarn lint # lint:fix for fixing lint issues
```

Formatting
```sh
yarn format
```

## Database
Create a `.env` file in the root of the project

Generate new migrations
```sh
yarn migrate:new
```

Publishing migrations to db
```sh
yarn migrate:publish
```
View DB in drizzle studio
```sh
yarn db:view
```
