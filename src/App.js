import React, { useRef, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import "./App.css";
import Login from "./views/Login/Login";
import Steps from "./views/Steps/Steps";
import Evaluation from "./components/sections/Evaluation/Evaluation";
import DataMenage from "./views/DataMenage/DataMenage";
import UserRole from "./views/UserRole/UserRole";
import Connexion from "./views/Connexion/Connexion";

// // Initialize Google Analytics
// ReactGA.initialize(process.env.REACT_APP_GA_CODE);

// const trackPage = page => {
//   ReactGA.set({ page });
//   ReactGA.pageview(page);
// };

const App = () => {
  const childRef = useRef();
  let location = useLocation();
  let isLogin = false;
  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    // trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (

    < ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          {

            localStorage.getItem('grmdConnect') ? (
              <AppRoute
                exact
                path="/home"
                component={Home}
                layout={LayoutDefault}
              />
            ) : (
              <AppRoute exact path="/home" component={Connexion} />
            )}
          <AppRoute exact path="/" component={UserRole} />

          <Route path="/Steps/:ptVenteID?">
            <Steps />
          </Route>
          <AppRoute
            exact
            path="/gestion"
            component={DataMenage}
            layout={LayoutDefault}
          ></AppRoute>

          <AppRoute
            exact
            path="/ev"
            component={Evaluation}
            layout={LayoutDefault}
          />
        </Switch>
      )}
    />
  );
};

export default App;
