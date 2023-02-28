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

                {/* <Flow /> */}
            </div>
        </Flex>
    );
};

export default TreeContainer;


import { useCallback } from 'react';
import ReactFlow, {
    Background,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: 'A',
        type: 'group',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 140,
        },
    },
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'C',
        data: { label: 'child node 2' },
        position: { x: 10, y: 90 },
        parentNode: 'A',
        extent: 'parent',
    },
];

const initialEdges = [{ id: 'b-c', source: 'B', target: 'C' }];

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
        edges.push({
            id: column.name,
            source: column.name,
            target: snap.columns[index - 1].name,
        })


        let nodeX = nodeMargin
        for (let i = 0; i < column.items.length; i++) {
            nodes.push({
                id: column.items[i].id,
                type: 'input',
                data: { label: column.items[i].value },
                style: {
                    width: nodeWidth,
                    height: nodeHeight,
                    marginRight: nodeMargin,
                },
                position: { x: nodeX, y: nodeMargin },
                parentNode: column.name,
                extent: 'parent',
            })

            nodeX += nodeWidth + nodeMargin
        }


    })
    return nodes
}

function Flow() {


    let courseNodes: CourseNode[] = generateCourseNodes()

    // console.log(courseNodes)
    const [nodes, setNodes] = useState(courseNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    // const onConnect = useCallback(
    //     (connection) => setEdges((eds) => addEdge(connection, eds)),
    //     [setEdges]
    // );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            fitView
            style={rfStyle}
            attributionPosition="top-right"
        >
            <Background />
        </ReactFlow>
    );
}
