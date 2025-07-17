import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"
import { AlbumPhoto } from "@/models/AlbumPhoto.js";

class AlbumService {
  async getAlbumPictureById(albumId) {
    const response = await api.get(`api/albums/${albumId}/albumphotos`);
    logger.log("album pics", response.data);
    const pictures = response.data.map((picture) => new AlbumPhoto(picture));
    // AppState.albumPhotos = pictures;
    return pictures;
  }


  createAlbum() {
  }

  async getAllAlbums() {
    const response = await api.get("api/albums?limit=3");
    logger.log("albums", response.data);
    const albums = response.data.map((album) => new Album(album));
    logger.log("reformatted albums", albums);
    AppState.albums = albums;
  }
}

export const albumService = new AlbumService()