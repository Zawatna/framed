import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { PhotoSchema } from '../models/Photo.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Photo = mongoose.model("Photo", PhotoSchema)
}

export const dbContext = new DbContext()
