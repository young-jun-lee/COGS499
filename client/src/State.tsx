import { proxy } from "valtio";

type Specialization = string
type Basket = string[]
type NumYears = 1 | 2 | 3 | 4 | 5 | 6

export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears }>({
    specialization: "",
    currentBasket: [],
    numYears: 1
});
