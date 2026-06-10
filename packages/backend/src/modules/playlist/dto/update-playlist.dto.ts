import { IsNotEmpty, IsOptional, IsString, IsArray } from "class-validator";

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

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	addMusicIds?: string[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	removeMusicIds?: string[];
}
