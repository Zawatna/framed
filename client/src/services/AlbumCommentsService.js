import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AlbumComment } from "@/models/Comment.js";
import { AppState } from "@/AppState.js";

class AlbumCommentsService {
  async submitComment(albumId, body) {
    logger.log(albumId, body, "service👷");
    const response = await api.post("api/albumcomments", {
      albumId: albumId,
      body: body,
    });
    logger.log(response.data);
    const comment = new AlbumComment(response.data);
    AppState.album.comments.unshift(comment);
  }
}
export const albumCommentsService = new AlbumCommentsService();
