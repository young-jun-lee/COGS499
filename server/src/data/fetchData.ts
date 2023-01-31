
import { CheerioCrawler, Dataset, enqueueLinks, KeyValueStore } from 'crawlee';
import { STAT_OPTIONS, NSCI_OPTIONS, COMA_OPTIONS, COIs } from './courseConstants.js';


const codeExtractor = (requirements: string) => {
    // const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})))/g
    
    // the above regex matches all course codes, including those in parentheses, brackets, and curly braces, should also include options ie. STAT_Options 
    const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})|(?:[A-Z]{4}_Options)))/g
    
    const match = requirements.match(courseCodeRegex);

    if(match !== null){
        const courseCodesString: string = match[0];
        const splitString = courseCodesString.split(/(\s+|\(|\)|\[|\])/g).filter((e) => e.trim().length > 0);
        // go through the array and check if there's a four character string, if there is concatenate it with the next element
        for (let i = 0; i < splitString.length; i++){
          if (splitString[i].length === 4){
            splitString[i] = splitString[i] + " " + splitString[i + 1];
            splitString.splice(i + 1, 1);
          }

          if (splitString[i].includes("Options")){
            if (splitString[i].includes("STAT")){
              splitString.splice(i, 1, ...STAT_OPTIONS);
            }
            if (splitString[i].includes("NSCI")){
              splitString.splice(i, 1, ...NSCI_OPTIONS);
            }
            if (splitString[i].includes("COMA")){
              splitString.splice(i, 1, ...COMA_OPTIONS);
            }
          }
        }
        // get rid of empty strings
        splitString.filter((e) => e.trim().length > 0);

        
        // console.log(requirements)
        // console.log("before parsing: ") 
        // console.log(splitString);

        function parseCourses(array) {
          const stack = [];
          let courses = [];
          let i = 0;

          if (array[0] ==="(" && array[array.length - 1] === ")") {
            array.shift();
            array.pop();
          }
          while (i < array.length) {
            if (array[i].match(/\b[A-Z]{4}\s\d{3}\b/)) {
              courses.push(array[i]);
              if (array[i + 1] === 'or') {
                i++;
                continue;
              }
            } else if (array[i] === '[' || array[i] === '(') {
              stack.push(courses);
              courses.push([]);
              courses = courses[courses.length - 1];
            } else if (array[i] === ']' || array[i] === ')') {
              courses = stack.pop();
            }
            i++;
          }
          let numCourses = 0
          let numOr = 0
          for (let i = 0; i < array.length; i++){
            if (array[i].match(/\b[A-Z]{4}\s\d{3}\b/)){
              numCourses++;
            }
            if (array[i] === "or"){
              numOr++;
            }
          }
          if (numCourses === numOr + 1 && courses.length !== 1){
            courses = [courses]
          }
          return courses;
        }

        let courseCodes: string[] = parseCourses(splitString);
        // console.log("after parsing: ");
        // console.log(courseCodes)
        // console.log("\n")
        // // first check if the first element is a square bracket, then get all course codes until the next square bracket
        return courseCodes
        }
      } 




const crawler = new CheerioCrawler({
    async requestHandler({ request, $ }) {
        // Add all links from page to RequestQueue
        const data = [];

        $('div.courseblock').each((index, el) => {
            const requirements = ($(el).find('span.text.detail-requirements.margin--default').text())
            

            const extract = (str: string, regexPattern: RegExp) => {
              let result = str.match(regexPattern);
              let stringResult = result != null ? result[0] : "None";
              let parsedResult = codeExtractor(stringResult);
              return parsedResult !== undefined ? parsedResult : ["None"];
            }
            
            let prerequisites = extract(requirements, /Prerequisite(.*?\.)(?!\d)/);
            let corequisites = extract(requirements, /Corequisite(.*?)\./g);
            let exclusions = extract(requirements, /Exclusion(.*?)\./g);
            

            data.push({
                code: $(el).find('span.text.col-2.detail-code').text(),
                title: $(el).find('span.text.col-7.detail-title').text(),
                units: Number($(el).find('span.text.detail-hours_html').text().split(' ')[1]),
                description: $(el).find('p.courseblockextra').text(),
                hours: $(el).find('span.text.detail-learning_hours').text().split(': ')[1],
                prerequisites: prerequisites,
                corequisites: corequisites,
                exclusions: exclusions,
            });
        });

        await Dataset.pushData({
            url: request.url,
            data,
        })
    }
});






await crawler.run(COIs);
