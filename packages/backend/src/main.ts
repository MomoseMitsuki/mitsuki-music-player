import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";

async function bootstrap() {
	const fastifyAdapter = new FastifyAdapter();
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		fastifyAdapter
	);
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
