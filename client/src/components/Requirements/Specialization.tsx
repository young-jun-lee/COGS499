import { Box, Button, Flex, Radio } from '@mantine/core';
import { FC, useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { useSnapshot } from "valtio";
import HeaderContent from "../../content/Header";
import { state } from '../../Valtio/State';
import { Drawer } from '@mantine/core';

const Specialization: FC = () => {
    const snap = useSnapshot(state);
    const [opened, setOpened] = useState(false);


    return (
        <>
            <Button leftIcon={<IoMdOptions />} onClick={() => setOpened((o) => !o)} >
                Choose Specialization
            </Button>

            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Choose Specialization"
                padding="xl"
                size="lg"
                style={{ fontSize: "20px" }}
            >
                <Radio.Group
                    value={state.specialization}
                >
                    <Flex style={{ flexDirection: "column", }}>
                        {
                            HeaderContent.specializations.map((specialization) => (

                                <Radio
                                    key={specialization}
                                    label={specialization}
                                    value={specialization}
                                    checked={state.specialization === specialization}
                                    onClick={() => {
                                        state.specialization = specialization;
                                        setOpened(false);
                                    }}
                                    size="md"
                                    style={{ padding: "10px" }}
                                />
                            ))
                        }
                    </Flex>
                </Radio.Group>
            </Drawer >



            {
                snap.specialization === "" ? <></> : <Box sx={
                    (theme) => ({
                        width: '70%',
                        marginTop: theme.spacing.md,
                        border: '3px solid #B90E31',
                        borderRadius: theme.radius.md,
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : "#002452",
                        color: "white",
                        textAlign: 'center',
                        alignSelf: "center"
                    })
                }><h1 style={{ textAlign: "center" }}>Specialization: {snap.specialization}</h1>
                </Box>
            }

        </>

    );
};

export default Specialization;