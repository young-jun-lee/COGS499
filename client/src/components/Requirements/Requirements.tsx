import { Box, Flex, Stack } from '@mantine/core';
import { FC } from "react";
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import SpecCourses from "./SpecCourses";
import Specialization from "./Specialization";
import "../../styles/styles.css"
import Toggle from '../DarkMode';
import HeaderContent from "../../content/Header";

interface Requirements {
    subheading1: string;
    subheading2: string;
    subheading3: string;
}

const Requirements: FC<Requirements> = ({ subheading1, subheading2, subheading3 }) => {
    const snap = useSnapshot(state)
    const specChosen = snap.specialization.name !== undefined;
    let majorOrSpec = "major";
    let coreCourses = undefined;
    let optionCourses = undefined;
    let supportingCourses = undefined;
    if (specChosen) {
        // search for the specialization in the list of specializations in HeaderContent
        HeaderContent.compSpecs.forEach((spec) => {
            if (spec === snap.specialization.name) {
                majorOrSpec = "specialization";
            }
        })
        if (majorOrSpec === "major") {
            coreCourses = JSON.parse(JSON.stringify(HeaderContent.commonMajorCore));
            supportingCourses = JSON.parse(JSON.stringify(HeaderContent.commonMajorSupporting));
        } else {
            coreCourses = JSON.parse(JSON.stringify(snap.specialization.core));
            console.log(snap.specialization.core)
            supportingCourses = JSON.parse(JSON.stringify(snap.specialization.supporting));
        }
        optionCourses = JSON.parse(JSON.stringify(snap.specialization.options));
    }



    // const coreCourses = specChosen ? majorOrSpec === "major" ?
    // JSON.parse(JSON.stringify(HeaderContent.commonMajorCore))
    // :
    // JSON.parse(JSON.stringify(HeaderContent.commonSpecCore)) : undefined;
    // 
    // console.log(HeaderContent)
    // 
    // const optionCourses = specChosen ? JSON.parse(JSON.stringify(snap.specialization.options)) : undefined;
    // let supportingCourses = specChosen ? JSON.parse(JSON.stringify(snap.specialization.supporting)) : undefined;
    // if (majorOrSpec === "major") {
    // supportingCourses = JSON.parse(JSON.stringify(HeaderContent.commonMajorSupporting))
    // }

    return (
        <Box>
            <Toggle />
            <Flex sx={{
                marginTop: "-50px",
                marginBottom: "5px",
                fontSize: "20px",
                height: "275px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <Flex sx={(theme) => ({
                    height: "80%",
                    width: "80%",
                    backgroundColor: `${snap.specialization.colours?.tertiary}`,
                    flexDirection: "column",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    textAlign: "center",
                    borderTop: `5px solid ${snap.specialization.colours?.primary}`,
                    borderRight: `5px solid ${snap.specialization.colours?.primary}`,
                    borderLeft: `5px solid ${snap.specialization.colours?.primary}`,
                    color: theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : `${snap.specialization.colours?.primary}`,
                    "--fillColor": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.primary}` : `${snap.specialization.colours?.secondary}`,
                    "--bgColor": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
                    "--hoverText": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : "#FFF",
                })} className="title">
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
                <Flex justify="center" direction="column" align={"center"} style={{ width: "80%", alignSelf: "center" }}>
                    <SpecCourses title="Core" specChosen={specChosen} courseGroup={coreCourses} />
                    <Flex direction="row" justify={"space-between"} style={{ width: "100%" }}>
                        <SpecCourses title="Supporting" specChosen={specChosen} courseGroup={supportingCourses} />
                        <SpecCourses title="Option" specChosen={specChosen} courseGroup={optionCourses} />
                    </Flex>
                </Flex>
            </Stack>
        </Box>
    );
};

export default Requirements;