import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class PhotoTagsService {
  async getPhotobyTagId(tagId) {
    const tags = await dbContext.PhotoTags.find({tagId: tagId}).populate('photo')
    return tags
  }
  async createPhotoTag(photoTagData) {
    const photoTag = await dbContext.PhotoTags.create(photoTagData);
    return photoTag;
  }
  async getAllPhotoTags() {
    const photoTags = await dbContext.PhotoTags.find().populate("tag photo");
    return photoTags;
  }
  async deletePhotoTag(photoTagId, user) {
    const photoTagToDelete = await dbContext.PhotoTags.findById(
      photoTagId
    ).populate("tag photo");
    if (!photoTagToDelete)
      throw new BadRequest(`No photo tag with id ${photoTagId} exists`);
    if (photoTagToDelete.creatorId != user.id)
      throw new Forbidden(
        `You are not allowed to delete tags from someone else's photo, ${user.nickname}!`
      );
    await photoTagToDelete.deleteOne();
    return `${photoTagToDelete.tag.name} has been removed from ${photoTagToDelete.photo.name}.`;
  }
}
export const photoTagsService = new PhotoTagsService();
