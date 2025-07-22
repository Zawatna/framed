import { Aggregate } from "mongoose";
import { albumTagsService } from "../services/AlbumTagsService.js";
import { photosService } from "../services/PhotosService.js";
import { photoTagsService } from "../services/PhotoTagsService.js";
import { profileService } from "../services/ProfileService.js";
import BaseController from "../utils/BaseController.js";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profiles");
    this.router
      .get("/search", this.getProfilesByQuery)
      .get("", this.getProfiles)
      .get("/:id/photos", this.getPhotosByProfileId)
      .get("/:id", this.getProfile);
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(
        req.query.name,
        req.query.offset
      );
      res.send(profiles);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }

  async getPhotosByProfileId(req, res, next) {
    try {
      const profileId = req.params.id;
      const photos = await photosService.getPhotosByProfileId(profileId);
      res.send(photos);
    } catch (error) {
      next(error);
    }
  }
  async getProfilesByQuery(req, res, next) {
    try {
      const profileQuery = req.query.query;
      const profiles = await profileService.getProfilesByQuery(profileQuery);
      res.send(profiles);
    } catch (error) {
      next(error);
    }
  }
}
