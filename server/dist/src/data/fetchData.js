import { CheerioCrawler, Dataset } from 'crawlee';
import { COIs } from '../../constants/courseConstants.js';
import { formatResults } from './formatResults.js';
const crawler = new CheerioCrawler({
    async requestHandler({ request, $ }) {
        // Add all links from page to RequestQueue
        const data = [];
        $('div.courseblock').each((index, el) => {
            const requirements = ($(el).find('span.text.detail-requirements.margin--default').text());
            const course = $(el).find('span.text.col-2.detail-code').text();
            let prerequisites = formatResults(course, requirements, /Prerequisite(.*?\.)(?!\d)|PREREQUISITES:(.*)|Prerequisites:(.*)/);
            let corequisites = formatResults(course, requirements, /Corequisite(.*?)\.|Corequisites:(.*)/g);
            let exclusions = formatResults(course, requirements, /Exclusion(.*?)\.|Exclusions:(.*)/g);
            let one_way_exclusions = formatResults(course, requirements, /One-Way Exclusion(.*?)\.|One-way Exclusion(.*?)\.|One-way exclusion(.*?)\.|One Way Exclusion(.*?)\.|One Way exclusion(.*?)\.|One way exclusion(.*?)\./g);
            // 
            // check if one way exclusions are in exclusions and remove them 
            if (one_way_exclusions.length > 0 && exclusions.length > 0 && !(one_way_exclusions[0] === "None" && exclusions[0] === "None")) {
                exclusions = exclusions.filter(exclusion => !one_way_exclusions.includes(exclusion));
            }
            if (exclusions.length === 0) {
                exclusions.push("None");
            }
            if (one_way_exclusions.length === 0) {
                one_way_exclusions.push("None");
            }
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
        });
    }
});
await crawler.run(COIs);
// await crawler.run(['https://queensu-ca-public.courseleaf.com/engineering-applied-sciences/courses-instruction/soft/'])
export { crawler, formatResults };
//# sourceMappingURL=fetchData.js.map