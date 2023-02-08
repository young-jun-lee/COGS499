const coursesJSON = require("../constants/courses.json");
const requirementsJSON = require("../constants/requirements.json");


for (let i = 0; i < Object.keys(coursesJSON).length; i++) {
    let course = Object.keys(coursesJSON)[i];
    let courseJSON = coursesJSON[course];
    let requirements = requirementsJSON[course];
    test(`comparing ${course} requirements`, async () => {
        expect(courseJSON["prerequisites"]).toEqual(requirements["prerequisites"]);
        expect(courseJSON["corequisites"]).toEqual(requirements["corequisites"]);
        expect(courseJSON["exclusions"]).toEqual(requirements["exclusions"]);
    });
}
