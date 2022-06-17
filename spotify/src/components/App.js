import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "../styles/App.css";
import baseRoutes from "../routes/index";

const App = () => {
  return (
    <div className="App">
      <Switch>
        {baseRoutes.map((prop) => {
          if (prop.redirect) {
            return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
          }
          return (
            <Route
              path={prop.path}
              exact={prop.exact}
              component={prop.component}
              key={prop.key}
            />
          );
        })}
      </Switch>
    </div>
  );
};

export default App;
