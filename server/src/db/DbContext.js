import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { PhotoSchema } from '../models/Photo.js';
import { AlbumSchema } from '../models/Album.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Photos = mongoose.model("Photo", PhotoSchema)
  Album = mongoose.model("Album", AlbumSchema)
}

export const dbContext = new DbContext()
