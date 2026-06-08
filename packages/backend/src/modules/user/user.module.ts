import { Module } from "@nestjs/common";
import { PlayListModule } from "../playlist/playlist.module";
import { UsersService } from "./user.service";
import { UserController } from "./user.controller"

@Module({
	imports: [PlayListModule],
	controllers: [UserController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
