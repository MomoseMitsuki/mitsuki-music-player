import { IsNotEmpty, IsString } from "class-validator";

export class DeletePlaylistDto {
	@IsNotEmpty()
	@IsString()
	userId!: string;

	@IsNotEmpty()
	@IsString()
	id!: string;
}
