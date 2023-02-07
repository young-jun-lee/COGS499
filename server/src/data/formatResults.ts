import { codeExtractor } from './codeExtractor.js';

export const formatResults = (str: string, regexPattern: RegExp) => {
    let result = str.match(regexPattern);
    let stringResult = result != null ? result[0] : "None";
    let parsedResult = codeExtractor(stringResult);
    return parsedResult !== undefined ? parsedResult : ["None"];
};
