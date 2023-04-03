import { codeExtractor } from './codeExtractor.js';
export const formatResults = (course, str, regexPattern) => {
    // console.log("course: ", course);
    let result = str.match(regexPattern);
    let stringResult = result != null ? result[0] : "None";
    let parsedResult = codeExtractor(course, stringResult);
    return parsedResult !== undefined ? parsedResult : ["None"];
};
//# sourceMappingURL=formatResults.js.map