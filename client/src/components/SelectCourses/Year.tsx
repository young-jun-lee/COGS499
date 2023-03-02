import { Box, Button, Group, Tooltip } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GridDropZone, GridItem } from 'react-grid-dnd';
import { MdDeleteSweep } from "react-icons/md";
import { useSnapshot } from 'valtio';
import { removeYear } from "../../Valtio/helperFunctions";
import { state } from '../../Valtio/State';
interface RequiredCourses {
    year: string;
    key: string
    column: any
    index: number
    columnId: string
    state: any
}

const Year: FC<RequiredCourses> = ({ year, column, columnId, state }) => {

    const snap = useSnapshot(column);
    // rerender when state.columns changes

    // console.log("state.numYears: ", state.numYears)
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                // textAlign: 'center',
                // width: '100%',
                // height: '40%',
                padding: theme.spacing.sm,
                borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })}
        >

            <Group position="right">
                {state.numYears > 3 ?
                    <Button leftIcon={<MdDeleteSweep size={18} />}
                        onClick={() => {
                            removeYear(columnId)
                        }}
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
            <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5 }}>{year}</Box>
            <Box
                sx={(theme) => ({
                    backgroundColor: '#ede8f3',
                    // height: '90%',
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.md,
                    // '&:hover': {
                    //     backgroundColor:
                    //         theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[5],
                    // },
                })}

            >
                <div style={{ margin: 8 }}>
                    <GridDropZone
                        className="dropzone"
                        id={columnId}
                        boxesPerRow={6}
                        rowHeight={70}
                        key={columnId}
                    >
                        {state.items.map((item, index) => (
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
                        ))}
                    </GridDropZone>

                </div>



            </Box>

        </Box>


    )
}

export default Year