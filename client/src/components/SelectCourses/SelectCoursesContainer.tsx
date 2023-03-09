import { rectSortingStrategy } from "@dnd-kit/sortable";
import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { FC, useState } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { useSnapshot } from "valtio";
import { constants } from "../../content/Constants";
import { addYear } from "../../Valtio/helperFunctions";
import { state } from '../../Valtio/State';
import MultipleContainers from "../DND/MultipleContainers"

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    const [localState, setLocalState] = useState(snap.columns);

    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%" }}>

            <h1 style={{ textAlign: "center" }}>Courses</h1>

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
