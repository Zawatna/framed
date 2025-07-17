import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumsService } from "../services/AlbumsService.js";
import { albumPhotosService } from "../services/AlbumPhotosService.js";

export class AlbumsController extends BaseController {
  constructor() {
    super("api/albums");
    this.router
      .get("", this.getAllAlbums)
      .get("/:albumId", this.getAlbumById)
      .get("/:albumId/albumphotos", this.getAllPhotosInAlbum)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createAlbum)
      .delete("/:albumId", this.deleteAlbum)
      .put("/:albumId", this.editAlbum);
  }
  async getAllPhotosInAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId;
      const albumPhotos = await albumPhotosService.getAllPhotosInAlbum(albumId);
      response.send(albumPhotos);
    } catch (error) {
      next(error);
    }
  }
  async editAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId;
      const editedData = request.body;
      const userId = request.userInfo.id;
      const editedAlbum = await albumsService.editAlbum(
        albumId,
        editedData,
        userId
      );
      response.send(editedAlbum);
    } catch (error) {
      next(error);
    }
  }
  async deleteAlbum(request, response, next) {
    const albumId = request.params.albumId;
    const userId = request.userInfo.id;
    const deletedAlbum = await albumsService.deleteAlbum(albumId, userId);
    response.send(deletedAlbum);
  }
  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId;
      const album = await albumsService.getAlbumById(albumId);
      response.send(album);
    } catch (error) {
      next(error);
    }
  }
  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums();
      response.send(albums);
    } catch (error) {
      next(error);
    }
  }

  async createAlbum(request, response, next) {
    try {
      const albumData = request.body;
      const userInfo = request.userInfo;
      albumData.creatorId = userInfo.id;
      const album = await albumsService.createAlbum(albumData);
      response.send(album);
    } catch (error) {
      next(error);
    }
  }
}
