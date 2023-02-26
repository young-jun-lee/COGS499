import { Autocomplete, Box, Button } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSnapshot } from 'valtio';
import { removeYear, state } from '../../State';
import { StrictModeDroppable } from './StrictModeDroppable';
import { v4 as uuidv4 } from 'uuid';

interface RequiredCourses {
    column: any
    columnId: string
}

interface Course {
    value: string
    id: string,
    group: string
}

const SearchBar: FC<RequiredCourses> = ({ column, columnId }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const handleItemSubmit = (item: Course) => {
        // update courses to match valtio state
        setCourses(state.columns[columnId].items);
        // Check if item is already in courses
        if (courses.some((course) => course.value === item.value)) {
            return;
        } else {
            setCourses([...courses, item]);
            // update courses in valtio state
            state.columns[columnId].items.push(item);
        }
    };

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                // textAlign: 'center',
                width: '100%',
                height: '40%',
                padding: theme.spacing.sm,
                // marginLeft: "1px",
                // marginRight: "1px",
                // marginTop: theme.spacing.md,
                // marginBottom: theme.spacing.md,

                borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })}
        >

            <Box
                sx={(theme) => ({
                    backgroundColor: '#ede8f3',
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[5],
                    },
                })}

            >
                SearchBar
                <Autocomplete
                    label="select your courses"
                    placeholder="Pick one"
                    data={[
                        { value: 'CISC 111', group: 'CISC', id: uuidv4() },
                        { value: 'CISC 112', group: 'CISC', id: uuidv4() },
                        { value: 'CISC 113', group: 'CISC', id: uuidv4() },
                        { value: 'MATH 122', group: 'MATH', id: uuidv4() },
                        { value: 'MATH 101', group: 'MATH', id: uuidv4() },
                        { value: "MATH 123", group: "MATH", id: uuidv4() },
                        { value: "MATH 124", group: "MATH", id: uuidv4() },
                        { value: "MATH 125", group: "MATH", id: uuidv4() },
                        { value: "MATH 126", group: "MATH", id: uuidv4() },
                        { value: "MATH 127", group: "MATH", id: uuidv4() },
                        { value: "MATH 128", group: "MATH", id: uuidv4() },
                        { value: "MATH 129", group: "MATH", id: uuidv4() },
                    ]}
                    onItemSubmit={handleItemSubmit}
                    sx={{ marginBottom: 20 }}
                />
                <div style={{ margin: 8 }}>
                    <StrictModeDroppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver
                                            ? "lightblue"
                                            : "lightgrey",
                                        width: 250,
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
                                                                padding: 10,
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

export default SearchBar