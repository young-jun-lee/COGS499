import { proxy } from "valtio";

type Specialization = string
type Basket = string[]

export const state = proxy<{specialization: Specialization, currentBasket: Basket}>({
    specialization: "",
    currentBasket: []
});
