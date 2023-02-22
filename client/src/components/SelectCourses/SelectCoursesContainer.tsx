import { FC, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { state, moveCourse, addYear } from '../../State';
import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { constants } from "../../content/Constants";
import Year from "./Year";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";


const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        moveCourse(source.droppableId, source.index, destination.index, destination.droppableId, true);
    } else {
        moveCourse(source.droppableId, source.index, destination.index);
    }
};

const SelectContainer: FC = () => {
    // state.columns = courseSelection;
    const snap = useSnapshot(state);
    // const [columns, setColumns] = useState(snap.columns);

    // useEffect(() => {
    //     console.log(snap.columns)
    // }, [snap.columns])
    // const [columns, setColumns] = useState(courseSelection);
    // use valtio to store the columns
    return (
        <Flex style={{ flexDirection: "column", width: "65%", height: "100%" }}>
            {snap.numYears < constants.MAX_YEARS ?
                <Button
                    onClick={() => {
                        addYear()

                        // console.log(snap.columns)
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
                        onDragEnd={(result) => {
                            onDragEnd(result, snap.columns);
                        }}
                    >
                        {Object.entries(snap.columns).map(([columnId, column], index) => {
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