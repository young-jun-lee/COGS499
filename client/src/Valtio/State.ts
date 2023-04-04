import { proxy } from "valtio";
import { Basket, Columns, Course, NumYears, Specialization } from "../types/stateTypes";


export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears, columns: Columns[], courses: Course[], }>({

    specialization: {
        colours: {
            primary: "black",
            secondary: "#e6e7e8",
            tertiary: "white"
        },
        core: [],
        options: [],
        supporting: []
    },
    currentBasket: [],
    numYears: 1,
    columns: [
        {
            name: "search bar",
            items: [],
            limitCourses: 6
        },
        {
            name: "Year 1",
            items: [],
            limitCourses: 12
        },
        {
            name: "Year 2",
            items: [],
            limitCourses: 12
        },
        {
            name: "Year 3",
            items: [],
            limitCourses: 12
        },
        {
            name: "Year 4",
            items: [],
            limitCourses: 12
        },
    ],
    courses: []
});


