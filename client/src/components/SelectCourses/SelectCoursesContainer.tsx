import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { GridContextProvider, GridDropZone, GridItem, move, swap } from "react-grid-dnd";
import { HiViewGridAdd } from "react-icons/hi";
import { useSnapshot } from "valtio";
import { constants } from "../../content/Constants";
import { addYear } from "../../Valtio/helperFunctions";
import { state } from '../../Valtio/State';
import Search from "./SearchContainer";
import Year from "./Year";

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    const [localState, setLocalState] = useState(snap.columns);

    // function onChange(sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) {

    //     console.log(sourceIndex, targetIndex)

    //     if (targetId) {

    //         const result = move(
    //             state.columns[sourceIndex].items,
    //             state.columns[targetIndex].items,
    //             sourceIndex,
    //             targetIndex
    //         )

    //         state.columns[sourceId].items = result[0];
    //         state.columns[targetId].items = result[1];

    //     }
    //     const result = swap(state.columns[sourceId].items, sourceIndex, targetIndex)
    //     state.columns[sourceId].items = result;
    //     console.log(result)
    //     // console.log(state.columns[sourceId].items)
    // }
    function onChange(sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) {
        if (targetId) {
            const result = move(
                state.columns[sourceId].items,
                state.columns[targetId].items,
                sourceIndex,
                targetIndex
            );
            setLocalState({
                ...localState,
                [sourceId]: { ...localState[sourceId], items: result[0] },
                [targetId]: { ...localState[targetId], items: result[1] },
            });
        } else {
            const result = swap(state.columns[sourceId].items, sourceIndex, targetIndex);
            console.log(result)
            setLocalState({
                ...localState,
                [sourceId]: { ...localState[sourceId], items: result },
            });
        }
    }

    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%" }}>
            <div>
                <h1 style={{ textAlign: "center" }}>Courses</h1>
                <div>
                    <GridContextProvider onChange={onChange}>
                        <div className="container">
                            {Object.entries(localState).map(([columnId, column], index) => {
                                if (column.name !== "search bar" && column.items) {
                                    return (
                                        <GridDropZone
                                            className="dropzone"
                                            id={columnId}
                                            boxesPerRow={6}
                                            rowHeight={70}
                                            key={columnId}
                                        >
                                            {column.items.map((item, index) => (
                                                <GridItem key={index}>
                                                    <div className="grid-item">
                                                        <div className="grid-item-content">
                                                            <div
                                                                style={{
                                                                    userSelect: "none",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    borderRadius: "5px",
                                                                    backgroundColor: "#456C86",
                                                                    height: "40px",
                                                                }}
                                                            >
                                                                {item.value}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </GridItem>
                                            ))}
                                        </GridDropZone>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <Search column={snap.columns[0]} columnId="0" />
                    </GridContextProvider>
                </div >

            </div >
            <Group position="right" style={{ marginTop: "10px" }}>
                {snap.numYears < constants.MAX_YEARS ?
                    <Button leftIcon={<HiViewGridAdd size={20} />}
                        onClick={() => {
                            addYear()
                        }}
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
        </Flex >
    );
};

export default SelectContainer;
