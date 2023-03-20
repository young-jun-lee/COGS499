import { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, applyNodeChanges, Background, MiniMap, NodeChange, Node } from "reactflow";
import { useSnapshot } from "valtio";
import { generateCourseNodes } from "../../utils/generateCourseNodes";
import { state } from "../../Valtio/State";




interface FlowProps {
    // columns: Column[]
    backgroundColor: string | undefined
}


export const Flow: FC<FlowProps> = ({ backgroundColor }) => {
    const snap = useSnapshot(state);

    console.log("rendering flow: ", snap.currentBasket)
    const rfStyle = {
        backgroundColor: backgroundColor,
    };
    // const columns = Object.keys(snap.columns).map(key => snap.columns[key])
    // console.log(columns)
    // console.log("rendering")
    const columns = []
    // go through snap.columns and create get the name, items, and prerequisites for each column
    // skip the first column
    // console.log("snap.columns: ", snap.columns)
    // console.log("snap.currrentBasket: ", snap.currentBasket)

    const colorScheme = {
        primary: snap.specialization.colours?.primary,
        secondary: snap.specialization.colours?.secondary,
        tertiary: snap.specialization.colours?.tertiary
    }
    console.log(snap.currentBasket)
    for (let column of Object.keys(snap.currentBasket) as any) {
        // skip the first column and any empty columns
        if (column === "0" || snap.currentBasket[column].length === 0) {
            continue
        }

        const items = []
        for (let item of Object.keys(snap.currentBasket[column]) as any) {
            const course = snap.currentBasket[column][item]
            const id = course.id
            const value = course.value
            const prerequisites = course.prerequisites
            items.push({ id, value, prerequisites })
        }


        columns.push({ name: `Year ${column}`, items })
    }

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
