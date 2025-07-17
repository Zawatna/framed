import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumPhotosService } from "../services/AlbumPhotosService.js";

export class AlbumPhotosController extends BaseController {
  constructor() {
    super("api/albumphotos");
    this.router
      .get("", this.getAllAlbumPhotos)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addAlbumPhoto)
      .delete("/:albumPhotoId", this.removeAlbumPhoto);
  }
  async addAlbumPhoto(request, response, next) {
    try {
      const albumPhotoData = request.body;
      const userId = request.userInfo.id;
      albumPhotoData.creatorId = userId;
      const albumPhoto = await albumPhotosService.addAlbumPhoto(albumPhotoData);
      response.send(albumPhoto);
    } catch (error) {
      next(error);
    }
  }
  async getAllAlbumPhotos(request, response, next) {
    try {
      const albumPhotos = await albumPhotosService.getAllAlbumPhotos();
      response.send(albumPhotos);
    } catch (error) {
      next(error);
    }
  }
  async removeAlbumPhoto(request, response, next) {
    try {
      const albumPhotoId = request.params.albumPhotoId;
      const userInfo = request.userInfo;
      const message = await albumPhotosService.removeAlbumPhoto(
        albumPhotoId,
        userInfo
      );
      response.send(message);
    } catch (error) {
      next(error);
    }
  }
}
