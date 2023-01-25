// You don't need to import RequestQueue anymore
import { CheerioCrawler, Dataset, enqueueLinks, log } from 'crawlee';

const crawler = new CheerioCrawler({
    async requestHandler({ request, response, body, contentType, $, log }) {

        const data = [];

        $('div.courseblock').each((index, el) => {
            const requirements = ($(el).find('span.text.detail-requirements.margin--default').text())

            let prerequisites = requirements.match(/Prerequisite [A-Z]{4} [0-9]{3}(?:, [A-Z]{4} [0-9]{3})*(?:\.)/);
            // check if prerequisites exist and remove the "Prerequisite" part
            log.info(prerequisites);
            data.push({
                code: $(el).find('span.text.col-2.detail-code').text(),
                title: $(el).find('span.text.col-7.detail-title').text(),
                units: Number($(el).find('span.text.detail-hours_html').text().split(' ')[1]),
                description: $(el).find('p.courseblockextra').text(),
                hours: $(el).find('span.text.detail-learning_hours').text().split(': ')[1],
                prerequisites: prerequisites,
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