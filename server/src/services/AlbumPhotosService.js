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
      { path: "album" },
    ]);
    return albumPhotos;
  }

  async getAlbumPhotosbyPhotoId(photoId) {
    const albumPhotos = await dbContext.AlbumPhotos.find({ photoId: photoId });
    return albumPhotos;
  }

  async getAllPhotosInAlbum(albumId) {
    const albumPhotos = await dbContext.AlbumPhotos.find({
      albumId: albumId,
    }).populate([
      {
        path: "photo",
        populate: [
          { path: "tags", populate: "tag" },
          {
            path: "creator",
            select: "name picture",
          },
        ],
      },
      { path: "creator", select: "name picture" },
    ]);
    if (!albumPhotos) {
      throw new BadRequest(`there are no photos for album id ${albumId}`);
    }
    return albumPhotos;
  }
  async removeAlbumPhotobyPhotoId(photoId, userInfo) {
    const photoToRemove = await dbContext.AlbumPhotos.findById(
      photoId
    ).populate("photo album");
    if (photoToRemove.photo.creatorId == userInfo.id) {
      await photoToRemove.deleteOne();
      return `${photoToRemove.photo.name} has been removed from all albums`;
    }
    if (photoToRemove.creatorId != userInfo.id) {
      throw new Forbidden(
        `You cannot remove a photo from someone else's album, ${userInfo.nickname}`
      );
    }
    await photoToRemove.deleteOne();
    return `${photoToRemove.photo.name} has been removed from ${photoToRemove.album.name}`;
  }
  async removeAlbumPhoto(albumPhotoId, userInfo) {
    const albumPhotoToRemove = await dbContext.AlbumPhotos.findById(
      albumPhotoId
    ).populate("album");
    if (userInfo.id != albumPhotoToRemove.creatorId) {
      throw new Forbidden(
        `You cannot remove a photo from someone else's album, ${userInfo.nickname}`
      );
    }
    await albumPhotoToRemove.deleteOne();
    return `Photo has been removed from ${albumPhotoToRemove.album.name}`;
  }
}
export const albumPhotosService = new AlbumPhotosService();
