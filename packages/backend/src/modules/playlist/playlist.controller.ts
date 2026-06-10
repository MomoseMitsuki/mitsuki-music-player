import { Controller, UseGuards, Body, Delete } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { DeletePlaylistDto } from "./dto/delete-playlist.dto";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@Controller("/playlist")
export class PlaylistController {
	constructor(private readonly playlistService: PlaylistService) {}

	@UseGuards(JwtAuthGuard)
	@Delete()
	async deletePlaylist(@CurrentUser() id: string, @Body() body: DeletePlaylistDto) {
		return this.playlistService.deletePlatyList(body.id, id)
	}
}
