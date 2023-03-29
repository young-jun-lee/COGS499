import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
    },
    prerequisites: {
        type: [],
        required: true,
    },
    corequisites: {
        type: [],
        required: true,
    },
    exclusions: {
        type: [],
        required: true,
    },
})

export const Courses = mongoose.model('Courses', CoursesSchema)
