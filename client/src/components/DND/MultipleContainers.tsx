import {
  closestCenter, CollisionDetection, defaultDropAnimationSideEffects, DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision, MeasuringStrategy, MouseSensor, pointerWithin,
  rectIntersection, TouchSensor,
  UniqueIdentifier, useSensor, useSensors
} from '@dnd-kit/core';
import {
  arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Box, Button, Flex, Group, Tooltip } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { VscClearAll } from 'react-icons/vsc';
import { useSnapshot } from 'valtio';

import { Item } from '..';
import { constants } from '../../content/Constants';

import { showNotification } from '@mantine/notifications';
import { MdDeleteSweep } from 'react-icons/md';
import { Course, Years } from '../../types/stateTypes';
import { state } from '../../Valtio/State';
import SearchBar from '../SelectCourses/SearchBar';
import { DroppableContainer } from './DroppableContainer';
import { Props } from './Props';
import { SortableItem } from './SortableItem';
import { useAutoAnimate } from '@formkit/auto-animate/react'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};


export const MultipleContainers = ({
  adjustScale = false,
  itemCount = 3,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = true,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  vertical = false,
  scrollable = true,
}: Props) => {

  const snap = useSnapshot(state)
  const empty: UniqueIdentifier[] = [];
  const specChosen = snap.specialization.name !== undefined

  const getItems = () => {
    const basket = localStorage.getItem('basket')
    if (basket) {
      return JSON.parse(basket)
    }

    const items = {}
    snap.columns.map((column, index) => {
      // if (index !== 0) {
      items[index] = column.items.map(item => item.id)
      // }
    })
    const years: Years = {}
    snap.columns.map((column, index) => {
      const courses = [] as Course[]
      column.items.map((item, idx) => {
        const course = {
          id: item.id,
          value: item.value,
          group: item.group,
          prerequisites: item.prerequisites?.map(prerequisite => prerequisite),
        }
        courses.push(course)
      })
      years[index] = courses
    })
    return years

  }

  const [items, setItems] = useState(getItems());

  const [parent] = useAutoAnimate(/* optional config */)

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
    state.currentBasket = items
    localStorage.setItem('basket', JSON.stringify(items))
  }, [items]);
  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[]
  );


  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);


  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && items.hasOwnProperty(activeId)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => items.hasOwnProperty(container.id)
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
          pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');
      // console.log(overId)
      if (overId != null) {
        if (items.hasOwnProperty(overId)) {
          const containerItems = items[overId].map((item) => item.value);

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );



  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );


  const getNextContainerId = () => {
    const lastContainerId = containers[containers.length - 1];
    return Number(lastContainerId) + 1;
  }

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    for (const key of Object.keys(items)) {
      const array = items[key];
      for (const item of array) {
        if (item.value === id) {
          return key;
        }
      }
    }
    return null;
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);
    // console.log('container: ', container)
    if (!container) {
      return -1;
    }

    // const index = items[container].indexOf(id);
    const index = items[container].findIndex(item => item.value === id);

    return index;
  };

  const clearCourses = (containerId: UniqueIdentifier) => {
    const newItems = { ...items }
    newItems[containerId] = []
    setItems(newItems)
  }

  const handleRemoveColumn = (containerId: UniqueIdentifier) => {

    for (let i = Number(containerId) + 1; i < containers.length; i++) {
      const newId = String(Number(containers[i]) - 1)
      containers[i] = newId
    }
    containers.splice(containers.indexOf(containerId), 1)
    setContainers((containers) => [...containers])


    for (let i = Number(containerId); i < Object.keys(items).length; i++) {
      // console.log("items[i]", items[i])
      items[i] = items[Number(i) + 1]
    }
    delete items[Object.keys(items).length - 1]
  }

  const handleAddColumn = () => {
    const newContainerId = getNextContainerId();
    unstable_batchedUpdates(() => {
      setContainers((containers) => [...containers, newContainerId.toString()]);
      setItems((items) => ({
        ...items,
        [newContainerId]: []
      }));
      // console.log('items: ', items)
      // console.log('containers: ', containers)
    });
  }

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const getCourseRequirements = (courseId: UniqueIdentifier) => {
    const courses = JSON.parse(JSON.stringify(snap.courses))
    const { prerequisites, corequisites, exclusions, one_way_exclusions } = courses[courseId]

    return { prerequisites, corequisites, exclusions, one_way_exclusions }
  }


  const checkPrerequisites = (prerequisites: any, containerId: UniqueIdentifier, optional: boolean = false) => {
    if (prerequisites.length > 0) {
      console.log('prerequisites: ', prerequisites)
      for (const prerequisite of prerequisites) {
        if (Array.isArray(prerequisite)) {
          console.log("prerequisite is an array: ", prerequisite)
          // if prerequisite is an array, recursively check each item in the array
          const found = prerequisite.some(p => checkPrerequisites([p], containerId, true))
          if (!found) {
            return false
          }
        } else if (prerequisite === "None") {
          break
        }
        else {
          let found = false
          console.log("here")
          if (containerId === "0") {
            containerId = containers.length - 1
          }
          console.log("containerId: ", containerId)
          for (let i = 1; i <= Number(containerId); i++) {
            const container = items[i]
            for (const item of container) {
              if (item.value === prerequisite) {
                found = true
                console.log("found in container: ", i)
                break
              }
            }
          }
          if (!found) {
            return false
          }
        }
      }
    }
    return true
  }

  const checkCorequisites = (corequisites: any, containerId: UniqueIdentifier) => {
    if (corequisites.length > 0) {

      console.log('corequisites: ', corequisites)

      // if corequisite is a nested array, just check first item
      const corequisite = Array.isArray(corequisites[0]) ? corequisites[0][0] : corequisites[0]

      if (corequisite === "None") {
        return true
      }
      // check to see if corequisite exists in any container 
      let found = false
      let corequisiteContainerId = null
      for (let i = 1; i <= Number(containerId); i++) {
        const container = items[i]
        for (const item of container) {
          if (item.value === corequisite) {
            found = true
            corequisiteContainerId = i
          }
        }
      }
      if (!found) {
        return true
      }
      else {
        // if corequisite exists, check to see if it's in the same container
        console.log('corequisiteContainerId: ', corequisiteContainerId)
        console.log('containerId: ', containerId)
        if (corequisiteContainerId == containerId) {

          return true
        }
        return false
      }
    }
  }


  const checkRequirements = (containerId: UniqueIdentifier, course: UniqueIdentifier) => {


    const validPlacement = true

    const { prerequisites, corequisites, exclusions, one_way_exclusions } = getCourseRequirements(course)

    // check prerequisites
    // const validPrerequisites = checkPrerequisites(prerequisites, containerId)
    // console.log('validPrerequisites: ', validPrerequisites)
    const validCorequisites = checkCorequisites(corequisites, containerId)
    return validCorequisites

    // return validPrerequisites

    return true

  }

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
        containerId={findContainer(id) as UniqueIdentifier} />
    );
  }


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}

      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (overId == null) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);


        if (!overContainer || !activeContainer) {
          return;
        }

        if (items[overContainer].length >= constants.MAX_COURSES) {
          showNotification({
            title: 'Max Courses Reached',
            message: overContainer > 0 ? `You have reached the max number of courses for Year ${[overContainer]}` : `You have reached the max number of courses for the shopping cart. Please remove a course before adding another.`,
            color: 'red',
          });
          return;
        }

        const validCourse = checkRequirements(overContainer, active.id)
        if (!validCourse) {
          showNotification({
            title: 'Invalid Course',
            message: 'This course does not meet the requirements for this year.',
            color: 'red',
          });
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.findIndex((item) => item.id === overId);
            const activeIndex = activeItems.findIndex((item) => item.id === active.id);

            let newIndex: number;
            console.log(items)
            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;


            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item.id !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length),
              ],
            };

          });
        }
      }}


      onDragEnd={({ active, over }) => {
        const activeContainer = findContainer(active.id);
        if (!activeContainer) {
          setActiveId(null);
          return;
        }
        const overId = over?.id;
        if (overId == null) {
          setActiveId(null);
          return;
        }
        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].findIndex((item) => item.id === active.id);
          const overIndex = items[overContainer].findIndex((item) => item.id === overId);
          if (activeIndex !== overIndex) {
            setItems((items) => {
              return {
                ...items,
                [activeContainer]: arrayMove(
                  items[activeContainer],
                  activeIndex,
                  overIndex
                ),
              };
            });
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <Flex style={{ padding: 20, gridGap: 20 }}>

        <SortableContext
          items={[...containers, constants.PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >

          <Flex style={{ flexDirection: "column", width: "65%" }} ref={parent}>
            {containers.map((containerId, index) => (
              <Box key={index} >
                {index !== 0 &&
                  <>
                    <div key={index} style={{ fontSize: 25, fontWeight: 600 }}>Year {containerId}</div>
                    <DroppableContainer
                      id={containerId}
                      label={minimal ? undefined : `Column ${containerId} `}
                      columns={columns}
                      items={items[containerId]}
                      scrollable={scrollable}
                      style={{ maxHeight: "190px" }}
                      unstyled={minimal}
                    >
                      <SortableContext
                        items={items[containerId]}
                        strategy={strategy}
                      >

                        {items[containerId].map((value: Course, index: number) => {
                          return (
                            <SortableItem
                              key={value.id}
                              id={value.id}
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
                    <Group position="right" key={index + "group"}>
                      {items[containerId].length > 0 ?
                        <Button leftIcon={<VscClearAll size={18} />}
                          onClick={() => {
                            clearCourses(containerId);
                          }}
                          styles={(theme) => (
                            specChosen ?
                              {
                                root: {
                                  backgroundColor: `${snap.specialization.colours?.primary} `,
                                  color: `${snap.specialization.colours?.tertiary} `,
                                  ':hover': {
                                    backgroundColor: `${snap.specialization.colours?.secondary} `,
                                    color: `${snap.specialization.colours?.tertiary} `
                                  },
                                  boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"

                                }
                              } : {})}

                        >
                          Clear Courses
                        </Button>
                        :
                        <Tooltip label="No Courses in Container">
                          <Button leftIcon={<VscClearAll />}
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                            onClick={(event) => event.preventDefault()}
                          >
                            Clear Courses
                          </Button>
                        </Tooltip>
                      }

                      {containers.length > constants.MIN_YEARS ?
                        <Button leftIcon={<MdDeleteSweep size={18} />}
                          onClick={() => {
                            handleRemoveColumn(containerId)
                          }}
                          styles={(theme) => (
                            specChosen ?
                              {
                                root: {
                                  backgroundColor: `${snap.specialization.colours?.primary} `,
                                  color: `${snap.specialization.colours?.tertiary} `,
                                  ':hover': {
                                    backgroundColor: `${snap.specialization.colours?.secondary} `,
                                    color: `${snap.specialization.colours?.tertiary} `,
                                  },
                                  boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
                                }
                              } : {})}

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
                  </>}

              </Box>

            ))}
            <Group position="right" style={{ marginTop: 15 }}>
              {containers.length < constants.MAX_YEARS ?
                <Button leftIcon={<HiViewGridAdd size={20} />}
                  onClick={() => {
                    handleAddColumn();
                  }}
                  styles={(theme) => (
                    specChosen ?
                      {
                        root: {
                          backgroundColor: `${snap.specialization.colours?.primary} `,
                          color: `${snap.specialization.colours?.tertiary} `,
                          ':hover': {
                            backgroundColor: `${snap.specialization.colours?.secondary} `,
                            color: `${snap.specialization.colours?.tertiary} `,
                          },
                          boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
                        }
                      } : {})}
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
          </Flex>
          <Flex style={{ flexDirection: "column", width: "35%" }}>
            <SearchBar
              containerId={"0"}
              columns={columns}
              items={items}
              scrollable={scrollable}
              getItemStyles={getItemStyles}
              strategy={strategy}
              containerStyle={containerStyle}
              wrapperStyle={wrapperStyle}
              renderItem={renderItem}
              getIndex={getIndex}
              setItems={setItems}
              minimal={minimal}
              specChosen={specChosen}
            ></SearchBar>
          </Flex>




        </SortableContext>

      </Flex>
      {
        createPortal(
          <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
            {activeId
              ? renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )
      }

    </DndContext >
  );
}



