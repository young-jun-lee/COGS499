import { FC } from "react";
import { Box } from '@mantine/core';

interface Specialiation {
	title: string;
}

const Specialization: FC<Specialiation> = (props) => {
	return (

		<Box>
            Specialization: {props.title}
		</Box>
	);
};

export default Specialization;