import mongoose from 'mongoose'
import { GalaxySchema } from './Galaxy'
const Schema = mongoose.Schema

export const StarSchema = new Schema(
    {
        name: { type: String, required: true },
        galaxyId: { type: Schema.Types.ObjectId, ref: 'Galaxy', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

StarSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})