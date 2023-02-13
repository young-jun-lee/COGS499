import { FC } from "react";
import { Box } from '@mantine/core';
import Specialization from "./Specialization";

interface Requirements {
	subheading: string;
}

const Requirements: FC<Requirements> = ({subheading}) => {
	return (

		<Box>
            Requirements: {subheading}
            <Specialization title="Biomedical Computing" />
		</Box>
	);
};

export default Requirements;