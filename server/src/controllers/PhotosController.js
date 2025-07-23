import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { photosService } from "../services/PhotosService.js";
import { photoCommentsService } from "../services/PhotoCommentsService.js";

export class PhotosController extends BaseController {
  constructor() {
    super("api/photos");
    this.router
      .get("/search", this.getPhotosByQuery)
      .get("", this.getAllPhotos)
      .get("/:photoId", this.getPhotosById)
      .get("/:photoId/comments", this.getCommentsByPhotoId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put("/:photoId/likes", this.likePhoto)
      .delete("/:photoId", this.deletePhoto)
      .post("", this.createPhoto);
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createPhoto(request, response, next) {
    try {
      const photoData = request.body;
      const userInfo = request.userInfo;
      photoData.creatorId = userInfo.id;
      const photo = await photosService.createPhoto(photoData);
      response.send(photo);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAllPhotos(request, response, next) {
    try {
      const photos = await photosService.getAllPhotos();
      response.send(photos);
    } catch (error) {
      next(error);
    }
  }

  async getPhotosById(request, response, next) {
    try {
      const photoId = request.params.photoId;
      const photos = await photosService.getPhotosById(photoId);
      response.send(photos);
    } catch (error) {
      next(error);
    }
  }

  async deletePhoto(request, response, next) {
    try {
      const photoId = request.params.photoId;
      const userInfo = request.userInfo;
      await photosService.deletePhoto(photoId, userInfo);
      response.send("Deleted photo!");
    } catch (error) {
      next(error);
    }
  }
  async getPhotosByQuery(request, response, next) {
    try {
      const photoQuery = request.query.query;
      const photos = await photosService.getPhotosByQuery(photoQuery);
      response.send(photos);
    } catch (error) {
      next(error);
    }
  }
  async likePhoto(request, response, next) {
    try {
      const photoId = request.params.photoId;
      const userId = request.userInfo.id;
      const likedPhoto = await photosService.likePhoto(photoId, userId);
      response.send(likedPhoto);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByPhotoId(request, response, next) {
    // response.send('🏃‍♀️💬💬🖼️🪪 Get photo comments')
    try {
      const photoId = request.params.photoId;
      const photoComments = await photoCommentsService.getCommentsByPhotoId(
        photoId
      );
      response.send(photoComments);
    } catch (error) {
      next(error);
    }
  }
}
