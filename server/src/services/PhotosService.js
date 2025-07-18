import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { tagsService } from "./TagsService.js";

class PhotosService {
  async deletePhoto(photoId, userInfo) {
    const photo = await dbContext.Photos.findById(photoId);
    if (!photo) {
      throw new BadRequest(`Invalid id: ${photoId}`);
    }
    if (userInfo.id != photo.creatorId) {
      throw new Forbidden(`You are going to jail!`);
    }
    await photo.deleteOne();
  }

  async getPhotosById(photoId) {
    const photos = await dbContext.Photos.findById(photoId).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
    ]);
    return photos;
  }
  async getAllPhotos() {
    const photos = await dbContext.Photos.find().sort({ createdAt: -1 }).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
    ]);
    return photos;
  }
  async createPhoto(photoData) {
    const photo = await dbContext.Photos.create(photoData);
    await photo.populate("creator", "name picture");
    const tags = photoData.tags
    const addTagsToPhoto = await tagsService.checkForNewTags(tags)
    return photo;
  }
}

export const photosService = new PhotosService();
