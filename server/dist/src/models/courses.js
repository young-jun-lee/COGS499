import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CoursesSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Course must have a code'],
        unique: true,
    },
    title: {
        type: String,
        required: [true, 'Course must have a title'],
    },
    units: {
        type: Number,
        required: [true, 'Course must have a unit value'],
    },
    description: {
        type: String,
        required: [true, 'Course must have a description'],
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
    oneWayExclusions: {
        type: [],
        required: true,
    }
});
export const Courses = mongoose.model('Courses', CoursesSchema);
//# sourceMappingURL=courses.js.map