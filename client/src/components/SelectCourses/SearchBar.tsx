import { SortableContext } from '@dnd-kit/sortable';
import { Autocomplete, Box, Button } from '@mantine/core';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import { DroppableContainer } from '../DND/DroppableContainer';
import { SortableItem } from '../DND/SortableItem';

interface RequiredCourses {
    containerId: string | number,
    id: string,
    label: string,
    columns: number,
    items: string[],
    scrollable: boolean,
    style: object,
    unstyled: boolean,
    strategy: string,
    disabled: boolean,
    handle: boolean,
    itemStyle: object,
    wrapperStyle: object,
    renderItem: (item: Course) => JSX.Element,
    getIndex: (item: Course) => number,
    setItems: (items: Course[]) => void,
    minimal: boolean,
    getItemStyles: any
    isSortingContainer: any
    containerStyle: any
}

interface Course {
    value: string
    id: string,
    group: string
}

const SearchBar: FC<RequiredCourses> = ({
    containerId,
    items,
    scrollable,
    getItemStyles,
    strategy,
    isSortingContainer,
    wrapperStyle,
    renderItem,
    getIndex,
    setItems,
    minimal

}) => {
    // const [courses, setCourses] = useState<Course[]>(items[containerId]);
    const snap = useSnapshot(state)
    const handleItemSubmit = (item: Course) => {

        if (items[containerId].some((course) => course === item.value)) {
            return;
        }
        // check if item is already in items, which is an object of arrays
        if (Object.values(items).some((container) => container.includes(item.value))) {
            return
        }
        else {
            setItems({ ...items, [containerId]: [...items[containerId], item.value] })
        }
    };

    const clearCourses = () => {
        setItems({ ...items, [containerId]: [] })
    }
    return (
        <Box
            sx={(theme) => ({
                width: '100%',
                height: '100%',
                padding: theme.spacing.sm,
            })}
        >

            <Box
                sx={(theme) => ({
                    backgroundColor: `${snap.specialization.colours?.tertiary}`,
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    border: `4px solid ${snap.specialization.colours?.primary}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                })}

            >
                <div style={{ alignSelf: "start", fontSize: 25, fontWeight: 600 }}>Search</div>
                <Autocomplete
                    placeholder="Search for a course"
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
                    sx={{ alignSelf: "start", marginBottom: 20 }}
                    maxDropdownHeight={500}
                />
                <DroppableContainer
                    id={containerId}
                    label={minimal ? undefined : `Column ${containerId}`}
                    columns={1}
                    items={items[containerId]}
                    scrollable={scrollable}
                    style={{ width: "100%", height: "100%" }}
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
                <Button onClick={clearCourses}>Clear Courses</Button>
            </Box>

        </Box>


    )
}

export default SearchBar