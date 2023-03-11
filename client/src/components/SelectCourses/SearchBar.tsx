import { SortableContext } from '@dnd-kit/sortable';
import { Autocomplete, Box } from '@mantine/core';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DroppableContainer } from '../DND/DroppableContainer';
import { SortableItem } from '../DND/SortableItem';

// interface RequiredCourses {
//     containerId: string | number,
//     id: string,
//     label: string,
//     columns: number,
//     items: string[],
//     scrollable: boolean,
//     style: object,
//     unstyled: boolean,
//     strategy: string,
//     disabled: boolean,
//     handle: boolean,
//     itemStyle: object,
//     wrapperStyle: object,
//     renderItem: (item: Course) => JSX.Element,
//     getIndex: (item: Course) => number,
//     setItems: (items: Course[]) => void,
//     minimal: boolean,
//     getItemStyles: any
//     isSortingContainer: any
//     containerStyle: any

// }

interface Course {
    value: string
    id: string,
    group: string
}

const SearchBar: FC<RequiredCourses> = ({
    containerId,
    columns,
    items,
    scrollable,
    getItemStyles,
    strategy,
    isSortingContainer,
    handle,
    containerStyle,
    wrapperStyle,
    renderItem,
    getIndex,
    setItems,
    minimal

}) => {
    // const [courses, setCourses] = useState<Course[]>(items[containerId]);

    const handleItemSubmit = (item: Course) => {
        // update courses to match valtio state
        // setCourses(state.columns[columnId].items);
        // Check if item is already in courses
        // if (courses.some((course) => course === item.value)) {
        //     return;
        // } 
        console.log(Object.values(items))
        if (items[containerId].some((course) => course === item.value)) {
            return;
        }
        // check if item is already in items, which is an object of arrays
        if (Object.values(items).some((container) => container.includes(item.value))) {
            return
        }
        else {
            console.log(item)
            // add item to courses
            // setCourses([...courses, item.value]);
            setItems({ ...items, [containerId]: [...items[containerId], item.value] })
            // setItems({ ...items, [containerId]: [...courses] })
            // setCourses([...courses, item.value]);
            // setItems({ ...items, [containerId]: [...courses, item] })
            // update courses in valtio state
            // state.columns[columnId].items.push(item);
        }
    };
    console.log(items)
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                width: '100%',
                height: '40%',
                padding: theme.spacing.sm,
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
                    maxDropdownHeight={500}
                />
                <div style={{ margin: 8 }}>
                    <DroppableContainer
                        id={containerId}
                        label={minimal ? undefined : `Column ${containerId}`}
                        columns={columns}
                        items={items[containerId]}
                        scrollable={scrollable}
                    >
                        <SortableContext
                            items={items[containerId]}
                            strategy={strategy}
                        >


                            {items[containerId].map((course, index) => {
                                return (
                                    <SortableItem
                                        disabled={isSortingContainer}
                                        key={course}
                                        id={course}
                                        index={index}
                                        handle={handle}
                                        style={getItemStyles}
                                        wrapperStyle={wrapperStyle}
                                        renderItem={renderItem}
                                        containerId={containerId}
                                        getIndex={getIndex}
                                        items={items}
                                        setItems={setItems}
                                    />
                                );
                            })}

                        </SortableContext>
                    </DroppableContainer>
                    {/* {column.items.map((item, index) => (
                            <GridItem key={index}>
                                <div className="grid-item">
                                    <div className="grid-item-content">
                                        <div
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
                                                backgroundColor: "#456C86",
                                                // minHeight: "50px",
                                                height: "40px",
                                                // color: "white",

                                            }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            </GridItem>
                        ))} */}

                </div>
            </Box>

        </Box>


    )
}

export default SearchBar