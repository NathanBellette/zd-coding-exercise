import React, {useContext} from 'react';

interface ContextProps {
    currencies: string[];
}

const SubscriptionContext = React.createContext<Partial<ContextProps>>({});

const currencies: string[] = ['AUD', 'USD', 'GBP', 'CNY'];

export const SubscriptionProvider = (props: any) => {
    return (
        <SubscriptionContext.Provider value={{currencies}}>
            {props.children}
        </SubscriptionContext.Provider>
    );
}

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if(!context) {
        throw new Error('useSubscription must be used from within a cart provider');
    }

    return context;
}