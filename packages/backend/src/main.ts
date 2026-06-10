import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";
import { RemoveNullInterceptor } from "./common/interceptors/remove-null.interceptor";

async function bootstrap() {
	const fastifyAdapter = new FastifyAdapter();
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		fastifyAdapter
	);
	app.useGlobalInterceptors(new RemoveNullInterceptor());
	app.setGlobalPrefix("api");
	await app.register(fastifyCookie);
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
