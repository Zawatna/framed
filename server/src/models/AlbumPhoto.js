import { Schema } from "mongoose";

export const AlbumPhotoSchema = new Schema(
  {
    albumId: { type: Schema.ObjectId, required: true, ref: "Album" },
    photoId: { type: Schema.ObjectId, required: true, ref: "Photo" },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
AlbumPhotoSchema.virtual("photo", {
  localField: "photoId",
  foreignField: "_id",
  ref: "Photo",
  justOne: true,
});
AlbumPhotoSchema.virtual("album", {
  localField: "albumId",
  foreignField: "_id",
  ref: "Album",
  justOne: true,
});
AlbumPhotoSchema.virtual("tags", {
  localField: "photoId",
  foreignField: "photoId",
  ref: "PhotoTag",
  justOne: false,
});
AlbumPhotoSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
