import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../State';
import { Button, Flex } from "@mantine/core";




const Years: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column" }}>

            {[...Array(snap.numYears)].map((x, i) =>
                <div>Year {i + 1}</div>
            )}
            <Button
                onClick={() => {
                    state.numYears += 1;
                }}
            >
                Add Year
            </Button>
        </Flex>
    );
};

export default Years;