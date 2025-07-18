export class Album {
  constructor(data) {
    this.name = data.name;
    this.coverImg = data.coverImg;
    this.creator = data.creator;
    this.isArchived = data.isArchived;
    this.createdAt = new Date(data.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    this.updatedAt = new Date(data.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    this.id = data.id || data._id;
    this.photoCount = data.photocount;
    this.tags = data.tags;
  }
}

// const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit'}
