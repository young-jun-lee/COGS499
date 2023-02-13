import { FC } from "react";
import { Box, Container, Group } from '@mantine/core';
import Specialization from "./Specialization";
import SpecCourses from "./SpecCourses";

interface Requirements {
	subheading: string;
}

const Requirements: FC<Requirements> = ({subheading}) => {
	return (

		<Box>
            Requirements: {subheading}
            <Specialization />
            {/* the child elements should fill all available space*/}
            <Group position="center">
                <SpecCourses title="Program Specific Courses"/>
                <SpecCourses title="CISC Courses"/>
                <SpecCourses title="Electives" />
            </Group>

		</Box>
	);
};

export default Requirements;