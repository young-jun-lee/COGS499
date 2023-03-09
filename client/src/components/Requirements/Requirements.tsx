import { Box, Flex } from '@mantine/core';
import { FC } from "react";
import SpecCourses from "./SpecCourses";
import Specialization from "./Specialization";

interface Requirements {
    subheading1: string;
    subheading2: string;
    subheading3: string;
}

const Requirements: FC<Requirements> = ({ subheading1, subheading2, subheading3 }) => {
    return (
        <Box>
            <Flex sx={{ marginBottom: "5px", fontSize: "20px", height: "275px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Flex sx={{
                    height: "80%", width: "70%", backgroundColor: "#e6e7e8", alignItems:
                        "center", justifyContent: "space-around", flexDirection: "column", borderRadius: "10px", textAlign: "center", color: "#212121",
                    '&:hover': {
                        backgroundColor: "#6a625c",
                        color: "white"
                    },
                    position: "relative"
                }}>
                    <div>{subheading1}</div>
                    <div style={{ width: "70%" }}>{subheading2}</div>
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{subheading3}</div>
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "10px",
                        background: "linear-gradient(to right, #002452 0, #002452 33%, #fabd0f 33%, #fabd0f 66%, #b90e31 66%, #b90e31 100%)"
                    }}></div>
                </Flex>
            </Flex>

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