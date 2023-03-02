import { Box, Flex } from '@mantine/core';
import { FC } from "react";
import SpecCourses from "./SpecCourses";
import Specialization from "./Specialization";

interface Requirements {
    subheading: string;
}

const Requirements: FC<Requirements> = ({ subheading }) => {
    return (
        <Box>
            <Box sx={{ color: "black", marginTop: "10px", marginBottom: "5px", fontSize: "18px" }}>{subheading}</Box>
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