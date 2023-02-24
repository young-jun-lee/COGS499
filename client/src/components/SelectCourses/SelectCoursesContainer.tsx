import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSnapshot } from "valtio";
import { addYear, moveCourse, state } from '../../State';
import { constants } from "../../content/Constants";
import SearchBar from "./SearchBar";
import Year from "./Year";
import Search from "./SearchContainer";


const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        moveCourse(source.droppableId, source.index, destination.index, destination.droppableId, true);
    } else {
        moveCourse(source.droppableId, source.index, destination.index);
    }
};

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%" }}>
            {snap.numYears < constants.MAX_YEARS ?
                <Button
                    onClick={() => {
                        addYear()
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
                    style={{
                        display: "grid", gridTemplateColumns: "1fr auto",
                    }}
                >
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result)}
                    >
                        {/* <Flex style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column" }}> */}
                        <Flex style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            {Object.entries(snap.columns).map(([columnId, column], index) => {
                                if (column.name !== "search bar") {
                                    return (
                                        <Year
                                            year={column.name}
                                            key={columnId}
                                            column={column}
                                            columnId={columnId}
                                            index={index}
                                        />
                                    );
                                }
                            })}
                        </Flex>
                        {/* <SearchBar column={snap.columns[0]} columnId="0" /> */}
                        <Search column={snap.columns[0]} columnId="0" />
                        {/* </Flex> */}
                    </DragDropContext >
                </div >
            </div >
        </Flex >
    );
};

export default SelectContainer;