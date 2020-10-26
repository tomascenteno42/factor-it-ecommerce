# Factor It - ecommerce

Ecommerce made with React js, Nest js, Typescript, Prisma and Express.

## Running the app

Inside each folder there is a Readme.md which explains how to run both front end and back end.

## Things to keep in mind when running
### Back end
When running the api the database seeder will execute once, if you want more products and users to be seeded please run the API more than once.

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