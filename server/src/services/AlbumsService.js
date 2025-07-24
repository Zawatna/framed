import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { albumTagsService } from "./AlbumTagsService.js";
import { tagsService } from "./TagsService.js";

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
    const album = await dbContext.Albums.findById(albumId).populate([
      {
        path: "creator",
        select: "name picture",
      },
      { path: "tags", populate: "tag" },
      {
        path: "photocount",
      },
      { path: "photos", populate: { path: "photo" } },
      {
        path: "comments",
        populate: { path: "creator", select: "name picture" },
      },
    ]);
    if (album == null) throw new BadRequest("this album does not exist");
    return album;
  }
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
      { path: "photos", options: { limit: 3 }, populate: { path: "photo" } },
      { path: "photocount" },
    ]);
    return albums;
  }

  async getAlbumsByProfileId(profileId) {
    const albums = await dbContext.Albums.find({
      creatorId: profileId,
    }).populate([
      { path: "creator", select: "name picture" },
      { path: "photos", options: { limit: 3 }, populate: { path: "photo" } },
      { path: "photocount" },
    ]);
    return albums;
  }

  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData);
    await album.populate("creator", "name picture");
    const tags = albumData.tags;
    const createAlbumTags = await tagsService.checkForNewTags(tags);
    console.log("🏷️", createAlbumTags);
    let albumTagsToCreate = createAlbumTags.map((tag) => {
      return {
        albumId: album.id,
        creatorId: album.creatorId,
        tagId: tag.id || tag._id,
      };
    });

    const albumTagsToPopulate = await albumTagsService.createAlbumTag(
      albumTagsToCreate
    );
    console.log(
      "What came back from my tags? 🏷️🎼🏷️🎼🏷️🎼🏷️",
      albumTagsToPopulate
    );
    await album.populate({ path: "tags", populate: { path: "tag" } });

    return album;
  }

  async getAlbumsByQuery(albumQuery) {
    const albums = await dbContext.Albums.find({
      $or: [
        {
          name: { $regex: albumQuery, $options: "ix" },
        },
        {
          description: { $regex: albumQuery, $options: "ix" },
        },
      ],
    }).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
      { path: "photos", options: { limit: 3 }, populate: { path: "photo" } },
      { path: "photocount" },
    ]);
    if (albums.length <= 0) {
      return `no albums found containing "${albumQuery}"`;
    }
    return albums;
  }
  async getUserAlbums(userId) {
    const albums = await dbContext.Albums.find({ creatorId: userId }).populate([
      { path: "creator", select: "name picture" },
      { path: "tags", populate: "tag" },
      { path: "photos", options: { limit: 3 }, populate: { path: "photo" } },
      { path: "photocount" },
    ]);
    if (albums.length <= 0) {
      return "no user albums found";
    }
    return albums;
  }
  async likeAlbum(albumId, userId) {
    const likedAlbum = await this.getAlbumById(albumId);
    if (likedAlbum.likes.includes(userId)) {
      const userIndex = likedAlbum.likes.findIndex((id) => id == userId);
      likedAlbum.likes.splice(userIndex, 1);
      likedAlbum.save();
      return likedAlbum;
    }
    likedAlbum.likes.push(userId);
    likedAlbum.save();
    return likedAlbum;
  }
}

export const albumsService = new AlbumsService();
