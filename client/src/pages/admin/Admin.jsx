import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Klientet from "./components/Klientet";
import Profili from "./components/Profili";
import axios from "axios";

export default function Admin({ history }) {
  const logut = () => {
    axios
      .post("http://localhost/prime/user/logout", {
        user_id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        if (res.data.status === 1) {
          history.push("/");
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
        }
      });
  };

  return (
    <>
      <div className="admin">
        <Header logout={logut} />
        <div className="admin-container container">
          <Switch>
            <Route exact path="/admin" component={Klientet} />
            <Route path="/admin/profili" component={Profili} />
          </Switch>
        </div>
      </div>
    </>
  );
}
