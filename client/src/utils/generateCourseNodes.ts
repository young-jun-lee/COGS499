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

        // if any of the items in the column have prerequisites on courses in the current column, rows will be 2, otherwise 1
        const rows = column.items.some(item => item.prerequisites?.some(prerequisite => column.items.some(item => item.id === prerequisite))) ? 4 : 1
        yPos += 100 * rows + 100


        nodes.push({
            id: column.name,
            type: 'group',
            data: { label: null },
            // position: { x: 0, y: index * 100 * rows },
            position: { x: xPos, y: yPos },
            style: {
                height: nodeHeight + nodeMargin * 2 * rows,
                width: nodeWidth * column.items.length + nodeMargin * (column.items.length - 1) + nodeMargin * 2,
                justifyContent: 'center',
                alignItems: 'center',
                color: colorScheme.primary
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
            // position: { x: 0, y: 0 },

            draggable: false,
            selectable: false,
            style: {
                height: nodeHeight + nodeMargin * 2 * rows,
                width: nodeWidth,
                // transform: 
                background: "red",
                // color: "red",
                // transform: `rotate(-90deg)`,
                transform: `translate(${xPos-115}px, ${yPos+100}px) rotate(-90deg)`,
                justifyContent: 'center',
                alignItems: 'center',
                // writingMode: 'vertical-rl',
                // transform: 'rotate(180deg)',
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
                    })
                }
                )
            }
            )

        }
    })
    return { courseNodes: nodes, courseEdges: edges }
}
