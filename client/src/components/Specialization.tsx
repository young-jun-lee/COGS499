import { Box, Button, Radio } from '@mantine/core';
import { FC, useState } from "react";
import HeaderContent from "../content/Header";




interface Specialization {
	title: string;
}



const Specialization: FC<Specialization> = (props) => {
    const [specialization, setSpecialization] = useState("");
	return (
        specialization === "" ? (
            <Box>
                {HeaderContent.specializations.map((specialization) => (
                    <Radio
                        key={specialization}
                        label={specialization}
                        value={specialization}
                        onChange={(e) => setSpecialization(e.currentTarget.value)}
                    />
                ))}
            </Box>
        ) : (
            <Box>
                Specialization: {specialization}
                <Button onClick={()=> setSpecialization("")}>Reset</Button>
            </Box>
        )

	);
};

export default Specialization;