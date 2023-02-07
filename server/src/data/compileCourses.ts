import fs from 'fs';

// get all the files in the courses directory
const files = fs.readdirSync('./storage/datasets/default');

let data = []
files.forEach((file) => {
    // read the file
    const fileData = fs.readFileSync(`./storage/datasets/default/${file}`, 'utf8');
    // parse the file for the data field
    const parsedData = JSON.parse(fileData).data;
    // add the parsed data to the data object
    data.push(parsedData)
});


data = data.flat();


let courses = {}
data.forEach((course) => {
    courses[course.code] = {
        code: course.code,
        title: course.title,
        description: course.description,
        units: course.units,
        prerequisites: course.prerequisites,
        corequisites: course.corequisites,
        exclusions: course.exclusions
    }
})

fs.writeFileSync('../../constants/courses.json', `${JSON.stringify(courses)}`)