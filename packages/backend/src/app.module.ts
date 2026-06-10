import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { ConfigModule } from "@nestjs/config";
import path from "node:path";
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: path.resolve(__dirname, "../../.env")
		}),
		DatabaseModule
	],
	controllers: []
})
export class AppModule {}
