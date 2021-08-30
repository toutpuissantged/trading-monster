import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-free/css/all.css";

import Home from "../components/home/main";
import Details from "../components/details/main";

export default function Routes() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:name" component={Details} />
        </Switch>
      </HashRouter>
    </div>
  );
}
