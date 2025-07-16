import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { PhotoSchema } from '../models/Photo.js';
import { AlbumSchema } from '../models/Album.js';
import { TagSchema } from "../models/Tag.js";
import { AlbumTagSchema } from "../models/AlbumTag.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Photos = mongoose.model("Photo", PhotoSchema);
  Album = mongoose.model("Album", AlbumSchema);
  Tag = mongoose.model("Tag", TagSchema);
  AlbumTag = mongoose.model("AlbumTag", AlbumTagSchema);
}

export const dbContext = new DbContext()
