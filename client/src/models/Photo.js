export class Photo {
  constructor(data) {
    this.id = data.id || data._id;
    this.creatorId = data.creatorId;
    this.name = data.name;
    this.imgUrl = data.imgUrl;
    this.description = data.description;
    this.uploadedAt = new Date(data.updatedAt);
    this.originalDate = new Date(data.originalDate);
    this.likes = data.likes;
    this.location = data.location;
    this.tags = data.tags;
    this.creator = data.creator;
  }
}
