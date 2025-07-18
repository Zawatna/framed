import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
    coverImg: { type: String, required: true, maxLength: 500 },
    description: { type: String, maxLength: 1000 },
    name: { type: String, maxlength: 200, minLength: 3, required: true },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

AlbumSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
AlbumSchema.virtual("tags", {
  localField: "_id",
  foreignField: "albumId",
  ref: "AlbumTag",
  justOne: false,
});
AlbumSchema.virtual("photocount", {
  localField: "_id",
  foreignField: "albumId",
  ref: "AlbumPhoto",
  justOne: false,
  count: true,
});
AlbumSchema.virtual("photos", {
  localField: "_id",
  foreignField: "albumId",
  ref: "AlbumPhoto",
  justOne: false,
});
