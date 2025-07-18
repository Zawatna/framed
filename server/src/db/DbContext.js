import mongoose, { mongo } from "mongoose";
import { AccountSchema } from "../models/Account.js";
import { ValueSchema } from "../models/Value.js";
import { PhotoSchema } from "../models/Photo.js";
import { AlbumSchema } from "../models/Album.js";
import { TagSchema } from "../models/Tag.js";
import { AlbumTagSchema } from "../models/AlbumTag.js";
import { PhotoTagSchema } from "../models/PhotoTag.js";
import { AlbumPhotoSchema } from "../models/AlbumPhoto.js";
import { PhotoCommentSchema } from "../models/PhotoComment.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Photos = mongoose.model("Photo", PhotoSchema);
  Albums = mongoose.model("Album", AlbumSchema);
  Tags = mongoose.model("Tag", TagSchema);
  AlbumTags = mongoose.model("AlbumTag", AlbumTagSchema);
  PhotoTags = mongoose.model("PhotoTag", PhotoTagSchema);
  AlbumPhotos = mongoose.model("AlbumPhoto", AlbumPhotoSchema);

  PhotoComments = mongoose.model("PhotoComment", PhotoCommentSchema)
}

export const dbContext = new DbContext();
