import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../State';
import { Button, Flex, Group, Tooltip } from "@mantine/core";
import { constants } from "../content/Constants";
import Year from "./Year";




const Years: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column" }}>

            {[...Array(snap.numYears)].map((x, i) =>
                // <div>Year {i + 1}</div>
                <Year year={i + 1}></Year>
            )}
            {snap.numYears < constants.MAX_YEARS ?
                <Button
                    onClick={() => {
                        state.numYears += 1
                    }}
                >
                    Add Year
                </Button>
                : <Group position="center">
                    <Tooltip label="Max Academic Years">
                        <Button
                            data-disabled
                            sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                            onClick={(event) => event.preventDefault()}
                        >
                            Add Year
                        </Button>
                    </Tooltip>
                </Group>
            }
        </Flex>
    );
};

export default Years;