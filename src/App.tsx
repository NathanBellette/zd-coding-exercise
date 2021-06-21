import React, {useState} from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.module.scss';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import {Subscription} from './interfaces';
import SubscriptionConfirmation from './pages/SubscriptionConfirmation/SubscripionConfirmation';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>();
  const [previewSubscription, setPreviewSubscription] = useState<Subscription>();

  return (
      <React.Fragment>
          <Router>
              <Switch>
                  <Route exact path="/" render={props => (
                      <SubscriptionPage
                          setPreviewSubscription={setPreviewSubscription}
                          setCurrentSubscription={setCurrentSubscription}
                          previewSubscription={previewSubscription}
                          currentSubscription={currentSubscription} />
                  )}/>
                  <Route path="/confirmation" render={props => (
                      <SubscriptionConfirmation previousSubscription={currentSubscription} />
                  )}/>
                  <Route component={NotFound} />
              </Switch>
        </Router>
      </React.Fragment>
  );
}

export default App;
