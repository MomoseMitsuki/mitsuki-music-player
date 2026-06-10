import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto {
	@IsNotEmpty()
	@IsString()
	userId!: string;

	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsBoolean()
	isPublic!: boolean;
}
