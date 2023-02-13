import { Box, Button, Radio } from '@mantine/core';
import { FC } from "react";
import HeaderContent from "../content/Header";
import {useSnapshot} from "valtio";
import { state } from '../State';


interface Specialization {
	title: string;
}

const Specialization: FC<Specialization> = (props) => {
    const snap = useSnapshot(state);
    // const [specialization, setSpecialization] = useState("");
	return (
        snap.specialization === "" ? (
            <Box>
                {HeaderContent.specializations.map((specialization) => (
                    <Radio
                        key={specialization}
                        label={specialization}
                        value={specialization}
                        onChange={(e) => state.specialization = e.currentTarget.value}
                    />
                ))}
            </Box>
        ) : (
            <Box>
                Specialization: {snap.specialization}
                <Button onClick={()=> state.specialization = ""}>Reset</Button>
            </Box>
        )

	);
};

export default Specialization;