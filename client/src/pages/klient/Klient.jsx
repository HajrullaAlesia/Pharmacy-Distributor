import React from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Porosite from "./components/Porosite";
import Profili from "./components/Profili";
import axios from "axios";

export default function Klient({ history }) {
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
      <div className="klient">
        <Header logout={logut} />
        <div className="klient-container container">
          <Switch>
            <Route exact path="/klient" component={Porosite} />
            <Route path="/klient/profili" component={Profili} />
          </Switch>
        </div>
      </div>
    </>
  );
}
