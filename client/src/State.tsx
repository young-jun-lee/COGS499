import { proxy } from "valtio";
import { v4 as uuidv4 } from 'uuid';

type Specialization = string
type Basket = string[]
type NumYears = 1 | 2 | 3 | 4 | 5 | 6

// type Columns = { [year: string]: { name: string, items: { id: string, courseCode: string }[] } }
type Courses = {
    id: string
    value: string
    group: string
}
type Columns = { name: string, items: Courses[] }


export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears, columns: Columns[] }>({
    specialization: "",
    currentBasket: [],
    numYears: 1,
    columns: [
        {
            name: "Year 1",
            items: [
                { id: uuidv4(), value: "CISC 101", group: "CISC" },
                { id: uuidv4(), value: "CISC 102", group: "CISC" },
                { id: uuidv4(), value: "CISC 103", group: "CISC" },
                { id: uuidv4(), value: "MATH 121", group: "MATH" },
                { id: uuidv4(), value: "MATH 126", group: "MATH" }
            ]
        },
        {
            name: "search bar",
            items: []
        }
    ]

});

export function moveCourse(sourceColumn: string, sourceIndex: number, destIndex?: number, destColumn?: string, diffColumn = false) {
    const columnKeys = Object.keys(state.columns).filter(key => key.startsWith('Year'));
    console.log("state.columns in moveCourse: ", state.columns)
    if (diffColumn) {
        const source = state.columns[sourceColumn];
        const dest = state.columns[destColumn];

        console.log("source: ", source)
        console.log("dest: ", dest)


        const copiedSource = [...source.items];
        const copiedDest = [...dest.items];
        console.log("copiedSource: ", copiedSource)
        console.log("copiedDest: ", copiedDest)
        const [removed] = copiedSource.splice(sourceIndex, 1);
        console.log("removed: ", removed)
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
export function removeYear() {
    state.numYears -= 1;

    const removedState = { ...state.columns };
    state.columns = Object.keys(removedState).reduce((acc, key) => {
        return key !== `${state.numYears + 1}` ? { ...acc, [key]: removedState[key] } : acc;
    }, {});


}

