import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './components/Home';
import Tareas from './components/Tareas'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';


function App() {

    return (
      <Router>
          <div>

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/tareas">
                      <Tareas />
                  </Route>
                  <Route path="/">
                      <Home />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
