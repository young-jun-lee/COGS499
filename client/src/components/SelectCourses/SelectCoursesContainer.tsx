import { rectSortingStrategy } from "@dnd-kit/sortable";
import { Box, Flex } from "@mantine/core";
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from '../../Valtio/State';
import { MultipleContainers } from "../DND/MultipleContainers";
import "../../styles/styles.css"

const SelectContainer: FC = () => {
    const snap = useSnapshot(state);
    const [localState, setLocalState] = useState(snap.columns);

    return (
        <Flex style={{
            flexDirection: "column", width: "100%", height: "100%", borderRadius: "1em", border: `5px solid ${snap.specialization.colours?.primary}`, boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
        }}>

            <Box sx={
                (theme) => ({
                    width: '45%',
                    margin: "1em",
                    border: `5px solid ${snap.specialization.colours?.primary}`,
                    borderRadius: theme.radius.md,
                    alignSelf: "center",
                    padding: "0.5em", boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
                    color: theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : `${snap.specialization.colours?.primary}`,
                    "--fillColor": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.primary}` : `${snap.specialization.colours?.secondary}`,
                    "--bgColor": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
                    "--hoverText": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : "#FFF",
                })
            } className="title">
                <div style={{ textAlign: "center", fontSize: 35, fontWeight: 600, }}>Select Your Courses</div>
            </Box>


            <MultipleContainers
                columns={4}
                // itemCount={10}
                strategy={rectSortingStrategy}
                wrapperStyle={() => ({
                    width: 125,
                    height: 40,
                })}
                vertical
                scrollable
            />
        </Flex >
    );
};

export default SelectContainer;
