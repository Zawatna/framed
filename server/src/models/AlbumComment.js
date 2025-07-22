import { Schema } from "mongoose";

export const AlbumCommentSchema = new Schema(
    {
        body:{type:String, maxLength: 100, required:true},
        creatorId:{type:Schema.ObjectId, required:true, ref:'Account'},
        albumId:{type: Schema.ObjectId, required:true, ref:'Album'}
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

AlbumCommentSchema.virtual('creator',{
    localField: "creatorId",
    foreignField: '_id',
    ref:"Account",
    justOne:true,
})