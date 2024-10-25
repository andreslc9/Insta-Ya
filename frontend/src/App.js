import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSession from './views/UserSession';
import UserRegister from './views/UserRegister';
import ListPackages from './views/ListPackages';
import UpdateOrder from './views/UpdateOrder';
import CreateOrder from './views/CreateOrder';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ProtectedRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserSession} />
        <Route exact path="/registro" component={UserRegister} />
        <ProtectedRoute  exact path="/lista-paquetes" component={ListPackages} />
        <ProtectedRoute exact path="/actualizar-orden/:item_tracing" component={UpdateOrder} />
        <ProtectedRoute exact path="/crear-orden" component={CreateOrder} />
      </Switch>
    </Router>
  );
}

export default App;
