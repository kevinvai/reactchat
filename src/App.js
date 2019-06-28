import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Chatbox from './chatbox/Chatbox';
import Particles from 'react-particles-js';
import 'react-chat-widget/lib/styles.css';

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
      username: "",
      token: localStorage.getItem("Token"),
      status: localStorage.getItem("Status"), //Fetch status from api
      users: [], // fetch from api
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

  onStatusChange(status, username){
    this.setState({
      status: status,
      username: username
    })
  }
  
  render(){
    console.log('rendered app');
    console.log('status: ' + this.state.status);

    return (
      <Provider store={store}>
        <div className="App">
        <h1>SOCKET IO VERSION</h1>
        <Particles className='particles'
          params={particlesOptions} />
        <Router>
        <Route exact path="/" render={(routeProps) => (
                  <Chatbox {...routeProps} username={this.state.username} onStatusChange={this.onStatusChange} />)}/>
        <Route exact path="/login" render={(routeProps) => (
                  <Login {...routeProps} onStatusChange={this.onStatusChange} onRouteChange={this.onRouteChange} />)}/>
        <Route exact path="/register" render={(routeProps) => (
                  <Register {...routeProps}  onStatusChange={this.onStatusChange} onTokenChange={this.onTokenChange} />)}
        />
        {
          this.state.status === 'online' ? 
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
