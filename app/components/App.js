import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";
import Popular from "./Popular";
import log  from 'loglevel';

class App extends React.Component {
  componentDidMount() {
    log.setDefaultLevel(3);
    log.setLevel(1, true);
    log.debug("App Mounted");
    log.info("App Mounted at INFO");
    log.warn("App Mounted at WARN");
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
              <Route path="/popular" component={Popular} />
              <Route render={() =><p>Not Found</p>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
