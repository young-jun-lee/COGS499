import { useCallback } from "react";
import ReactFlow, { useNodesState, applyNodeChanges, Background, MiniMap } from "reactflow";
import { useSnapshot } from "valtio";
import { generateCourseNodes } from "../../utils/generateCourseNodes";
import { state } from "../../Valtio/State";


const rfStyle = {
    backgroundColor: '#D0C0F7',
};


export const Flow = () => {
    const snap = useSnapshot(state);

    // const columns = Object.keys(snap.columns).map(key => snap.columns[key])
    // console.log(columns)
    console.log("rendering")
    const columns = []
    // go through snap.columns and create get the name, items, and prerequisites for each column
    // skip the first column
    for (let i = 1; i < snap.columns.length; i++) {
        const column = snap.columns[i]
        const items = []
        // go through the items in the column and get the id, value, and prerequisites
        for (let j = 0; j < column.items.length; j++) {
            const item = column.items[j]
            const id = item.id
            const value = item.value
            const prerequisites = item.prerequisites
            items.push({ id, value, prerequisites })
        }
        columns.push({ name: column.name, items })
    }
    console.log(columns)

    let { courseNodes, courseEdges } = generateCourseNodes(columns)



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
