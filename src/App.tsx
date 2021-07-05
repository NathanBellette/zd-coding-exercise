import React, {useState} from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import './App.module.scss';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import {Subscription} from './common/interfaces';
import SubscriptionConfirmation from './components/SubscriptionConfirmation/SubscripionConfirmation';
import NotFound from './pages/NotFound/NotFound';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import {ToastProvider} from "react-toast-notifications";
import PaymentInformation from "./pages/PaymentInformation/PaymentInformation";
import ContactInformation from "./pages/ContactInformation/ContactInformation";

function App() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>();
  const [previewSubscription, setPreviewSubscription] = useState<Subscription>();

  return (
      <React.Fragment>
          <ErrorBoundary>
              <ToastProvider>
                  <Router>
                      <ul>
                          <li>
                              <Link to="/">Home</Link>
                          </li>
                          <li>
                              <Link to="/payment-information">Payment Information</Link>
                          </li>
                          <li>
                              <Link to="/contact-information">Contact Information</Link>
                          </li>
                      </ul>
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
                          <Route path="/payment-information" component={PaymentInformation} />
                          <Route path="/contact-information" component={ContactInformation} />
                          <Route component={NotFound} />
                      </Switch>
                </Router>
              </ToastProvider>
          </ErrorBoundary>
      </React.Fragment>
  );
}

export default App;
