import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Chatbox from './chatbox/Chatbox';
import post from './helperfunctions/postdata';
import PrivateRoute from './PrivateRoute';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: "sdfd",
      status: "", //Fetch status from api
      users: [] // fetch from api
    }
  }

  onRouteChange = (location) =>{
    this.setState({
      route: location
    })
  }

  onTokenChange = (token) =>{
    this.setState({
      token: token
    })
  }
  
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <Widget />
        <Router>
        <Route exact path="/" component={Chatbox} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register"
                 render={(routeProps) => (
                  <Register {...routeProps} onTokenChange={this.onTokenChange} />)}
        />
        {
          this.state.status ? 
          (
            <Redirect to={{pathname: "/"}}/>
          )  :
          (
            <Redirect to={{pathname: "/Login"}}/>
          )
        }
        </Router>  
        </div>
      </Provider>
    );
  }
}

export default App;
