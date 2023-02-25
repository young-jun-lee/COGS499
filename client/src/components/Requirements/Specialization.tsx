import { Box, Button, Collapse, Flex, Radio } from '@mantine/core';
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import HeaderContent from "../../content/Header";
import { state } from '../../State';
import { IoMdOptions } from "react-icons/io";

import { Drawer, Group } from '@mantine/core';

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
                        backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                        width: '35%',
                        padding: theme.spacing.sm,
                        marginTop: theme.spacing.md,

                    })
                }>Specialization: {snap.specialization}</Box>
            }


        </>

    );
};

export default Specialization;