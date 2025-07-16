import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { photosService } from "../services/PhotosService.js";

export class PhotosController extends BaseController {
  constructor() {
    super("api/photos")
    this.router
      // .get("")
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




}