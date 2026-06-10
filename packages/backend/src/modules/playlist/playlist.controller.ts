import {
	Controller,
	UseGuards,
	Body,
	Delete,
	Post,
	Patch
} from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { DeletePlaylistDto, CreatePlaylistDto, UpdatePlaylistDto } from "./dto";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@Controller("/playlist")
export class PlaylistController {
	constructor(private readonly playlistService: PlaylistService) {}

	@UseGuards(JwtAuthGuard)
	@Delete()
	async deletePlaylist(
		@CurrentUser() id: string,
		@Body() body: DeletePlaylistDto
	) {
		return this.playlistService.deletePlatyList(body.id, id);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createPlayList(
		@CurrentUser() id: string,
		@Body() body: CreatePlaylistDto
	) {
		return this.playlistService.createPlayList(
			id,
			body.name,
			body.isPublic
		);
	}

	@UseGuards(JwtAuthGuard)
	@Patch()
	async updatePlayList(
		@CurrentUser() id: string,
		@Body() body: UpdatePlaylistDto
	) {
		return this.playlistService.updatePlayList(id, body);
	}
}
