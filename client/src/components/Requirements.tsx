import { Box, Flex } from '@mantine/core';
import { FC } from "react";
import SpecCourses from "./SpecCourses";
import Specialization from "./Specialization";



const Requirements: FC = () => {
    return (

        <Box>
            <Specialization />
            <Flex justify="space-between" style={{ height: "100%" }} >
                <SpecCourses title="Program Specific Courses" />
                <SpecCourses title="CISC Courses" />
                <SpecCourses title="Electives" />
            </Flex>
        </Box>
    );
};

export default Requirements;