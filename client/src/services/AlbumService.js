import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"

class AlbumService {
  createAlbum() {
  }

  async getAllAlbums() {
    const response = await api.get('api/albums')
    logger.log("albums", response.data);
    const albums = response.data.map((album) => new Album(album))
    logger.log('reformatted albums', albums)
    AppState.albums = albums
  }
}

export const albumService = new AlbumService()