import { SortableContext } from '@dnd-kit/sortable';
import { Autocomplete, Box, Button, Flex, Tooltip } from '@mantine/core';
import { FC, useState } from 'react';
import { VscClearAll } from 'react-icons/vsc';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import { DroppableContainer } from '../DND/DroppableContainer';
import { SortableItem } from '../DND/SortableItem';
import { constants } from '../../content/Constants';
import { showNotification } from '@mantine/notifications';

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
    containerStyle: any,
    specChosen: boolean
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
    minimal,
    specChosen,

}) => {
    // const [courses, setCourses] = useState<Course[]>(items[containerId]);
    const snap = useSnapshot(state)
    const handleItemSubmit = (item: Course) => {
        console.log(items[containerId])
        if (items[containerId].length >= constants.MAX_COURSES) {
            showNotification({
                title: 'Max Courses Reached',
                message: `You have reached the max number of courses for the shopping cart. Please remove a course before adding another.`,
                color: 'red',
            });
            return;
        }

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
                // alignSelf: "center",
                // padding: theme.spacing.sm,
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
                    marginTop: "28px",
                    boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
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
                    sx={{ alignSelf: "start", marginBottom: 20, marginTop: 10, width: "80%" }}
                    maxDropdownHeight={500}
                    size='md'
                />
                <DroppableContainer
                    id={containerId}
                    label={minimal ? undefined : `Column ${containerId}`}
                    columns={2}
                    items={items[containerId]}
                    scrollable={scrollable}
                    style={{ width: "100%", height: "100%", maxHeight: '680px', }}
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
                                    // style={{ width: "100%", height: "100%" }}
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
                {items[containerId].length > 0 ?
                    <Button leftIcon={<VscClearAll size={18} />}
                        onClick={() => {
                            clearCourses();
                        }}
                        styles={(theme) => (
                            specChosen ?
                                {
                                    root: {
                                        backgroundColor: `${snap.specialization.colours?.primary}`,
                                        color: `${snap.specialization.colours?.tertiary}`,
                                        ':hover': {
                                            backgroundColor: `${snap.specialization.colours?.secondary}`,
                                            color: `${snap.specialization.colours?.tertiary}`,
                                        },
                                        alignSelf: "end"
                                    }
                                } : {
                                    root: {
                                        alignSelf: "end"
                                    }
                                })}

                    >
                        Clear Courses
                    </Button>
                    :
                    <Tooltip label="No Courses in Container">
                        <Button leftIcon={<VscClearAll />}
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' }, alignSelf: "end" }}
                            onClick={(event) => event.preventDefault()}
                        >
                            Clear Courses
                        </Button>
                    </Tooltip>
                }
            </Box>

        </Box>


    )
}

export default SearchBar