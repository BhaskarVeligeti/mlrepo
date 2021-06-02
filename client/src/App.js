/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import withIdleTimer from './components/idletimer/idleTimer';
import { Provider as AppProvider } from './context/AppContext';
import NotFoundPage from './NotFoundPage'
import Auth from './auth/Auth';
import history from './history';
import Home from './secure/Home';
import Predict from './secure/Predict';



const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }, []);



  return (
    <AppProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/home" component={withIdleTimer(Home)} />
          <Route path="/predict" component={withIdleTimer(Predict)} />
          <Route component={withIdleTimer(NotFoundPage)} />
        </Switch>
      </Router>
    </AppProvider >
  );
};
export default App;


