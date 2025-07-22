import { Schema } from "mongoose";

export const TagSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 20, lowercase: true, trim: true }
    },
    {
        toJSON: { virtuals: true }
    }
)

TagSchema.virtual('photoTags', {
    localField: '_id',
    foreignField: 'tagId',
    ref: 'PhotoTag',
    justOne: false,
})

TagSchema.virtual('albumTags', {
    localField: '_id',
    foreignField: 'tagId',
    ref: 'AlbumTag',
    justOne: false,
})