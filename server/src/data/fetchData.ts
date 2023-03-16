import { CheerioCrawler, Dataset } from 'crawlee';
import { COIs } from '../../constants/courseConstants.js';
import { CompCOIs } from '../../constants/courseConstants.js';
import { formatResults } from './formatResults.js';

const crawler = new CheerioCrawler({
  async requestHandler({ request, $ }) {
    // Add all links from page to RequestQueue

    const data = [];

    $('div.courseblock').each((index, el) => {
      const requirements = ($(el).find('span.text.detail-requirements.margin--default').text())
      console.log("Course CODE:",$(el).find('span.text.col-2.detail-code').text());

      let prerequisites = formatResults(requirements, /Prerequisite(.*?\.)(?!\d)|PREREQUISITES:(.*)/);
      let corequisites = formatResults(requirements, /Corequisite(.*?\.)(?!\d)|Corequisites(.*?)\./g);
      let exclusions = formatResults(requirements, /Exclusion(.*?)\./g);
      let one_way_exclusions = formatResults(requirements, /One-Way Exclusion(.*?)\.|One-way Exclusion(.*?)\.|One-way exclusion(.*?)\.|One Way Exclusion(.*?)\.|One Way exclusion(.*?)\.|One way exclusion(.*?)\./g);

      if (one_way_exclusions.length > 0 && exclusions.length > 0 && !(one_way_exclusions[0] === "None" && exclusions[0] === "None")) {        exclusions = exclusions.filter(exclusion => !one_way_exclusions.includes(exclusion))      } 

      if (exclusions.length === 0) { exclusions.push("None") }

      data.push({
        code: $(el).find('span.text.col-2.detail-code').text(),
        title: $(el).find('span.text.col-7.detail-title').text(),
        units: Number($(el).find('span.text.detail-hours_html').text().split(' ')[1]),
        description: $(el).find('p.courseblockextra').text(),
        hours: $(el).find('span.text.detail-learning_hours').text().split(': ')[1],
        prerequisites: prerequisites,
        corequisites: corequisites,
        exclusions: exclusions,
        one_way_exclusions: one_way_exclusions,
      });
    });

    await Dataset.pushData({
      url: request.url,
      data,
    })
  }
});




// await crawler.run(COIs);
await crawler.run(CompCOIs);
// await crawler.run(['https://www.queensu.ca/academic-calendar/arts-science/course-descriptions/psyc/'])
export { crawler, formatResults }