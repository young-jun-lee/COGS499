import { showNotification } from "@mantine/notifications";
import { state } from "./State";


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
            return;
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


export function swapCourses(sourceColumn: string, sourceIndex: number, destIndex: number) {
    const column = state.columns[sourceColumn];
    const copiedItems = [...column.items];
    const temp = copiedItems[sourceIndex];
    copiedItems[sourceIndex] = copiedItems[destIndex];
    copiedItems[destIndex] = temp;
    state.columns = {
        ...state.columns,
        [sourceColumn]: {
            ...column,
            items: copiedItems
        }
    };
    console.log("state.columns: ", state.columns);
}

export function addYear() {
    state.numYears += 1

    state.columns = {
        ...state.columns,
        [state.numYears]: {
            name: `Year ${state.numYears}`,
            items: [],
            limitCourses: 12
        }
    };
}
export function removeYear(columnId: string) {

    let columnIdConverted = parseInt(columnId);

    console.log("columnIdConverted: ", columnIdConverted);
    for (let i = columnIdConverted; i < state.numYears; i++) {
        state.columns[i + 1].name = `Year ${i}`;
        state.columns[i] = state.columns[i + 1];

    }
    delete state.columns[state.numYears];
    state.numYears -= 1
}
