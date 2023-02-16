import { proxy } from "valtio";

type Specialization = string
type Basket = string[]
type NumYears = 1 | 2 | 3 | 4 | 5 | 6

type Columns = { [year: string]: { name: string, items: { id: string, courseCode: string }[] } }


export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears, columns: Columns }>({
    specialization: "",
    currentBasket: [],
    numYears: 1,
    columns: { "year 0": { name: "Year 0", items: [] } }
});
