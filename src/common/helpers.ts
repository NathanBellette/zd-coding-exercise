import {Subscription} from './interfaces';

export const isPlanUnchanged = (previewSubscription: Subscription | undefined, currentSubscription: Subscription | undefined) : boolean => {
    if(!previewSubscription || !currentSubscription) return true;
    const hasSameSubscriptionCost: boolean = previewSubscription.cost === currentSubscription.cost;
    const hasSameNumSeats: boolean = previewSubscription.seats === currentSubscription.seats;
    const hasSamePlan =  previewSubscription.plan.id === currentSubscription.plan.id;

    return hasSameSubscriptionCost && hasSameNumSeats && hasSamePlan;
}

export const calculateSubscriptionCost = (costPerSeat: number, numSeats: number) => costPerSeat * numSeats;