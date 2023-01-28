
import { CheerioCrawler, Dataset, enqueueLinks, log } from 'crawlee';

const codeExtractor = (requirements: string) => {
    let courseCodes: string[] = [];


    const courseCodeRegex = /((?:(?:[A-Z]{4}\s\d{3})|(?:\([A-Z]{4}\s\d{3}[^()]*\)|\[[A-Z]{4}\s\d{3}[^[\]]*\]|\{[A-Z]{4}\s\d{3}[^{}]*\})))/g

    const match = requirements.match(courseCodeRegex);

    if(match !== null){
        const courseCodesString: string = match[0];

        if (courseCodesString.length === 8){
            courseCodes.push(courseCodesString);
        }
        // let a = "(CISC 204 and CISC 223 and [CISC 360 or CISC 260])"
        // I want to get the course codes from the string above but I can't just separate by spaces bc CISC 204, CISC 223 and CISC 360 have a whitespace instead of a space but CISC 260 has a space
        // so I need to find the first opening bracket, then find the closing bracket, then find the first opening bracket after that, then find the closing bracket after that, etc.
        // then I can split the string by spaces and get the course codes

        else{
          // console.log(courseCodesString)
          let splitString: string[] = courseCodesString.split(' ');
          // go through the array and check if there's a four character string, if there is concatenate it with the next element
          for (let i = 0; i < splitString.length; i++){
            if (splitString[i].length === 4){
              splitString[i] = splitString[i] + " " + splitString[i + 1];
              splitString.splice(i + 1, 1);
            }
          }
            
            // [ '(CISC 121', 'and', '[CISC 102', 'or', 'MATH 110])' ]

            console.log("before parsing: " + splitString);
            
            function parseCourses(arr) {
              let output = [];
              let buffer = [];
              let inOr = false;
              for (let i = 0; i < arr.length; i++) {
                let elem = arr[i].trim().replace(/[\(\[\)\]]/g, '');
                if (elem === 'and') {
                  if (inOr) {
                    output.push(buffer);
                    buffer = [];
                    inOr = false;
                  } else {
                    output.push(buffer.join(" "));
                    buffer = [];
                  }
                } else if (elem === 'or') {
                  inOr = true;
                } else {
                  buffer.push(elem);
                }
              }
              if (buffer.length > 0) {
                if (inOr) {
                  output.push(buffer);
                } else {
                  output.push(buffer.join(" "));
                }
              }
              return output;
            }
            
            const parsedCourses = parseCourses(splitString);
            console.log("after parsing: ");
            console.log(parsedCourses)
            // // first check if the first element is a square bracket, then get all course codes until the next square bracket
            // if (splitString[0].charAt(0) === '['){
            //     let closingBracket = 1;
            //     let optionsArray: string[] = [];
            //     // find the index of the closing bracket
            //     while (splitString[closingBracket].charAt(splitString[closingBracket].length - 1) !== ']'){
            //         closingBracket++;
            //     }
            //     const regexCourseCodes = /([A-Z]{4}\s\d{3})/g
            //     for (let i = 0; i <= closingBracket; i++){
            //         const match = splitString[i].match(regexCourseCodes);
            //         if (match !== null){
            //             optionsArray.push(match[0]);
            //         }
            //     }
            //     console.log(optionsArray);
            // }
// [CISC 226, [CISC 322, CISC 326], CISC 324, [MATH 110, MATH 111, MATH 112]]
        }

        // console.log(courseCodes)
        return courseCodes
      } else {
        // console.log("No match found");
      }
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