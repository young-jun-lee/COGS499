
import { CheerioCrawler, Dataset, enqueueLinks, log } from 'crawlee';

const codeExtractor = (requirements: string) => {
    let courseCodes: string[] = [];


    const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})))/g

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
          }
          // get rid of empty strings
          splitString.filter((e) => e.trim().length > 0);


        // console.log("\nbefore parsing: ") 
        // console.log(splitString);

        function parseCourses(array) {
            const stack = [];
            let courses = [];
            let i = 0;
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
            return courses;
          }
          


        const parsedCourses = parseCourses(splitString);
        // console.log("after parsing: ");
        // console.log(parsedCourses)
        // // first check if the first element is a square bracket, then get all course codes until the next square bracket
        return parsedCourses
        }

        // console.log(courseCodes)
        // return courseCodes
      } 




const crawler = new CheerioCrawler({
    async requestHandler({ request, response, body, contentType, $, log }) {

        const data = [];

        $('div.courseblock').each((index, el) => {
            const requirements = ($(el).find('span.text.detail-requirements.margin--default').text())



            let prerequisites: RegExpMatchArray = requirements.match(/Prerequisite(.*?)\./g);
            // convert prerequisites into a string
            let stringPrerequisites: string = prerequisites != null ? prerequisites[0] : "None";
            // console.log(stringPrerequisites)
            // remove the word 'Prerequisite' from the string and trim the whitespace
            // stringPrerequisites = stringPrerequisites.replace('Prerequisite', '').trim()
            // console.log(stringPrerequisites)
            let codeCleaned = codeExtractor(stringPrerequisites);
            
            let objectPrerequisites = []
            if( codeCleaned !== undefined){




            } else {
                objectPrerequisites = ["None"]
                // for (let i = 0; i < codeCleaned.length; i++){
                //     objectPrerequisites.push(codeCleaned[i])
                }
            console.log(objectPrerequisites)
            // console.log(objectPrerequisites)
            // log.info($(el).find('span.text.col-2.detail-code').text() + ": " + codeCleaned);

            // log.info($(el).find('span.text.col-2.detail-code').text() + ': ' + cleanedCourses);

            data.push({
                code: $(el).find('span.text.col-2.detail-code').text(),
                title: $(el).find('span.text.col-7.detail-title').text(),
                units: Number($(el).find('span.text.detail-hours_html').text().split(' ')[1]),
                description: $(el).find('p.courseblockextra').text(),
                hours: $(el).find('span.text.detail-learning_hours').text().split(': ')[1],
                prerequisites: stringPrerequisites,
                // corequisites: corequisites,
                // exclusions: exclusions
            });
        });

        // // Save the data to dataset.
        await Dataset.pushData({
            url: request.url,
            data,
        })
    },
});

// Start the crawler with the provided URLs
await crawler.run(['https://www.queensu.ca/academic-calendar/arts-science/course-descriptions/cisc/']);