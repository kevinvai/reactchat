import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Chatbox from './components/chatbox';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Chatbox} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
