import { Box, Flex, Stack } from '@mantine/core';
import { FC } from "react";
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import SpecCourses from "./SpecCourses";
import Specialization from "./Specialization";
import "../../styles/styles.css"

interface Requirements {
    subheading1: string;
    subheading2: string;
    subheading3: string;
}

const Requirements: FC<Requirements> = ({ subheading1, subheading2, subheading3 }) => {
    const snap = useSnapshot(state)
    const specChosen = snap.specialization.name !== undefined;
    return (
        <Box>
            <Flex sx={{
                marginTop: "10px",
                marginBottom: "5px",
                fontSize: "20px",
                height: "275px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <Flex sx={{
                    height: "80%",
                    width: "80%",
                    // backgroundColor: "#e6e7e8",
                    backgroundColor: `${snap.specialization.colours?.tertiary}`,
                    // alignItems: "center",
                    // justifyContent: "space-around",
                    flexDirection: "column",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    textAlign: "center",
                    borderTop: `5px solid ${snap.specialization.colours?.primary}`,
                    borderRight: `5px solid ${snap.specialization.colours?.primary}`,
                    borderLeft: `5px solid ${snap.specialization.colours?.primary}`,
                    color: `${snap.specialization.colours?.primary}`,
                    '&:hover': {
                        backgroundColor: "#808285",
                        color: "white",
                        borderTop: "5px solid #58595b", borderRight: "5px solid #58595b", borderLeft: "5px solid #58595b"
                    },
                    // position: "relative",
                    "--fillColor": `${snap.specialization.colours?.secondary}`,
                    "--bgColor": `${snap.specialization.colours?.tertiary}`
                }} className="title">
                    <div style={{ fontSize: "25px" }}>{subheading1}</div>
                    <div style={{ fontSize: "22px", maxWidth: "55ch" }}>{subheading2}</div>
                    <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "5px" }}>{subheading3}</div>
                </Flex>
                <div style={{

                    width: "80%",
                    height: "10px",
                    borderRadius: "0 0 10px 10px",
                    borderLeft: "3px solid #002452",
                    background: "linear-gradient(to right, #002452 0, #002452 33%, #fabd0f 33%, #fabd0f 66%, #b90e31 66%, #b90e31 100%)",
                    boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
                }}></div>
            </Flex>

            <Stack style={{
                border: `5px solid ${snap.specialization.colours?.primary}`, borderRadius: "1em", boxShadow: "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)"
            }}>
                <Specialization specChosen={specChosen} />
                <Flex justify="space-around" style={{ height: "100%" }} >
                    <SpecCourses title="Program Specific Courses" specChosen={specChosen} />
                    <SpecCourses title="CISC Courses" specChosen={specChosen} />
                    <SpecCourses title="Electives" specChosen={specChosen} />
                </Flex>
            </Stack>


        </Box>
    );
};

export default Requirements;