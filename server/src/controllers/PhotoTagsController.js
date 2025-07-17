import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { photoTagsService } from "../services/PhotoTagsService.js";

export class PhotoTagsController extends BaseController {
  constructor() {
    super("api/phototags");
    this.router
      .get("", this.getAllPhotoTags)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPhotoTag)
      .delete("/:photoTagId", this.deletePhotoTag);
  }
  async createPhotoTag(request, response, next) {
    try {
      const photoTagData = request.body;
      const userId = request.userInfo.id;
      photoTagData.creatorId = userId;
      const photoTag = await photoTagsService.createPhotoTag(photoTagData);
      response.send(photoTag);
    } catch (error) {
      next(error);
    }
  }
  async getAllPhotoTags(request, response, next) {
    try {
      const photoTags = await photoTagsService.getAllPhotoTags();
      response.send(photoTags);
    } catch (error) {
      next(error);
    }
  }
  async deletePhotoTag(request, response, next) {
    try {
      const photoTagId = request.params.photoTagId;
      const user = request.userInfo;
      const message = await photoTagsService.deletePhotoTag(photoTagId, user);
      response.send(message);
    } catch (error) {
      next(error);
    }
  }
}
