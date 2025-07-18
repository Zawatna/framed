import { photosService } from '../services/PhotosService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/photos', this.getPhotosByProfileId)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getPhotosByProfileId (req, res, next) {
    try {
      const profileId = req.params.id;
      const photos = await photosService.getPhotosByProfileId(profileId);
      res.send(photos);
    }
    catch (error){
      next(error)
    }
  }
}
