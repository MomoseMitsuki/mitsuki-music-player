import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePlaylistDto {
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
