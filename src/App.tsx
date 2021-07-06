import React, {useState} from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.module.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import {Subscription} from './common/interfaces';
import SubscriptionConfirmation from './components/SubscriptionConfirmation/SubscripionConfirmation';
import NotFound from './pages/NotFound/NotFound';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import {ToastProvider} from "react-toast-notifications";

function App() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>();
  const [previewSubscription, setPreviewSubscription] = useState<Subscription>();
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>();

  return (
      <React.Fragment>
          <ErrorBoundary>
              <ToastProvider>
                  <Router>
                      <Switch>
                          <Route exact path="/" render={props => (
                            <LandingPage
                              setAllSubscriptions={setAllSubscriptions}
                              allSubscriptions={allSubscriptions} />
                            )}/>
                            <Route exact path="/:id" render={props => (
                              <SubscriptionPage
                                  setPreviewSubscription={setPreviewSubscription}
                                  setCurrentSubscription={setCurrentSubscription}
                                  previewSubscription={previewSubscription}
                                  currentSubscription={currentSubscription} />
                          )}/>
                          <Route path="/confirmation/:id" render={props => (
                              <SubscriptionConfirmation previousSubscription={currentSubscription} />
                          )}/>
                          <Route component={NotFound} />
                      </Switch>
                </Router>
              </ToastProvider>
          </ErrorBoundary>
      </React.Fragment>
  );
}

export default App;
