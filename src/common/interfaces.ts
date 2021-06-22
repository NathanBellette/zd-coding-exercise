export interface Plan {
    id: string;
    name: string;
    cost: number;
}

export interface Product {
    id: string;
    plans: Plan[]
}

export interface Subscription {
    id: string;
    product: Product;
    plan: Plan;
    seats: number;
    cost: number;
}
