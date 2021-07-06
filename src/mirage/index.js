import {belongsTo, createServer, Model} from 'miragejs';
import {subscriptions} from "../mocks/mockData";
import {calculateSubscriptionCost} from "../common/helpers";

export function makeServer({ environment = "development" }) {
    return createServer({
        environment,
        models: {
            product: Model.extend({
                subscriptions: belongsTo()
            }),
            subscription: Model,
            plan: Model.extend({
                product: belongsTo()
            })
        },
        seeds: (server) => {
          subscriptions.forEach((subscription) => {
            server.create('subscription', subscription)
          });
        },
        routes() {
            this.namespace = 'api';
            this.get('/subscriptions', (schema, request) => {
              return subscriptions;
            });
            this.get('/current/:id', (schema, request) => {
                const id = request.params.id;
                return schema.subscriptions.find(id);
            });
            this.post('/current/:id', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                const id = request.params.id;
                const subscriptionPrice = calculateSubscriptionCost(attrs.plan.cost, attrs.seats);
                schema.db.subscriptions.update(id,{ seats: attrs.seats, plan: attrs.plan, cost: subscriptionPrice});
                return schema.db.subscriptions.find(id);
            });
            this.put('/preview/:id', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return {
                    ...attrs,
                    cost: calculateSubscriptionCost(attrs.plan.cost, attrs.seats)
                }
            });
        }
    });
}
