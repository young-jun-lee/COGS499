import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import 'reactflow/dist/style.css';
import { useSnapshot } from "valtio";
import { state } from "../../Valtio/State";
import { Flow } from "./FlowChart";

const TreeContainer: FC = () => {
    const snap = useSnapshot(state)
    return (
        <Flex style={{ flexDirection: "column", alignItems: "center", width: "100%", height: "100%", borderRadius: "1em", border: `5px solid ${snap.specialization.colours?.primary}`, boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)" }}>

            <Box sx={
                (theme) => ({
                    width: '35%',
                    margin: "1em",
                    border: `5px solid ${snap.specialization.colours?.primary}`,
                    borderRadius: theme.radius.md,
                    padding: "0.5em", boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
                    color: theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : `${snap.specialization.colours?.primary}`,
                    "--fillColor": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.primary}` : `${snap.specialization.colours?.secondary}`,
                    "--bgColor": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
                    "--hoverText": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : "#FFF",
                })
            } className="title">
                <div style={{ textAlign: "center", fontSize: 35, fontWeight: 600, }}>What's Next</div>
            </Box>
            <h3 style={{ textAlign: "center" }}>Here's a roadmap based on your degree plan and the courses you've chosen so far</h3>
            <Box sx={(theme) =>
                ({ width: "90%", height: 750, border: `5px solid ${snap.specialization.colours?.primary}`, borderRadius: theme.radius.md, marginBottom: 25 })}>
                <Flow backgroundColor={snap.specialization.colours?.tertiary} />
            </Box>
        </Flex>
    );
};

export default TreeContainer;




