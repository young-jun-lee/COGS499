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
import { Course } from '../../types/stateTypes';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

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
//     containerStyle: any,
//     specChosen: boolean
// }

const SearchBar: FC = ({
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
    const snap = useSnapshot(state)
    const handleItemSubmit = (item: Course) => {
        if (items[containerId].length >= constants.MAX_COURSES) {
            showNotification({
                title: 'Max Courses Reached',
                message: `You have reached the max number of courses for the shopping cart. Please remove a course before adding another.`,
                color: 'red',
            });
            return;
        }
        console.log(item)

        if (items[containerId].some((course: Course) => course.value === item.value)) {
            showNotification({
                title: 'Course Already Added',
                message: `This course has already been added to the shopping cart.`,
                color: 'green',
            });
            return;
        }

        // check if item is already in items, which is an object of arrays
        if (Object.values(items).some((container) => container.some((course: Course) => course.value === item.value))) {
            showNotification({
                title: 'Course Already Added',
                message: `This course has already been added to a year container.`,
                color: 'green',
            });
            return;

        } else {
            const parsedPrereqs = JSON.parse(JSON.stringify(item.prerequisites))
            setItems({
                ...items,
                [containerId]: [...items[containerId], { id: item.id, value: item.value, group: item.group, prerequisites: parsedPrereqs }]
            });
        }

    };



    const clearCourses = () => {
        setItems({ ...items, [containerId]: [] })
    }

    const getAutoCompleteData = () => {
        const courses = snap.courses;
        // loop through each course
        const autoCompleteData = []
        for (const [key, course] of Object.entries(courses)) {
            autoCompleteData.push({
                value: course.code,
                group: course.code?.slice(0, 4),
                id: course.code,
                prerequisites: course.prerequisites
            })
        }
        return autoCompleteData;
    }
    getAutoCompleteData()
    return (
        <Box
            sx={(theme) => ({
                width: '100%',
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
            // ref={parent}
            >
                <Flex>

                </Flex>
                <div style={{ alignSelf: "start", fontSize: 25, fontWeight: 600 }}>Search</div>
                <>

                </>
                <Autocomplete
                    placeholder="Search for a course"
                    data={getAutoCompleteData()}
                    onItemSubmit={handleItemSubmit}
                    sx={{ alignSelf: "start", marginBottom: 20, marginTop: 10 }}
                    maxDropdownHeight={500}
                    size='md'
                    id='autocomplete-input'
                />

                <Button
                    onClick={() => {
                        // clear contents of the autocomplete input
                        const input = document.getElementById('autocomplete-input') as HTMLInputElement
                        input.value = ''
                    }}
                    style={{
                        // position: "absolute",
                        // top: "50%",
                        // right: "12px",
                        // transform: "translateY(-50%)",
                        // border: "none",
                        // background: "black",
                        // cursor: "pointer",
                    }}
                >
                    <AiOutlineClose />
                </Button>


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
                        {items[containerId].map((course: Course, index: number) => {
                            return (
                                <SortableItem
                                    disabled={isSortingContainer}
                                    key={course.id}
                                    id={course.id}
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