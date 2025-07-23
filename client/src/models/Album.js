import { AlbumPhoto } from "./AlbumPhoto.js";

export class Album {
  constructor(data) {
    this.name = data.name;
    this.coverImg = data.coverImg;
    this.creator = data.creator;
    this.isArchived = data.isArchived;
    this.description = data.description;
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
    this.likes = data.likes;
    this.tags = data.tags;
    /** @type {import('../models/AlbumPhoto.js').AlbumPhoto[]} */
    this.photos = data.photos?.map((pojo) => new AlbumPhoto(pojo));
  }
}

// const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit'}
