import { Schema } from "mongoose";

export const PhotoTagSchema = new Schema(
  {
    photoId: { type: Schema.ObjectId, required: true, ref: "Photo" },
    tagId: { type: Schema.ObjectId, required: true, ref: "Tag" },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  },
  {
    toJSON: { virtuals: true },
  }
);
PhotoTagSchema.virtual("tag", {
  localField: "tagId",
  foreignField: "_id",
  ref: "Tag",
  justOne: true,
});
PhotoTagSchema.virtual("photo", {
  localField: "photoId",
  foreignField: "_id",
  ref: "Photo",
  justOne: true,
});
