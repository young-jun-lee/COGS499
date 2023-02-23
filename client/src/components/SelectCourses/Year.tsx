import { Box, Button } from '@mantine/core';
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSnapshot } from 'valtio';
import { removeYear, state } from '../../State';
import { StrictModeDroppable } from './StrictModeDroppable';

interface RequiredCourses {
    year: number;
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
                width: '100%',
                height: '40%',
                padding: theme.spacing.sm,
                marginLeft: "1px",
                marginRight: "1px",
                marginTop: theme.spacing.md,
                marginBottom: theme.spacing.md,

                borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })}
        >
            <Button
                onClick={() => {
                    removeYear(columnId)
                }}
            >
                Delete Year
            </Button>
            <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5 }}>{`Year ${year}`}</Box>
            <Box
                sx={(theme) => ({
                    backgroundColor: '#ede8f3',
                    height: '90%',
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[5],
                    },
                })}

            >
                <div style={{ margin: 8 }}>
                    <StrictModeDroppable droppableId={columnId}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver
                                            ? "lightblue"
                                            : "lightgrey",
                                        // padding: 4,
                                        width: 250,
                                        // minHeight: 500
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
                                                                textAlign: "center",
                                                                padding: 16,
                                                                margin: "0 0 8px 0",
                                                                borderRadius: "5px",
                                                                minHeight: "50px",
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