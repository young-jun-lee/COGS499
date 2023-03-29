import { codeExtractor } from './codeExtractor.js';

export const formatResults = (course: string, str: string, regexPattern: RegExp) => {
    // console.log("course: ", course);
    let result = str.match(regexPattern);
    let stringResult = result != null ? result[0] : "None";
    let parsedResult = codeExtractor(course, stringResult);
    return parsedResult !== undefined ? parsedResult : ["None"];
};
