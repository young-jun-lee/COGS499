import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from '../State';
import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { constants } from "../content/Constants";
import Year from "./Year";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";


const courses = [
    { id: "1", courseCode: "CISC 101" },
    { id: "2", courseCode: "CISC 102" },
    { id: "3", courseCode: "CISC 103" },
    { id: "4", courseCode: "MATH 121" },
    { id: "5", courseCode: "MATH 126" }
];


const courseSelection = {
    "year 1": {
        name: "Year 1",
        items: courses
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    // const [columns, setColumns] = useState(courseSelection);
    state.columns = courseSelection;
    // use valtio to store the columns
    return (
        <Flex style={{ flexDirection: "column", width: "65%", height: "100%" }}>

            {/* {[...Array(snap.numYears)].map((x, i) =>
                <Year year={i + 1}></Year>
            )} */}
            {snap.numYears < constants.MAX_YEARS ?
                <Button
                    onClick={() => {
                        state.numYears += 1

                        state.columns = {
                            ...state.columns,
                            [`year ${snap.numYears + 1}`]: {
                                name: `Year ${snap.numYears + 1}`,
                                items: []
                            }
                        }
                    }}
                >
                    Add Year
                </Button>
                : <Group position="center">
                    <Tooltip label="Max Academic Years">
                        <Button
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                            onClick={(event) => event.preventDefault()}
                        >
                            Add Year
                        </Button>
                    </Tooltip>
                </Group>
            }
            <div>
                <h1 style={{ textAlign: "center" }}>Courses</h1>
                <div
                    style={{ display: "flex", justifyContent: "center", height: "100%" }}
                >
                    <DragDropContext
                        onDragEnd={(result) => onDragEnd(result, snap.columns, setColumns)}
                    >
                        {Object.entries(snap.columns).map(([columnId, column], index) => {
                            console.log(column)
                            return (
                                <Year year={index + 1} key={columnId} column={column} columnId={columnId} index={index} />
                            );
                        })}
                    </DragDropContext >
                </div >
            </div >
        </Flex >
    );
};

export default SelectContainer;