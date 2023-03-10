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
import { Box, Button, Flex, Group, ScrollArea, Tooltip } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { VscClearAll } from 'react-icons/vsc';
import { useSnapshot } from 'valtio';

import { Container, Item } from '..';
import { constants } from '../../content/Constants';
import { addYear } from '../../Valtio/helperFunctions';

import { state } from '../../Valtio/State';
import SearchBar from '../SelectCourses/SearchBar';
import { DroppableContainer } from './DroppableContainer';
import { Props } from './Props';
import { SortableItem } from './SortableItem';
import { MdDeleteSweep } from 'react-icons/md';
import { Items } from '../../types/stateTypes';
import { showNotification } from '@mantine/notifications';



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
    const items: Items = {}
    snap.columns.map((column, index) => {
      // if (index !== 0) {
      items[index] = column.items.map(item => item.id)
      // }
    })
    items[3] = empty
    items[4] = empty
    return items
  }

  const [items, setItems] = useState<Items>(
    getItems()
  );

  useEffect(() => {
    console.log('items: ', items)
  }, [items])

  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[]
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
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

      if (overId != null) {

        if (overId in items) {
          const containerItems = items[overId];

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
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

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



    for (let i = Number(containerId) + 1; i < Object.keys(items).length; i++) {
      const newId = String(Number(Object.keys(items)[i]) - 1)
      items[newId] = items[Object.keys(items)[i]]
    }
    console.log(items)
    setItems((items) => ({ ...items }))

  }

  const handleAddColumn = () => {
    const newContainerId = getNextContainerId();
    console.log("newContainerId", newContainerId)
    unstable_batchedUpdates(() => {
      setContainers((containers) => [...containers, newContainerId.toString()]);
      setItems((items) => ({
        ...items,
        [newContainerId]: []
      }));
    });
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

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

  const getNextContainerId = () => {
    const lastContainerId = containers[containers.length - 1];
    return Number(lastContainerId) + 1;
  }

  const renderContainerDragOverlay = (containerId: UniqueIdentifier) => {
    return (
      <Container
        label={`Column ${containerId}`}
        columns={columns}
        style={{
          height: '100%',
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </Container>
    );
  }


  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

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

        if (overId == null || active.id in items) {
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

        if (activeContainer !== overContainer) {
          // return if max items in container

          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

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
                (item) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

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
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <Flex
        style={{
          padding: 20,
          gridGap: 20,
        }}
      >

        <SortableContext
          items={[...containers, constants.PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >

          <Flex style={{ flexDirection: "column", width: "65%" }}>
            {containers.map((containerId, index) => (
              <Box key={index}>
                {index !== 0 &&
                  <>
                    <div key={index} style={{ fontSize: 25, fontWeight: 600 }}>Year {containerId}</div>
                    <DroppableContainer
                      id={containerId}
                      label={minimal ? undefined : `Column ${containerId}`}
                      columns={columns}
                      items={items[containerId]}
                      scrollable={scrollable}
                      // style={containerStyle}
                      style={{ maxHeight: "190px", containerStyle }}
                      unstyled={minimal}
                    >
                      <SortableContext
                        items={items[containerId]}
                        strategy={strategy}
                      >

                        {items[containerId].map((value, index) => {
                          return (
                            <SortableItem
                              disabled={isSortingContainer}
                              key={value}
                              id={value}
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
                                  backgroundColor: `${snap.specialization.colours?.primary}`,
                                  color: `${snap.specialization.colours?.tertiary}`,
                                  ':hover': {
                                    backgroundColor: `${snap.specialization.colours?.secondary}`,
                                    color: `${snap.specialization.colours?.tertiary}`,
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
                                  backgroundColor: `${snap.specialization.colours?.primary}`,
                                  color: `${snap.specialization.colours?.tertiary}`,
                                  ':hover': {
                                    backgroundColor: `${snap.specialization.colours?.secondary}`,
                                    color: `${snap.specialization.colours?.tertiary}`,
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

          </Flex>
          <Flex style={{ flexDirection: "column", width: "35%" }}>
            <SearchBar
              containerId={"0"}
              columns={columns}
              items={items}
              scrollable={scrollable}
              getItemStyles={getItemStyles}
              strategy={strategy}
              isSortingContainer={isSortingContainer}
              handle={handle}
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
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )
      }
      <Group position="right" style={{ marginTop: "10px" }}>
        {containers.length < constants.MAX_YEARS ?
          <Button leftIcon={<HiViewGridAdd size={20} />}
            onClick={() => {
              handleAddColumn();
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
    </DndContext >
  );
}



