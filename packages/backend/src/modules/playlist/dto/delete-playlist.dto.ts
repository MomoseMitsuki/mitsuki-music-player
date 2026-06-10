import { IsNotEmpty, IsString } from "class-validator";

export class DeletePlaylistDto {
	@IsNotEmpty()
	@IsString()
	id!: string;
}
