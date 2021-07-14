import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from './store/session';

import Navigation from './components/Navigation';

import {
  LoginForm,
  SignupForm,
  NewExercise,
  NewWorkout,
} from './components/forms';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/new-exercise">
            <NewExercise />
          </Route>
          <Route path="/new-workout">
            <NewWorkout />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
