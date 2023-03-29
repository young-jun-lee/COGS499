import { UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, SortingStrategy } from '@dnd-kit/sortable';
import { Anchor, Autocomplete, Avatar, Box, Button, Divider, Flex, Group, HoverCard, Stack, Text, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { VscClearAll } from 'react-icons/vsc';
import { useSnapshot } from 'valtio';
import coat from '../../assets/coat.png';
import { constants } from '../../content/Constants';
import { Course } from '../../types/stateTypes';
import { state } from '../../Valtio/State';
import { DroppableContainer } from '../DND/DroppableContainer';
import { SortableItem } from '../DND/SortableItem';

interface RequiredCourses {
    containerId: UniqueIdentifier,
    columns: number | undefined,
    items: string[],
    scrollable: boolean,
    strategy: SortingStrategy,
    wrapperStyle: object,
    renderItem: (item: Course) => JSX.Element,
    getIndex: (id: UniqueIdentifier) => any,
    setItems: (items: Course[]) => void,
    minimal: boolean,
    getItemStyles: any
    containerStyle: React.CSSProperties | undefined,
    specChosen: boolean
}

const SearchBar: FC<RequiredCourses> = ({
    containerId,
    isSortingContainer,
    items,
    scrollable,
    getItemStyles,
    strategy,
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
                [containerId]: [...items[containerId], { id: item.id, value: item.value, group: item.group, prerequisites: parsedPrereqs, description: item.description, title: item.title }]
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
                prerequisites: course.prerequisites,
                description: course.description,
                title: course.title
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
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
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

                                <HoverCard width={320} position="right" shadow="md" openDelay={200} closeDelay={200}>
                                    <HoverCard.Target>
                                        <div>
                                            <SortableItem
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
                                        </div>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <Group>
                                            <Avatar src={coat} radius="xl" />
                                            <Stack spacing={5}>
                                                <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
                                                    {course.id + ": "}{course.title}
                                                </Text>
                                                <Anchor
                                                    href={`https://queensu-ca-public.courseleaf.com/arts-science/course-descriptions/${(course.group)?.toLowerCase()}/`}
                                                    color="dimmed"
                                                    size="xs"
                                                    sx={{ lineHeight: 1 }}
                                                >
                                                    Course Website
                                                </Anchor>
                                            </Stack>
                                        </Group>

                                        <Divider style={{ marginTop: "1em" }} />

                                        <Text size="sm" mt="md">
                                            {course.description}
                                        </Text>

                                    </HoverCard.Dropdown>
                                </HoverCard>
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
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' }, alignSelf: "end", }}
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