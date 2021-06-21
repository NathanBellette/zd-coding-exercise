import {Subscription} from '../interfaces';

export const shouldEnableUpdate = (previewSubscription: Subscription | undefined, currentSubscription: Subscription | undefined) : boolean => {
    if(!previewSubscription || !currentSubscription) return false;
    const hasDifferentSubscriptionCost: boolean = previewSubscription.cost !== currentSubscription.cost;
    const hasDifferentNumSeats: boolean = previewSubscription.seats !== currentSubscription.seats;
    const hasDifferentPlan =  previewSubscription.plan.id !== currentSubscription.plan.id;

    return hasDifferentSubscriptionCost || hasDifferentNumSeats || hasDifferentPlan;
}

export const calculateSubscriptionCost = (costPerSeat: number, numSeats: number) => costPerSeat * numSeats;