import { proxy } from "valtio";
import { v4 as uuidv4 } from 'uuid';
import { showNotification } from "@mantine/notifications";

type Specialization = string
type Basket = string[]
type NumYears = 1 | 2 | 3 | 4 | 5 | 6

type Course = {
    id: string
    value: string
    group: string
}



type Columns = { name: string, items: Course[], limitCourses: number }


export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears, columns: Columns[] }>({
    specialization: "",
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

            items: [
                { id: uuidv4(), value: "CISC 101", group: "CISC" },
                { id: uuidv4(), value: "CISC 102", group: "CISC" },
                { id: uuidv4(), value: "CISC 103", group: "CISC" },
                { id: uuidv4(), value: "MATH 121", group: "MATH" },
                { id: uuidv4(), value: "CISC 104", group: "CISC" },
                { id: uuidv4(), value: "CISC 105", group: "CISC" },
                { id: uuidv4(), value: "CISC 106", group: "CISC" },
                { id: uuidv4(), value: "CISC 107", group: "CISC" },
                { id: uuidv4(), value: "CISC 108", group: "CISC" },
                { id: uuidv4(), value: "CISC 109", group: "CISC" },
                { id: uuidv4(), value: "CISC 131", group: "CISC" },
                { id: uuidv4(), value: "CISC 132", group: "CISC" },
            ],
            limitCourses: 12
        },

    ]

});

export function moveCourse(sourceColumn: string, sourceIndex: number, destIndex?: number, destColumn?: string, diffColumn = false) {

    // TODO: refactor to add check for if destColumn is undefined and use that to determine if it's a move within the same column or not
    // can then get rid of diffColumn param

    if (diffColumn) {
        if (state.columns[destColumn].items.length == state.columns[destColumn].limitCourses) {
            showNotification({
                title: 'Max Courses Reached',
                message: `You have reached the maximum number of courses for ${state.columns[destColumn].name}`,
                color: 'red',
            });
            return
        }
        const source = state.columns[sourceColumn];
        const dest = state.columns[destColumn];

        const copiedSource = [...source.items];
        const copiedDest = [...dest.items];
        const [removed] = copiedSource.splice(sourceIndex, 1);

        copiedDest.splice(destIndex, 0, removed);
        state.columns = {
            ...state.columns,
            [sourceColumn]: {
                ...source,
                items: copiedSource
            },
            [destColumn]: {
                ...dest,
                items: copiedDest
            }
        };
    } else {
        const column = state.columns[sourceColumn];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(sourceIndex, 1);
        copiedItems.splice(destIndex, 0, removed);
        state.columns = {
            ...state.columns,
            [sourceColumn]: {
                ...column,
                items: copiedItems
            }
        };
    }

}


export function addYear() {
    state.numYears += 1;

    state.columns = {
        ...state.columns,
        [state.numYears]: {
            name: `Year ${state.numYears}`,
            items: []
        }
    }
}
export function removeYear(columnId: string) {

    let columnIdConverted = parseInt(columnId)

    console.log("columnIdConverted: ", columnIdConverted)
    for (let i = columnIdConverted; i < state.numYears; i++) {
        state.columns[i + 1].name = `Year ${i}`
        state.columns[i] = state.columns[i + 1]

    }
    delete state.columns[state.numYears]
    state.numYears -= 1
}

