import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from './components/Dashboard';
import { authenticate } from "./store/session";
import FriendsActivities from "./components/FriendsActivities/FriendsActivities"
import AddActivity from "./components/AddActivity/AddActivityForm"
import Images from './components/testing/Images'

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/feed" exact={true}>
          <FriendsActivities/>
        </ProtectedRoute>
        <ProtectedRoute path="/newactivity" exact={true}>
          <AddActivity />
        </ProtectedRoute>
        <ProtectedRoute path="/images/screenshot">
          <Images/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
