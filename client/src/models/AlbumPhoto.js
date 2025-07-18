import { Photo } from "./Photo.js";

export class AlbumPhoto {
  constructor(data) {
    this.albumId = data.albumId;
    this.creatorId = data.creatorId;
    this.id = data.id || data._id;
    this.photoId = data.photoId;
    this.photo = new Photo(data.photo);
  }
}
