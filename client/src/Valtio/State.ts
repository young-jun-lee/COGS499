import { proxy } from "valtio";
import { Basket, Columns, Course, NumYears, Specialization } from "../types/stateTypes";


export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears, columns: Columns[], courses: Course[] }>({

    specialization: {
        colours: {
            primary: "black",
            secondary: "#e6e7e8",
            tertiary: "white"
        }
    },
    currentBasket: [],
    numYears: 1,
    columns: [
        {
            name: "search bar",
            items: [{ id: "CISC 275", value: "CISC 275", group: "CISC", prerequisites: ["CISC 101", "CISC 102", "CISC 103", "CISC 104"], corequisites: ["None"], exclusions: ["None"], one_way_exclusions: ["None"] },],
            limitCourses: 6
        },
        {
            name: "Year 1",
            items: [
                {
                    id: "CISC 101", value: "CISC 101", group: "CISC",
                    prerequisites: [
                        "None"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 102", value: "CISC 102", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 103", value: "CISC 103", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 104", value: "CISC 104", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 105", value: "CISC 105", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 106", value: "CISC 106", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 107", value: "CISC 107", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 108", value: "CISC 108", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 109", value: "CISC 109", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },
                {
                    id: "CISC 110", value: "CISC 110", group: "CISC",
                    prerequisites: [
                        "CISC 101"
                    ],
                    corequisites: [
                        "None"
                    ],
                    "exclusions": [
                        "APSC 142",
                        "APSC 143",
                        "CISC 110",
                        "CISC 151"
                    ],
                    "one_way_exclusions": [
                        "None"
                    ]
                },

                // { id: uuidv4(), value: "CISC 102", group: "CISC", },
                // { id: uuidv4(), value: "CISC 103", group: "CISC", },
                // { id: uuidv4(), value: "MATH 121", group: "MATH", },
                // { id: uuidv4(), value: "CISC 204", group: "CISC", },
                // { id: uuidv4(), value: "CISC 205", group: "CISC", },
                // { id: uuidv4(), value: "CISC 206", group: "CISC", },
                // { id: uuidv4(), value: "CISC 207", group: "CISC", },
                // { id: uuidv4(), value: "CISC 208", group: "CISC", },
                // { id: uuidv4(), value: "CISC 209", group: "CISC", },
                // { id: uuidv4(), value: "CISC 231", group: "CISC", },
                // { id: uuidv4(), value: "CISC 232", group: "CISC", },
            ],
            limitCourses: 12
        },
        {
            name: "Year 2",
            items: [
                { id: "CISC 205", value: "CISC 205", group: "CISC", prerequisites: ["CISC 101", "CISC 102", "CISC 103", "CISC 104"], corequisites: ["None"], exclusions: ["None"], one_way_exclusions: ["None"] },
            ],
            limitCourses: 12
        },
    ],
    courses: []
});


