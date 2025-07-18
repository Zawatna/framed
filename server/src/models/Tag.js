import { Schema } from "mongoose";

export const TagSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 20, lowercase: true, trim: true }
    }
)