import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class AlbumsService {
  async editAlbum(albumId, editedData, userId) {
    const album = await this.getAlbumById(albumId);
    if (album.creatorId != userId) {
      throw new Forbidden("you cant edit another users album!");
    }
    if (album.isArchived) {
      throw new BadRequest("this album is archived so it can not be edited");
    }
    album.name = editedData.name ?? album.name;
    album.description = editedData.description ?? album.description;
    album.coverImg = editedData.coverImg ?? album.coverImg;
    await album.save();
    return album;
  }
  async deleteAlbum(albumId, userId) {
    const album = await this.getAlbumById(albumId);
    if (album.creatorId != userId) {
      throw new Forbidden("you cant delete another users album!");
    }
    if (album.isArchived) {
      throw new BadRequest("this album is already archived");
    }
    album.isArchived = true;
    await album.save();
    return `Album ${album.name} has been archived!`;
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Album.findById(albumId).populate(
      "creator",
      "name picture"
    );
    await album.populate("photocount");
    if (album == null) throw new BadRequest("this album does not exist");
    return album;
  }
  async getAllAlbums() {
    const albums = await dbContext.Album.find()
      .populate("creator", "name picture")
      .populate("photocount");
    return albums;
  }

  async createAlbum(albumData) {
    const album = await dbContext.Album.create(albumData);
    await album.populate("creator");
    return album;
  }
}

export const albumsService = new AlbumsService();
