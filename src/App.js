
import { react } from "react";
import Home from './Home';
import Fav from './Fav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
 
  

  return (
    <Router>
        <Switch>
          <Route path="/Fav">
            <Fav />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
