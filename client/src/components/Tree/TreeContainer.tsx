import { Flex } from "@mantine/core";
import { FC } from "react";
import 'reactflow/dist/style.css';
import { Flow } from "./FlowChart";

const TreeContainer: FC = () => {
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




