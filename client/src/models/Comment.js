class Comment {
  constructor(data) {
    this.body = data.body;
    this.creatorId = data.creatorId;
    this.creator = data.creator;
  }
}
export class PhotoComment extends Comment {
  constructor(data) {
    super(data);
    this.photoId = data.photoId;
    this.photo = data.photo;
  }
}
export class AlbumComment extends Comment {
  constructor(data) {
    super(data);
    this.albumId = data.albumId;
    this.album = data.album;
  }
}
