import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../../State';
import { Box, Button, Flex, Group, Tooltip } from "@mantine/core";
// import Tree from 'react-d3-tree';
// // import { Tree } from 'react-tree-graph';


type SearchContainerProps = {
    columnId: string;
    column: any;
};

const orgChart = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};

const TreeContainer: FC<SearchContainerProps> = ({ columnId, column }) => {
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
        </Flex>
    );
};

export default TreeContainer;