import React from 'react';
import { Route } from "react-router";

import App from './App';
import Page from "./feature/page/component";
import About from "./feature/about/component";

let routes = <Route>
  <Route component={App}>
    <Route path="/" component={Page} />
    <Route path="/about" component={About} />
  </Route>
</Route>

export default routes;