import './App.css';
import Nav from './Nav';
import Register from './register/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login/Login';
import MoviesDisplay from './MoviesDisplay';
import ViewUserlist from './ViewUserlist';

function App() {
   return (
       <div>
      <Router>
        <div className="app">
          <div>
            <Nav />
          </div>
          <Route exact path='/moviesdisplay' component={() => <MoviesDisplay />}/>
          <Route exact path='/movies' component={() => <MoviesDisplay   />}  />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/logout'  />
          <Route exact path='/viewuserlist' component={ ViewUserlist}/>
        </div>
       </Router>
       
       </div>
      
  );
}
export default App;
