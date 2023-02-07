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

// console.log(data)

data = data.flat();

// convert data object to a large object
// i want it to look like this:
// {
//     "courses": {
//         "title": "title",
//         "description": "description",
//       "units": 3,
//       "prerequisites": [
//         "COMP 100",

//       ],
//       "corequisites": [
//         "COMP 100",

//       ],
//       "exclusions": [
//         "COMP 100",

//       ]
//     }
// }
let courses = {}
data.forEach((course) => {
    courses[course.code] = {
        code : course.code,
        title: course.title,
        description: course.description,
        units: course.units,
        prerequisites: course.prerequisites,
        corequisites: course.corequisites,
        exclusions: course.exclusions
    }
})

let requirements = {}
data.forEach((course) => {
    requirements[course.code] = {
        prerequisites: course.prerequisites,
        corequisites: course.corequisites,
        exclusions: course.exclusions
    }
})


// data = data.flat();
// write a file with the courses json object but also export it as a default export
fs.writeFileSync('../../constants/courses.json', `${JSON.stringify(courses)}`)
fs.writeFileSync('../../constants/requirements.json', `${JSON.stringify(requirements)}`)

// Expected a JSON object, array or literal



// the courses.json file should export the data object as a default export
// fs.writeFileSync('./courses.json', `export default ${courses}`)

// fs.writeFileSync('./courses.json', JSON.stringify(data));
