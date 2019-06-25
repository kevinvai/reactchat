import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Chatbox from './chatbox/Chatbox';
import post from './helperfunctions/postdata';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: "",
      status: "online", //Fetch status from api
      users: [] // fetch from api
    }
  }

  onRouteChange = (location) =>{
    this.setState({
      route: location
    })
  }
  
  render(){
    return (
      <Provider store={store}>
        <div className="App">
        <Router>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={Chatbox} />
        </Router>  
        </div>
      </Provider>
    );
  }
}

export default App;
