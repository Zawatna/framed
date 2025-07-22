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
      .get("/:id", this.getProfile)
      .get("/:id/photos", this.getPhotosByProfileId)
      .get('/:id/tags', this.getTagsByProfileId)

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


  async getTagsByProfileId(request, response, next) {
    try {
      const profileId = request.params.id;
      const albumTagsCount = await albumTagsService.getAlbumTagsCountByProfileId(profileId) //these are intense
      const photoTagsCount = await photoTagsService.getPhotoTagsCountByProfileId(profileId)
      const allTags = await albumTagsCount.concat(photoTagsCount) // adding the 2 arrays of tags together
      const countPerTag = {}; // creating an empty object
      //this loops through allTags and for each tag its going to add it to the empty object CountPerTag with its count, if its already in the object it just increases the count instead of adding it again
      for (const tagString of allTags) {
        if (countPerTag[tagString]) {
          countPerTag[tagString]++;
        } else {
          countPerTag[tagString] = 1;
        }
      }
      // sortTags takes that single object countPerTag and splits it into an array of objects with keyvalue pairs using the tag "bikes" and the number of times it was counted from this users albums and photos ie 2
      const sortTags = Object.entries(countPerTag)

      const sortingTry2 = sortTags.sort((a, b) => b[1] - a[1]) // this sorts the array of arrays by grabbing the number at index 1 and sorting them by that number

      const sortTags2 = sortTags.map(([tag, count,]) => ({ tag, count })) //this converts the arrays inside the array into objects tag and count are variable names you can use whatever you want there

      // const nowSortedTags = sortTags2.sort((a, b) => b.count - a.count) //this works if you convert them to objects first like above


      response.send(sortTags2)
    } catch (error) {
      next(error)
    }
  }
}
