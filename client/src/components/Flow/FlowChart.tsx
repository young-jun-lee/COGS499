import { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, applyNodeChanges, Background, MiniMap, NodeChange, Node } from "reactflow";
import { useSnapshot } from "valtio";
import { Course, CourseColumns } from "../../types/stateTypes";
import { generateCourseNodes } from "../../utils/generateCourseNodes";
import { state } from "../../Valtio/State";




interface FlowProps {
    // columns: Column[]
    backgroundColor: string | undefined
}


export const Flow: FC<FlowProps> = ({ backgroundColor }) => {
    const snap = useSnapshot(state);

    // console.log("rendering flow: ", snap.currentBasket)
    const rfStyle = {
        backgroundColor: backgroundColor,
    };

    const columns: CourseColumns = []


    const colorScheme = {
        primary: snap.specialization.colours?.primary,
        secondary: snap.specialization.colours?.secondary,
        tertiary: snap.specialization.colours?.tertiary
    }
    // console.log(snap.currentBasket)
    for (let column of Object.keys(snap.currentBasket) as any) {
        // skip the first column and any empty columns
        if (column === "0" || snap.currentBasket[column].length === 0) {
            continue
        }

        const items = []
        for (let item of Object.keys(snap.currentBasket[column]) as any) {
            let course = snap.currentBasket[column][item]
            let parsedCourse: Course = JSON.parse(JSON.stringify(course))

            const id = parsedCourse.id
            const value = parsedCourse.value
            const prerequisites = parsedCourse.prerequisites
            items.push({ id, value, prerequisites })
        }


        columns.push({ name: `Year ${column}`, items })
    }
    console.log(columns)

    const [courseNodes, setCoursesNodes, onNodesChange] = useNodesState([]);
    const [courseEdges, setCoursesEdges] = useNodesState([]);



    useEffect(() => {
        const generatedNodesEdges = generateCourseNodes(columns, colorScheme)
        setCoursesNodes(generatedNodesEdges.courseNodes)
        setCoursesEdges(generatedNodesEdges.courseEdges)
    }, [snap.currentBasket])


    return (
        <ReactFlow
            nodes={courseNodes}
            edges={courseEdges}
            onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            fitView
            style={rfStyle}
        // attributionPosition="top-right"
        >
            <Background />
            <MiniMap />
        </ReactFlow>
    );
}
