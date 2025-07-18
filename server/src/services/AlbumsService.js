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
    const album = await dbContext.Album.findById(albumId).populate([
      {
        path: "creator",
        select: "name picture",
      },
      { path: "tags", populate: "tag" },
      {
        path: "photocount",
      },
    ]);
    if (album == null) throw new BadRequest("this album does not exist");
    return album;
  }
  async getAllAlbums() {
    const albums = await dbContext.Album.find().populate([
      { path: "creator", select: "name picture" },
      { path: "photocount" },
      { path: "tags", populate: "tag" },
    ]);
    return albums;
  }

  async createAlbum(albumData) {
    const album = await dbContext.Album.create(albumData);
    await album.populate("creator", "name picture");
    return album;
  }
  async getAlbumsByQuery(albumQuery) {
    const albums = await dbContext.Album.find({
      name: { $regex: `'${albumQuery}'`, $options: "ix" },
    }).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
    ]);
    return albums;
  }
}

export const albumsService = new AlbumsService();
