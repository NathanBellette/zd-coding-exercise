import React from 'react';
import {calculateSubscriptionCost, shouldDisableUpdate} from './helpers';
import {Subscription} from './interfaces';
import {plans, subscriptions} from '../mocks/mockData';

describe('calculateSubscriptionCost', () => {
    it('should show the correct result', () => {
        const result = calculateSubscriptionCost(10, 5);
        expect(result).toBe(50);
    });
});

describe('shouldEnableUpdate', () => {
    it('should return true when previewSubscription and currentSubscription have the same values', () => {
       const currentSubscription: Subscription = subscriptions[0];
       const previewSubscription: Subscription = {
           ...currentSubscription
       };
       const result = shouldDisableUpdate(previewSubscription, currentSubscription);
       expect(result).toBe(true);
    });

    it('should return false when previewSubscription and current subscriptions have different plans', () => {
        const currentSubscription: Subscription = subscriptions[0];
        const previewSubscription: Subscription = {
            ...currentSubscription,
            plan: plans[2]
        };
        const result = shouldDisableUpdate(previewSubscription, currentSubscription);
        expect(result).toBe(false);
    });

    it('should return false when previewSubscription and current subscriptions have different number of seats', () => {
        const currentSubscription: Subscription = subscriptions[0];
        const previewSubscription: Subscription = {
            ...currentSubscription,
            seats: 100
        };
        const result = shouldDisableUpdate(previewSubscription, currentSubscription);
        expect(result).toBe(false);
    });

    it('should return false when previewSubscription and current subscriptions have different total price', () => {
        const currentSubscription: Subscription = subscriptions[0];
        const previewSubscription: Subscription = {
            ...currentSubscription,
            cost: 50000
        };
        const result = shouldDisableUpdate(previewSubscription, currentSubscription);
        expect(result).toBe(false);
    });
});