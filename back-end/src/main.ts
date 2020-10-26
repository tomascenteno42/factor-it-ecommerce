const pjson = require('../package.json');

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { seeder } from './prisma/seed/seed';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.setGlobalPrefix('api/v1');

	const options = new DocumentBuilder()
		.setTitle(pjson.name)
		.setDescription(pjson.description)
		.setVersion(pjson.version)
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	app.listen(8080).then(() => {
		console.log('Listening on port 8080');
	});
}

seeder();
bootstrap();
