import { Box, Button, Group, Tooltip, Notification } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSnapshot } from 'valtio';
import { removeYear, state } from '../../State';
import { StrictModeDroppable } from './StrictModeDroppable';
import { MdDeleteSweep, MdClear } from "react-icons/md";
interface RequiredCourses {
    year: string;
    key: string
    column: any
    index: number
    columnId: string
}

const Year: FC<RequiredCourses> = ({ year, column, columnId }) => {


    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                // textAlign: 'center',
                // width: '100%',
                // height: '40%',
                padding: theme.spacing.sm,
                borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })}
        >

            <Group position="right">
                {state.numYears > 3 ?
                    <Button leftIcon={<MdDeleteSweep size={18} />}
                        onClick={() => {
                            removeYear(columnId)
                        }}
                    >
                        Delete Year
                    </Button>
                    :
                    <Tooltip label="Minimum 3 Academic Years">
                        <Button leftIcon={<MdDeleteSweep />}
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                            onClick={(event) => event.preventDefault()}
                        >
                            Delete Year
                        </Button>
                    </Tooltip>
                }
            </Group>
            <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5 }}>{year}</Box>
            <Box
                sx={(theme) => ({
                    backgroundColor: '#ede8f3',
                    // height: '90%',
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.md,
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[5],
                    },
                })}

            >
                <div style={{ margin: 8 }}>
                    <StrictModeDroppable droppableId={columnId} direction='horizontal'>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver
                                            ? "lightblue"
                                            : "lightgrey",

                                        display: "flex",

                                        flexWrap: "wrap",
                                        // columnCount: 2, // set the number of columns to 2
                                        // columnGap: 10, // set a gap between the columns
                                    }}
                                >
                                    {column.items.map((item, index) => {

                                        return (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}

                                            >
                                                {(provided, snapshot) => {

                                                    return (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: "none",
                                                                display: "flex",
                                                                // textAlign: "center",
                                                                // justifyContent: "center",
                                                                alignItems: "center",
                                                                // to align the text in the center

                                                                padding: 30,
                                                                margin: 10,
                                                                borderRadius: "5px",

                                                                // minHeight: "50px",
                                                                height: "40px",
                                                                backgroundColor: snapshot.isDragging
                                                                    ? "#263B4A"
                                                                    : "#456C86",
                                                                color: "white",
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            {item.value}
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </StrictModeDroppable>

                </div>



            </Box>

        </Box>


    )
}

export default Year