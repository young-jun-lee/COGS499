import { Button, Flex, Group, Tooltip, Notification } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSnapshot } from "valtio";
import { state } from '../../Valtio/State';
import { addYear, moveCourse } from "../../Valtio/helperFunctions";
import { constants } from "../../content/Constants";
import SearchBar from "./SearchBar";
import Year from "./Year";
import Search from "./SearchContainer";
import { HiViewGridAdd } from "react-icons/hi";
import { showNotification } from '@mantine/notifications';

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;

        // console.log(snap.columns[destination.index - 1].limitCourses)
        // const destObject = snap.columns[destination.index - 1]
        // if (destObject.items.length >= destObject.limitCourses) {
        //     showNotification({
        //         title: 'Max Courses Reached',
        //         message: `You have reached the maximum number of courses for ${destObject.name}`,
        //         color: 'red',
        //     });
        // }

        if (source.droppableId !== destination.droppableId) {
            (moveCourse(source.droppableId, source.index, destination.index, destination.droppableId, true));

        } else {
            (moveCourse(source.droppableId, source.index, destination.index))

        }
    };

    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%" }}>

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
            <Group position="right" style={{ marginTop: "10px" }}>
                {snap.numYears < constants.MAX_YEARS ?
                    <Button leftIcon={<HiViewGridAdd size={20} />}
                        onClick={() => {
                            addYear()
                        }}
                    >
                        Add Year
                    </Button>
                    :
                    <Tooltip label="Max Academic Years">
                        <Button
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                            onClick={(event) => event.preventDefault()}
                        >
                            Add Year
                        </Button>
                    </Tooltip>
                }
            </Group>
        </Flex >
    );
};

export default SelectContainer;