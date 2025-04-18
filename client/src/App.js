import React from "react";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Klient from "./pages/klient/Klient";
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from "./utilities/ProtectedRoute";
import AlertState from './context/alertContext/AlertState'
import Alerts from './utilities/Alerts';

function App() {
  return (
    <>
      <AlertState>
        <Alerts />
        <Switch>
          <Route exact path='/' component={Login} />
          <ProtectedRoute path='/admin' component={Admin} />
          <ProtectedRoute path='/klient' component={Klient} />
        </Switch>
      </AlertState>
    </>
  );
}

export default App;
