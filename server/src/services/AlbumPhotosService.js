import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class AlbumPhotosService {
  async addAlbumPhoto(albumPhotoData) {
    const albumPhoto = await dbContext.AlbumPhotos.create(albumPhotoData);
    await albumPhoto.populate([
      {
        path: "tags",
        populate: { path: "tag" },
      },
      { path: "photo" },
    ]);
    return albumPhoto;
  }
  async getAllAlbumPhotos() {
    const albumPhotos = await dbContext.AlbumPhotos.find().populate([
      {
        path: "tags",
        populate: { path: "tag" },
      },
      { path: "photo" },
    ]);
    return albumPhotos;
  }
  async getAllPhotosInAlbum(albumId) {
    const albumPhotos = await dbContext.AlbumPhotos.find({
      albumId: albumId,
    }).populate("photo");
    if (!albumPhotos) {
      throw new BadRequest(`there are no photos for album id ${albumId}`);
    }
    return albumPhotos;
  }
  async removeAlbumPhoto(albumPhotoId, userInfo) {
    const photoToRemove = await dbContext.AlbumPhotos.findById(
      albumPhotoId
    ).populate("photo album");
    if (photoToRemove.creatorId != userInfo.id) {
      throw new Forbidden(
        `You cannot remove a photo from someone else's album, ${userInfo.nickname}`
      );
    }
    await photoToRemove.deleteOne();
    return `${photoToRemove.photo.name} has been removed from ${photoToRemove.album.name}`;
  }
}
export const albumPhotosService = new AlbumPhotosService();
