import { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState, applyNodeChanges, Background, MiniMap } from "reactflow";
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

    for (let column in snap.currentBasket) {

        // skip the first column and any empty columns
        if (column === "0" || snap.currentBasket[column].length === 0) {
            continue
        }

        const items = []
        for (let item in snap.currentBasket[column]) {
            const id = snap.currentBasket[column][item].id
            const value = snap.currentBasket[column][item].value
            const prerequisites = snap.currentBasket[column][item].prerequisites
            // const prerequisites = []
            // for (let prereq in snap.currentBasket[column][item].prerequisites) {
            //     prerequisites.push(snap.currentBasket[column][item].prerequisites[prereq])
            // }
            items.push({ id, value, prerequisites })
        }
        columns.push({ name: `Year ${column}`, items })
    }

    console.log(columns)
    let { courseNodes, courseEdges } = generateCourseNodes(columns, colorScheme)

    const [coursesNodesEdges, setCoursesNodesEdges] = useState(
        generateCourseNodes(columns, colorScheme)
    )

    // useEffect(() => {

    // }, [snap.currentBasket])

    // console.log(courseNodes)



    // console.log(courseNodes)
    // const [nodes, setNodes] = useState(courseNodes);
    const [nodes, setNodes] = useNodesState(coursesNodesEdges.courseNodes);
    // const [edges, setEdges] = useState(courseEdges);

    const onNodesChange = useCallback(
        (changes) => {
            setCoursesNodesEdges(generateCourseNodes(columns, colorScheme))
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]);


    return (
        <ReactFlow
            nodes={nodes}
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
