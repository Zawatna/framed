import { Schema } from "mongoose";

export const PhotoCommentSchema = new Schema(
    {
        body: { type: String, maxLength: 100, required: true },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        photoId: { type: Schema.ObjectId, required: true, ref: 'Photo' }
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);
PhotoCommentSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    ref: "Account",
    justOne: true,
});
