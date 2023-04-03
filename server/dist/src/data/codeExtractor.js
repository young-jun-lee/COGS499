import { COMA_OPTIONS, NSCI_OPTIONS, STAT_OPTIONS } from "../../constants/courseConstants.js";
export const codeExtractor = (course, requirements) => {
    console.log("course: ", course);
    console.log("requirements string: ", requirements);
    // const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})|(?:[A-Z]{4}_Options))|(?:\{[^}]*\}))/g
    // const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})|(?:[A-Z]{4}_Options))|(?:\{[^}]*\})|(and))/g
    const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})|(?:[A-Z]{4}_Options))|(?:\{[^}]*\})|(and)|(?:[A-Z]+\/(?:[A-Z]+\/)*[A-Z]+\s+at\s+the\s+\d{3}-level\s+or\s+above))/g;
    const match = requirements.match(courseCodeRegex);
    console.log("match: ", match);
    if (match !== null) {
        let courseCodesString = match.join(" ");
        console.log(courseCodesString);
        const oneWayExclusionRegex = /([A-Z]+\/(?:[A-Z]+\/)*[A-Z]+)\s+at\s+the\s+(\d{3})-level\s+or\s+above/g;
        const oneWayExclusionMatch = courseCodesString.match(oneWayExclusionRegex);
        if (oneWayExclusionMatch) {
            const oneWayExclusionCourseCodes = oneWayExclusionMatch[0].split(" at the ")[0].split("/");
            const oneWayExclusionLevel = oneWayExclusionMatch[0].split(" at the ")[1].split("-level")[0][0];
            const oneWayExclusionCourseCodesWithLevel = oneWayExclusionCourseCodes.map(courseCode => `${courseCode} ${oneWayExclusionLevel}++`);
            const oneWayExclusionCourseCodesWithLevelString = `and [${oneWayExclusionCourseCodesWithLevel.join(" or ")}]`;
            courseCodesString = courseCodesString.replace(oneWayExclusionMatch[0], oneWayExclusionCourseCodesWithLevelString);
        }
        // split the string into an array of strings based on spaces, parentheses, and brackets
        const splitString = courseCodesString.split(/(\s+|\(|\)|\[|\])/g).filter((e) => e.trim().length > 0);
        // go through the array and check if there's a four character string, if there is concatenate it with the next element
        for (let i = 0; i < splitString.length; i++) {
            if (splitString[i].length === 4) {
                splitString[i] = splitString[i] + " " + splitString[i + 1];
                splitString.splice(i + 1, 1);
            }
            if (splitString[i].includes("Options")) {
                if (splitString[i].includes("STAT")) {
                    splitString.splice(i, 1, ...STAT_OPTIONS);
                }
                if (splitString[i].includes("NSCI")) {
                    splitString.splice(i, 1, ...NSCI_OPTIONS);
                }
                if (splitString[i].includes("COMA")) {
                    splitString.splice(i, 1, ...COMA_OPTIONS);
                }
            }
            if (splitString[i].includes(";")) {
                splitString[i] = splitString[i].replace(";", "");
            }
            if (splitString[i].includes("/")) {
                splitString[i] = splitString[i].slice(0, 8);
            }
        }
        console.log("before parsing: ");
        while (splitString[0] === "and") {
            splitString.shift();
        }
        console.log(splitString);
        // let courseCodes: string[] = parseCourses(splitString);
        let courseCodes = parseCourses(splitString);
        console.log("after parsing: ");
        console.log(courseCodes);
        console.log("\n");
        return courseCodes;
    }
};
function parseCourses(inputArray) {
    const result = [];
    let tempCourses = [];
    for (let i = 0; i < inputArray.length; i++) {
        const element = inputArray[i];
        // const coursePattern = /^[A-Z]{4}\s\d{3}$/;
        const coursePattern = /^[A-Z]{4}\s\d{3}$|^[A-Z]{4}\s\d{1}\+\+/;
        if (coursePattern.test(element)) {
            tempCourses.push(element);
        }
        else if (element === 'and') {
            if (tempCourses.length > 0) {
                result.push(tempCourses);
                tempCourses = [];
            }
        }
        else if (element === 'or') {
            continue;
        }
    }
    if (tempCourses.length > 0) {
        result.push(tempCourses);
    }
    return result;
}
// const parseCourses = (array) => {
//   const stack = [];
//   let courses = [];
//   let i = 0;
//   if (array[0] === "(" && array[array.length - 1] === ")" || array[0] === "{" && array[array.length - 1] === "}") {
//     array.shift();
//     array.pop();
//   }
//   while (i < array.length) {
//     if (array[i].match(/\b[A-Z]{4}\s\d{3}\b|\b[A-Z]{4}\s\d{1}\b/)) {
//       courses.push([array[i]]);
//       if (array[i + 1] === 'or') {
//         i++;
//         continue;
//       }
//     } else if (array[i] === '[' || array[i] === '(') {
//       stack.push(courses);
//       courses.push([]);
//       courses = courses[courses.length - 1];
//     } else if (array[i] === ']' || array[i] === ')') {
//       courses = stack.pop();
//       if (!courses) {
//         courses = [];
//       }
//     }
//     i++;
//   }
//   let numCourses = 0
//   let numOr = 0
//   for (let i = 0; i < array.length; i++) {
//     if (array[i].match(/\b[A-Z]{4}\s\d{3}\b/)) {
//       numCourses++;
//     }
//     if (array[i] === "or") {
//       numOr++;
//     }
//   }
//   if (numCourses === numOr + 1 && courses.length !== 1) {
//     courses = [courses]
//   }
//   return courses;
// }
//# sourceMappingURL=codeExtractor.js.map