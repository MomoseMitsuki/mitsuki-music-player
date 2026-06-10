import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
	@IsNotEmpty()
	@IsString()
	userId!: string;

	@IsNotEmpty()
	@IsString()
	id!: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	avatar?: string;

	@IsOptional()
	@IsString()
	description?: string;
}
