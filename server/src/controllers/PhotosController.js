import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { photosService } from "../services/PhotosService.js";
import { dbContext } from "../db/DbContext.js";

export class PhotosController extends BaseController {
  constructor() {
    super("api/photos")
    this.router
      .get("", this.getAllPhotos)
      .get('/:photoId', this.getPhotoById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPhoto)
  }



  /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
  async createPhoto(request, response, next) {
    try {
      const photoData = request.body
      const userInfo = request.userInfo
      photoData.creatorId = userInfo.id
      const photo = await photosService.createPhoto(photoData)
      response.send(photo)
    }
    catch (error) {
      next(error)
    }
  }
  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getAllPhotos(request, response, next) {
    try {
      const photos = await photosService.getAllPhotos()
      response.send(photos)
    } catch (error) {
      next(error)
    }
  }

  async getPhotoById(request, response, next) {
    try {
      const photoId = request.params.photoId
      const photo = await photosService.getPhotoById(photoId)
      response.send(photo)
    } catch (error) {
      next(error)
    }
  }

  async getPhotoByAccountId(request, response, next) {
    try {
      const photoByAccountId = request.params.photoByAccountId
      const photo = await photosService.getPhotoByAccountId(photoByAccountId)
      response.send(photo)

    } catch (error) {
      next
    }

  }
}