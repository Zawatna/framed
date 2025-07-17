import { Schema } from "mongoose";

export const PhotoSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    imgUrl: { type: String, required: true, maxLength: 500 },
    description: { type: String, maxLength: 100 },
    originalDate: { type: Date, required: false },
    likes: { type: Schema.ObjectId, required: false },
    location: { type: String, required: false, maxLength: 500 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
PhotoSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
PhotoSchema.virtual("tags", {
  localField: "_id",
  foreignField: "photoId",
  ref: "PhotoTag",
});
