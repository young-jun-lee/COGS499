import { rectSortingStrategy } from "@dnd-kit/sortable";
import { Box, Button, Flex, Group, Tooltip } from "@mantine/core";
import { FC, useState } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { useSnapshot } from "valtio";
import { constants } from "../../content/Constants";
import { addYear } from "../../Valtio/helperFunctions";
import { state } from '../../Valtio/State';
import { MultipleContainers } from "../DND/MultipleContainers"

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    const [localState, setLocalState] = useState(snap.columns);

    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%", border: "3px solid black", }}>

            <Box sx={
                (theme) => ({
                    width: '45%',
                    margin: "1em",
                    border: `5px solid ${snap.specialization.colours?.primary}`,
                    borderRadius: theme.radius.md,
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : snap.specialization.colours?.tertiary,
                    color: theme.colorScheme === 'dark' ? "white" : snap.specialization.colours?.primary,
                    alignSelf: "center",
                    padding: "0.5em"
                })
            }>
                <div style={{ textAlign: "center", fontSize: 35, fontWeight: 600 }}>Select Your Courses</div>
            </Box>


            <MultipleContainers
                columns={5}
                // itemCount={10}
                strategy={rectSortingStrategy}
                wrapperStyle={() => ({
                    width: 100,
                    height: 50,
                })}
                vertical
                scrollable
            />
        </Flex >
    );
};

export default SelectContainer;
