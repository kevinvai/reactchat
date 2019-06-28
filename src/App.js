import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Chatbox from './chatbox/Chatbox';
import 'react-chat-widget/lib/styles.css';
import Particles from 'particles'

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
        value_area: 800
      }
    }
  }
};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: localStorage.getItem("Token"),
      status: localStorage.getItem("Status"), //Fetch status from api
      users: [], // fetch from api
      route: "login"
    }

    this.onTokenChange = this.onTokenChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    //this.onRouteChange = this.onRouteChange.bind(this);
  }

  onTokenChange(token){
    this.setState({
      token: token
    })
  }

  onStatusChange(status){
    this.setState({
      status: status
    })
  }
  
  render(){
    return (
      <Provider store={store}>
        <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Router>
        <Route exact path="/" component={Chatbox} />
        <Route exact path="/login"   render={(routeProps) => (
                  <Login {...routeProps} onStatusChange={this.onStatusChange} onRouteChange={this.onRouteChange} />)}/>
        <Route exact path="/register"
                render={(routeProps) => (
                  <Register {...routeProps}  onStatusChange={this.onStatusChange} onTokenChange={this.onTokenChange} />)}
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
