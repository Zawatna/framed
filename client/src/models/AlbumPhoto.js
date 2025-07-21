import { Photo } from "../models/Photo.js";

export class AlbumPhoto {
  constructor(data) {
    this.albumId = data.albumId;
    this.creatorId = data.creatorId;
    this.id = data.id || data._id;
    this.photoId = data.photoId;
    /** @type {import('../models/Photo.js').Photo} */
    this.photo = new Photo(data.photo);
  }
}
