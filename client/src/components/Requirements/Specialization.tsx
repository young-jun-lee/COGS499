import { Box, Button, Flex, Radio, Text, Title } from '@mantine/core';
import { FC, useEffect, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { useSnapshot } from "valtio";
import { AiOutlineSetting } from "react-icons/ai"
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
                            Object.entries(HeaderContent.specializations).map(([specialization, specializationFeatures]) => (
                                <Radio
                                    key={specialization}
                                    label={specialization}
                                    value={specialization}
                                    checked={state.specialization.name === specialization}

                                    onClick={() => {
                                        state.specialization.name = specialization;
                                        state.specialization.colours = { primary: specializationFeatures.primary, secondary: specializationFeatures.secondary, tertiary: specializationFeatures.tertiary }
                                        console.log("colours: ", specializationFeatures)
                                        state.specialization.core = specializationFeatures.core;
                                        state.specialization.options = specializationFeatures.options;
                                        state.specialization.supporting = specializationFeatures.supporting;
                                        setOpened(false);
                                    }}
                                    size="md"
                                    style={{ padding: "10px", color: specializationFeatures?.primary, fontSize: "20px" }}
                                    styles={(theme) => (
                                        {
                                            radio: {
                                                backgroundColor: `${specializationFeatures?.tertiary}`,
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
            <Flex justify="space-between" style={{ height: "100%", width: "100%" }} >
                <Box style={{ width: "15%" }}></Box>
                <Box sx={
                    (theme) => ({
                        margin: "1em",
                        padding: "0.5em",
                        border: `5px solid ${snap.specialization.colours?.primary}`,
                        borderRadius: theme.radius.md,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : snap.specialization.colours?.tertiary,
                        color: theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : `${snap.specialization.colours?.primary}`,
                        alignSelf: "center",
                        boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)",
                        "--fillColor": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.primary}` : `${snap.specialization.colours?.secondary}`,
                        "--bgColor": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
                        "--hoverText": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : "#FFF",
                        paddingRight: "4em",
                        paddingLeft: "4em",
                    })
                } className="title">
                    <div style={{ textAlign: "center", fontSize: 35, fontWeight: 600 }}>
                        {specChosen ? `${snap.specialization.name}` : "Choose Your Specialization"}
                    </div>
                </Box>

                <Flex style={{ width: "15%", alignItems: "start", justifyContent: "end" }}>
                    <Button rightIcon={<AiOutlineSetting size={20} />} onClick={() => setOpened((o) => !o)} size="md" className="button" styles={(theme) => (
                        {
                            root: {
                                backgroundColor: `${snap.specialization.colours?.primary}`,
                                color: `${snap.specialization.colours?.tertiary}`,
                                maxWidth: "50px",
                                transition: "max-width 0.5s 0.5s",
                                borderRadius: "0 0 0 10px",
                                ':hover': {
                                    backgroundColor: `${snap.specialization.colours?.secondary} `,
                                    color: `${snap.specialization.colours?.tertiary}`,
                                    maxWidth: "260px",
                                    transitionDelay: "0s",
                                    borderRadius: "0 10px 0px 10px",
                                },
                                boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
                            }
                        }
                    )}>
                        Choose Specialization
                    </Button>
                </Flex>
            </Flex>
        </Flex >

    );
};

export default Specialization;