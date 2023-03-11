import { Box, Flex, Stack } from '@mantine/core';
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
            <Flex sx={{ marginTop: "10px", marginBottom: "5px", fontSize: "20px", height: "275px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Flex sx={{
                    height: "80%", width: "70%", backgroundColor: "#e6e7e8", alignItems:
                        "center", justifyContent: "space-around", flexDirection: "column", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", textAlign: "center", borderTop: "5px solid #a7a9ac", borderRight: "5px solid #a7a9ac", borderLeft: "5px solid #a7a9ac", color: "#212121",
                    '&:hover': {
                        backgroundColor: "#808285",
                        color: "white",
                        borderTop: "5px solid #58595b", borderRight: "5px solid #58595b", borderLeft: "5px solid #58595b"
                    },
                    position: "relative"
                }}>
                    <div>{subheading1}</div>
                    <div style={{ width: "70%" }}>{subheading2}</div>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{subheading3}</div>
                </Flex>
                <div style={{
                    // position: "absolute",
                    // bottom: 0,
                    // left: 0,
                    width: "70%",
                    height: "10px",
                    borderRadius: "0 0 10px 10px",
                    borderLeft: "3px solid #002452",
                    background: "linear-gradient(to right, #002452 0, #002452 33%, #fabd0f 33%, #fabd0f 66%, #b90e31 66%, #b90e31 100%)"
                }}></div>
            </Flex>

            <Stack style={{ border: "4px solid #005F73", borderRadius: "1em" }}>
                <Specialization />
                <Flex justify="space-between" style={{ height: "100%" }} >
                    <SpecCourses title="Program Specific Courses" />
                    <SpecCourses title="CISC Courses" />
                    <SpecCourses title="Electives" />
                </Flex>
            </Stack>


        </Box>
    );
};

export default Requirements;