import {Plan, Product, Subscription} from '../common/interfaces';

export const plans: Plan[] = [
    {
        id: '1',
        name: 'Basic',
        cost: 1
    },
    {
        id: '2',
        name: 'Good',
        cost: 10
    },
    {
        id: '3',
        name: 'Better',
        cost: 100
    },
    {
        id: '4',
        name: 'Best',
        cost: 1000
    }
];

export const products: Product[] = [
    {
        id: '1',
        plans: plans
    }
]

export const subscriptions: Subscription[] = [
    {
        id: '1',
        product: products[0],
        plan: plans[0],
        seats: 5,
        cost: 5
    },
    {
        id: '2',
        product: products[0],
        plan: plans[1],
        seats: 2,
        cost: 20
    },
    {
        id: '3',
        product: products[0],
        plan: plans[2],
        seats: 1,
        cost: 100
    }
];
