import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { photoTagsService } from "./PhotoTagsService.js";
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
    const photos = await dbContext.Photos.find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "creator", select: "name picture" },
        { path: "tags", populate: "tag" },
      ]);
    return photos;
  }
  async createPhoto(photoData) {
    const photo = await dbContext.Photos.create(photoData);
    await photo.populate("creator", "name picture");
    const tags = photoData.tags;
    const createPhotoTags = await tagsService.checkForNewTags(tags);
    console.log("🏷️", createPhotoTags);
    let photoTagsToCreate = createPhotoTags.map((tag) => {
      return {
        photoId: photo.id,
        creatorId: photo.creatorId,
        tagId: tag.id || tag._id,
      };
    });

    const photoTagsToPopulate = await photoTagsService.createPhotoTag(
      photoTagsToCreate
    );
    // console.log("What came back from my tags? ♥️🎼🎼🎼🏷️", photoTagsToPopulate)
    await photo.populate({ path: "tags", populate: { path: "tag" } });
    console.log("Photos tags??? 🖼️🖼️🖼️🖼️", photo);
    return photo;
  }
  async getPhotosByQuery(photoQuery) {
    const photos = await dbContext.Photos.find({
      $or: [
        {
          name: { $regex: photoQuery, $options: "ix" },
        },
        {
          description: { $regex: photoQuery, $options: "ix" },
        },
      ],
    }).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
    ]);
    if (photos.length <= 0) {
      return `no photos found containing "${photoQuery}"`;
    }
    return photos;
  }

  async getPhotosByProfileId(profileId) {
    const photos = await dbContext.Photos.find({ creatorId: profileId }).populate('creator')

    return photos;
  }

  async likePhoto(photoId, userId) {
    const likedPhoto = await dbContext.Photos.findById(photoId).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
    ]);
    if (likedPhoto.likes.includes(userId)) {
      const userIndex = likedPhoto.likes.findIndex((id) => id == userId);
      likedPhoto.likes.splice(userIndex, 1);
      likedPhoto.save();
      return likedPhoto;
    }
    likedPhoto.likes.push(userId);
    likedPhoto.save();
    return likedPhoto;
  }
}

export const photosService = new PhotosService();
