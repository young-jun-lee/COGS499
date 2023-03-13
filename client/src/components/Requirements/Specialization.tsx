import { Box, Button, Flex, Radio, Text, Title } from '@mantine/core';
import { FC, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { useSnapshot } from "valtio";
import HeaderContent from "../../content/Header";
import { state } from '../../Valtio/State';
import { Drawer } from '@mantine/core';
// import "../../styles/styles.css"
import "../../styles/styles.css"
interface SpecProps {
    specChosen: boolean;
}

const Specialization: FC<SpecProps> = ({ specChosen }) => {
    const snap = useSnapshot(state);
    const [opened, setOpened] = useState(false);

    return (
        <Flex style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Choose Your Specialization"
                padding="xl"
                size="lg"
                style={{ fontSize: "20px" }}
            >
                <Radio.Group
                    value={state.specialization.name}
                >
                    <Flex style={{ flexDirection: "column", }}>
                        {
                            Object.entries(HeaderContent.specializations).map(([specialization, colours]) => (
                                <Radio
                                    key={specialization}
                                    label={specialization}
                                    value={specialization}
                                    checked={state.specialization.name === specialization}
                                    onClick={() => {
                                        state.specialization.name = specialization;
                                        state.specialization.colours = colours
                                        setOpened(false);
                                    }}
                                    size="md"
                                    style={{ padding: "10px", color: colours?.primary, fontSize: "20px" }}
                                    styles={(theme) => (
                                        {
                                            radio: {
                                                backgroundColor: `${colours?.tertiary}`,
                                                // color: `${colours?.primary}`,
                                            },

                                        }
                                    )}
                                />
                            ))
                        }
                    </Flex>
                </Radio.Group>
            </Drawer >

            <Flex direction={"column"} >
                <Box sx={
                    (theme) => ({
                        margin: "1em",
                        padding: "0.5em",
                        border: `5px solid ${snap.specialization.colours?.primary}`,
                        borderRadius: theme.radius.md,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : snap.specialization.colours?.tertiary,
                        color: theme.colorScheme === 'dark' ? "white" : snap.specialization.colours?.primary,
                        alignSelf: "center",
                        width: "100%",
                        boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
                        "--fillColor": `${snap.specialization.colours?.secondary}`,
                        "--bgColor": `${snap.specialization.colours?.tertiary}`
                    })
                } className="title">
                    <div style={{ textAlign: "center", fontSize: 35, fontWeight: 600 }}>
                        {specChosen ? `${snap.specialization.name}` : "Choose Your Specialization"}
                    </div>

                </Box>
                <Button
                    leftIcon={<IoMdOptions />}
                    onClick={() => setOpened((o) => !o)}
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
                                    width: "fit-content",
                                    alignSelf: "end",

                                },
                            } : {}
                    )}
                >
                    Choose Specialization
                </Button>

            </Flex>




        </Flex >

    );
};

export default Specialization;