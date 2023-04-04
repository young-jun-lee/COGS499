import { UniqueIdentifier } from "@dnd-kit/core";

export type CourseNode = {
    id: string;
    type?: string;
    data?: { label: string | null };
    position?: { x: number; y: number };
    style?: {
        width: number;
        height: number;
        justifyContent?: string;
        alignItems?: string;
        marginRight?: number;
        color?: string;
        background?: string;
        transform?: string;
        fontSize?: number;
        textTransform?: string;
        borderTop?: string;
        borderRight?: string;
        borderBottom?: string;
        borderLeft?: string;
        borderRadius?: string;
        textAlign?: string;
        alignSelf?: string;
        justifySelf?: string;
        display?: string;
    };
    selectable?: boolean;
    draggable?: boolean;
    parentNode?: string;
    extent?: string;
    prerequisites?: readonly string[] | undefined
}

export type CourseColumns = {
    name: string;
    items: CourseNode[]
}[]


export type Specialization = {
    name?: string
    colours?: {
        primary: string
        secondary: string
        tertiary: string
    },
    core?: string | string[] | string[][]
    options?: string | string[] | string[][]
    supporting?: any[]
}

export type Basket = string[]
export type NumYears = 1 | 2 | 3 | 4 | 5 | 6

export type Course = {
    title?: string
    code?: string
    id: string
    value?: string
    group?: string
    description?: string
    prerequisites?: string[]
    corequisites?: string[]
    exclusions?: string[]
    one_way_exclusions?: string[]
}


export type Columns = { name: string, items: Course[], limitCourses: number }

export type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

export type Years = {
    [key: string]: Course[]
}