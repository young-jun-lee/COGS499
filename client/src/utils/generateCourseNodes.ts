import { CourseColumns, CourseNode } from "../types/stateTypes"

export const generateCourseNodes = (columns: CourseColumns, colorScheme: any) => {

    let nodes: CourseNode[] = []
    let edges: any[] = []
    let yPos = 100
    let xPos = 0

    if (!Array.isArray(columns)) {
        return { courseNodes: [], courseEdges: [] };
    }

    columns.map((column, index) => {

        const nodeWidth = 100
        const nodeHeight = 35
        const nodeMargin = 10


        // const rows = column.items.some(
        //     item => item.prerequisites?.some(
        //         prerequisite => {
        //             column.items.some(
        //                 item => item.id === prerequisite)
        //         }
        //     )
        // ) ? 4 : 1

        // const rows = 1
        let compilePrereqs = new Set()
        column.items.forEach(item => {
            compilePrereqs = new Set([...compilePrereqs, ...item.prerequisites])
        })
        console.log(compilePrereqs)
        // console.log("rows:", rows)

        const rows = column.items.some(
            item => {
                console.log("item", item)
                return compilePrereqs.has(item.id)
            }
        ) ? 4 : 1

        yPos += 200


        nodes.push({
            id: column.name,
            type: 'group',
            data: { label: null },
            position: { x: xPos, y: yPos },
            style: {
                height: nodeHeight + nodeMargin * 2 * rows,
                width: nodeWidth * column.items.length + nodeMargin * (column.items.length - 1) + nodeMargin * 2,
                justifyContent: 'center',
                alignItems: 'center',
                color: colorScheme.primary,
                borderTop: `3px solid ${colorScheme.primary}`,
                borderRight: `3px solid ${colorScheme.primary}`,
                borderBottom: `3px solid ${colorScheme.primary}`,
                borderRadius: "0px 15px 15px 0px",
            },
            draggable: false,
            selectable: false,
        })

        // title 
        nodes.push({
            id: `${column.name}_label`,
            type: 'default',
            data: { label: column.name },
            position: { x: xPos - 100, y: yPos },
            draggable: false,
            selectable: false,
            style: {
                display: 'flex',
                textTransform: 'uppercase',
                height: nodeHeight + nodeMargin * 2 * rows,
                width: nodeWidth,
                color: "white",
                background: colorScheme.primary,
                borderTop: `3px solid ${colorScheme.primary}`,
                borderLeft: `3px solid ${colorScheme.primary}`,
                borderBottom: `3px solid ${colorScheme.primary}`,
                borderRadius: "15px 0px 0px 15px",
                justifyContent: 'center',
                textAlign: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                alignItems: 'center',
                fontSize: 20,
            },

        })

        let nodeX = nodeMargin


        for (let i = 0; i < column.items.length; i++) {
            // if the current item has prerequisites on courses in the current column, its position will be on the second row
            // console.log("column.items[i]", column.items[i].value)
            nodes.push({
                id: column.items[i].id,
                type: 'default',
                data: { label: column.items[i].value },
                style: {
                    width: nodeWidth,
                    height: nodeHeight,
                    marginRight: nodeMargin,
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: colorScheme.primary,
                    color: colorScheme.tertiary,
                },
                // position: { x: nodeX, y: nodeMargin },
                // if the current item has prerequisites on courses in the current column, its position will be on the second row
                // else, its position will be on the first row
                position: { x: nodeX, y: nodeMargin + (column.items[i].prerequisites?.some(prerequisite => column.items.some(item => item.id === prerequisite)) ? nodeHeight + nodeMargin * 2 : 0) },
                // position: { x: nodeX, y: nodeMargin + index * 100 * rows + (column.items[i].prerequisites?.some(prerequisite => column.items.some(item => item.id === prerequisite)) ? nodeHeight + nodeMargin * 2 : 0) },
                parentNode: column.name,
                extent: 'parent',
                prerequisites: column.items[i].prerequisites
            })

            nodeX += nodeWidth + nodeMargin
        }

        // add edges for items that have prerequisites on items in the current column
        for (let i = 0; i < column.items.length; i++) {
            const item = column.items[i]
            const prerequisites = item.prerequisites
            if (prerequisites) {
                for (let j = 0; j < prerequisites.length; j++) {
                    const prerequisite = prerequisites[j]
                    const prerequisiteItem = column.items.find(item => item.id === prerequisite)
                    if (prerequisiteItem) {
                        edges.push({
                            id: `e_${prerequisiteItem.id}-${item.id}-${index}`,
                            source: prerequisiteItem.id,
                            target: item.id,
                            type: "default",
                            style: {
                                stroke: colorScheme.primary,
                                strokeWidth: 2,
                            }
                        })
                    }
                }
            }
        }

        if (index > 0) {
            // get all items contained in the current column
            const currentColumnItems = nodes.filter(node => node.parentNode === column.name)

            currentColumnItems.forEach((currentItem, index) => {
                currentItem.prerequisites?.forEach(prerequisite => {
                    edges.push({
                        id: `e_${prerequisite}-${currentItem.id}`,
                        source: prerequisite,
                        target: currentItem.id,
                        type: 'default',
                        style: {
                            stroke: colorScheme.primary,
                            strokeWidth: 2,
                            WaveShaperNode: 0.5,
                        }
                    })
                }
                )
            }
            )

        }
    })
    return { courseNodes: nodes, courseEdges: edges }
}
