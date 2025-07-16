import { Schema } from "mongoose";

export const AlbumTagSchema = new Schema(
    {
        albumId:{type: Schema.ObjectId, required:true, ref:'Album'},
        tagId:{type:Schema.ObjectId, required:true, ref:'Tag'},
        creatorId:{type: Schema.ObjectId, required:true, ref:'Account'},
    },
    {
        toJSON: {virtuals:true}
    },
)

AlbumTagSchema.virtual('tag', {
    localField: 'tagId',
    foreignField: '_id',
    ref:'Tag',
    justOne:true
})