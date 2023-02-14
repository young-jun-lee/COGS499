import { Box, Button, Collapse, Radio } from '@mantine/core';
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import HeaderContent from "../content/Header";
import { state } from '../State';

const Specialization: FC = () => {
    const snap = useSnapshot(state);
    const [opened, setOpened] = useState(false);

    return (

        <>
            <Button onClick={() => setOpened((o) => !o)}>
                Choose Specialization
            </Button>
            <Collapse in={opened}>
                <Box>
                    {HeaderContent.specializations.map((specialization) => (
                        <Radio
                            key={specialization}
                            label={specialization}
                            value={specialization}
                            checked={state.specialization === specialization}
                            onChange={(e) => {
                                state.specialization = e.currentTarget.value
                                setOpened(false)
                            }}
                        />
                    ))}
                </Box>
            </Collapse>

            <Box>
                Specialization: {snap.specialization}
            </Box>

        </>

    );
};

export default Specialization;