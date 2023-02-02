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

fs.writeFileSync('./courses.json', JSON.stringify(data));