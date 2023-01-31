
import { CheerioCrawler, Dataset, enqueueLinks, KeyValueStore } from 'crawlee';

const STAT_OPTIONS = [
  'BIOL 243',
  'CHEE 209',
  'COMM 162',
  'ECON 250',
  'GPHY 247',
  'KNPE 251',
  'NURS 323',
  'POLS 385',
  'PSYC 202',
  'SOCY 211',
  'STAM 200',
  'STAT 263',
  'STAT 367'
]

const NSCI_OPTIONS = [
  'NSCI 323',
  'NSCI 324	',
  'NSCI 401	'
]

const COMA_OPTIONS = [
  'BIOM 300',
  'CISC 271',
  'CISC 330',
  'CISC 371',
  'CISC 372',
  'CISC 422',
  'CISC 455',
  'CISC 457',
  'CISC 462',
  'CISC 465',
  'CISC 466',
  'CISC 467',
  'CISC 472',
  'CISC 473',
  'CISC 500',
  'MATH 337',
  'MATH 339',
  'MATH 401',
  'MATH 402',
  'MATH 406',
  'MATH 413',
  'MATH 414',
  'MATH 418',
  'MATH 474',
  'MATH 477',
  'STAT 361',
  'STAT 456',
  'STAT 457',
  'STAT 462',
  'STAT 463',
  'STAT 464',
  'STAT 471',
  'STAT 473',
  'STAT 486'
]

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


const COIs = [
  // ARTS AND SCIENCE
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/anat/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/anim/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ansh/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/arab/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/arth/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ascx/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/astr/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/bchm/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/biom/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/biol/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/badr/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/blck/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/canc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/crss/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/chem/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/chin/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/clst/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/cogs/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/epid/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/coca/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/comp/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/cisc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/cwri/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/dram/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ddht/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/econ/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/empr/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/engl/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/enin/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ensc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/film/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/artf/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/fren/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/frst/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/gnds/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/gphy/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/geol/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/grmn/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/devs/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/grek/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/hlth/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/hebr/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/hist/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/indg/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/idis/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ints/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/inuk/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/itln/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/japn/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/jwst/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/knpe/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/lang/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/llcu/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/latn/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/libs/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/lisc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ling/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/math/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/mapp/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/micr/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/mohk/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/musc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/muth/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/nsci/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/path/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/phar/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/phil/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/phys/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/phgy/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/pols/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/ppec/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/port/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/pact/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/intn/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/psyc/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/qgsp/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/rels/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/repd/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/socy/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/span/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/stat/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/stam/',
  'https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/writ/',
  // Engineering and Applied Science
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/aspc/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/chee/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/civl/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/cmpe/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/elec/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/ench/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/enph/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/geoe/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/mthe/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/mech/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/mren/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/mine/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/mntc/',
  'https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/soft/',
  // HEALTH SCIENCES
  'https://queensu-ca-public.courseleaf.com/health-sciences/bhsc/courses-instruction/',
  // NURSING 
  'https://queensu-ca-public.courseleaf.com/nursing/bachelor-nursing-science-course-descriptions/',

  // SMITH
  'https://queensu-ca-public.courseleaf.com/business/bachelor-commerce/courses-of-instruction/by20number/#onezerozeroleveltext/',
  'https://queensu-ca-public.courseleaf.com/business/bachelor-commerce/courses-of-instruction/by20number/#twozerozeroleveltext/',
  'https://queensu-ca-public.courseleaf.com/business/bachelor-commerce/courses-of-instruction/by20number/#threezerozeroleveltext/',
  'https://queensu-ca-public.courseleaf.com/business/bachelor-commerce/courses-of-instruction/by20number/#fourzerozeroleveltext/',
  'https://queensu-ca-public.courseleaf.com/business/bachelor-commerce/courses-of-instruction/by20number/#fivezerozeroleveltext/',

]





await crawler.run(COIs);
