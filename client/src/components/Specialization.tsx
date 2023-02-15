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
                    <Radio.Group
                        value={state.specialization}
                    >
                        {HeaderContent.specializations.map((specialization) => (
                            <Radio
                                key={specialization}
                                label={specialization}
                                value={specialization}
                                checked={state.specialization === specialization}
                                onClick={() => {
                                    state.specialization = specialization;
                                    setOpened(false);
                                }}
                            />
                        ))}
                    </Radio.Group>
                </Box>
            </Collapse>

            <Box>
                {snap.specialization === "" ? <></> : <div className='banner-text'>Specialization: {snap.specialization}</div>}
            </Box>

        </>

    );
};

export default Specialization;