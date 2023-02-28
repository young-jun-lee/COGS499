import { Flex } from "@mantine/core";
import { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from '../../State';


const TreeContainer: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column", width: "100%", height: "100%" }}>

            <div>
                <h1 style={{ textAlign: "center" }}>What's Next</h1>
                <h3 style={{ textAlign: "center" }}>Here's a roadmap based on your degree plan and the courses you've chosen so far</h3>
            </div>
            {/* <div id="treeWrapper" style={{ width: '50em', height: '60em', marginBottom: 500 }}>
                <Tree data={orgChart} />
            </div> */}
            <div style={{ width: "100%", height: 500 }}>

                <Flow />
            </div>
        </Flex>
    );
};

export default TreeContainer;


import { useCallback } from 'react';
import ReactFlow, {
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    MiniMap,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';



const rfStyle = {
    backgroundColor: '#D0C0F7',
};


type CourseNode = {
    id: string;
    type: string;
    data: { label: string | null };
    position: { x: number; y: number };
    style: {
        width: number;
        height: number;
        justifyContent?: string;
        alignItems?: string;
        marginRight?: number;
    };
    parentNode?: string;
    extent?: string;
    prerequisites?: readonly string[] | undefined
}

const generateCourseNodes = () => {
    const snap = useSnapshot(state);
    let nodes: CourseNode[] = []
    let edges: any[] = []

    snap.columns.forEach((column, index) => {
        // skip the first column
        if (index === 0) return

        const nodeWidth = 100
        const nodeHeight = 35
        const nodeMargin = 10

        nodes.push({
            id: column.name,
            type: 'group',
            data: { label: null },
            position: { x: 0, y: index * 100 },
            style: {
                height: nodeHeight + nodeMargin * 2,
                width: nodeWidth * column.items.length + nodeMargin * (column.items.length - 1) + nodeMargin * 2,
                justifyContent: 'center',
                alignItems: 'center',
            },
        })

        let nodeX = nodeMargin
        for (let i = 0; i < column.items.length; i++) {
            nodes.push({
                id: column.items[i].id,
                type: 'default',
                data: { label: column.items[i].value },
                style: {
                    width: nodeWidth,
                    height: nodeHeight,
                    marginRight: nodeMargin,
                },
                position: { x: nodeX, y: nodeMargin },
                parentNode: column.name,
                extent: 'parent',
                prerequisites: column.items[i].prerequisites
            })

            nodeX += nodeWidth + nodeMargin
        }
        if (index > 1) {
            // console.log(index)

            // get all items contained in the previous column
            const prevColumnItems = nodes.filter(node => node.parentNode === snap.columns[index - 1].name)
            console.log("prevColumnItems", prevColumnItems)
            // get all items contained in the current column
            const currentColumnItems = nodes.filter(node => node.parentNode === column.name)
            // console.log("currentColumnItems", currentColumnItems)
            // for each item in the previous column, create an edge to each item in the current column
            // prevColumnItems.forEach(prevItem => {
            //     currentColumnItems.forEach((currentItem, index) => {
            //         console.log(index)
            //         edges.push({
            //             id: `e_${prevItem.id}-${currentItem.id}`,
            //             source: prevItem.id,
            //             target: currentItem.id,
            //         })
            //         // console.log("creating edge", prevItem.id, currentItem.id)

            //     })
            // }
            // )
            currentColumnItems.forEach((currentItem, index) => {
                currentItem.prerequisites?.forEach(prerequisite => {
                    edges.push({
                        id: `e_${prerequisite}-${currentItem.id}`,
                        source: prerequisite,
                        target: currentItem.id,
                    })
                }
                )
            }
            )

        }
    })
    return { courseNodes: nodes, courseEdges: edges }
}

function Flow() {


    let { courseNodes, courseEdges } = generateCourseNodes()
    // console.log(courseNodes)
    console.log(courseEdges)


    // console.log(courseNodes)
    // const [nodes, setNodes] = useState(courseNodes);
    const [nodes, setNodes] = useNodesState(courseNodes);
    // const [edges, setEdges] = useState(courseEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );


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
