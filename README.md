# Factor It - ecommerce

Ecommerce made with React js, Nest js, Typescript, Prisma and Express.

## Running the app

Inside each folder there is a Readme.md which explains how to run both front end and back end.

## Things to keep in mind when running
### Back end
When running the API, the database seeder will execute only when the API starts, if you want more products and users to be seeded please run the API more than once.

``
src/main.ts
``
```typescript
	SwaggerModule.setup('api', app, document);

	app.listen(8080).then(() => {
		console.log('Listening on port 8080');
	});
}
seeder();
bootstrap();

```
For everything to  work smoothly you will need to do a couple of things. First create a `PostgreSQL` database and second head over to `back-end/prisma` and change the `DATABASE_URL` in the `.env` file following this example:

```
DATABASE_URL="postgresql://username:password@localhost:port/db_name?schema=public"
```

Also you will need to run the Prisma migrations directory to the database, you can do this by executing `npx prisma migrate up --experimental`. And you will have to generate a `Prisma client` by running `npx prisma generate` 