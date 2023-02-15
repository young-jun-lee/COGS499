import { proxy } from "valtio";

type Specialization = string
type Basket = string[]
type NumYears = number

export const state = proxy<{ specialization: Specialization, currentBasket: Basket, numYears: NumYears }>({
    specialization: "",
    currentBasket: [],
    numYears: 1
});
