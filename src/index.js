import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/accounts/login';
import Register from './components/accounts/register';
import Items from './components/items';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import DashBoard from './components/dashboard';
import NotFound from './components/notFound';
import axios from 'axios';
import Home from './components/home';

axios.defaults.baseURL='http://127.0.0.1:5000/v1/';


ReactDOM.render(
    <div>
        {/* <Header /> */}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route  path="/register" component={Register} />
                <Route  path="/dashboard" component={DashBoard} />
                <Route path="/Shoppinglist/:id/Items" component={Items} />
                <Route path="/home" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </div>
    ,
    document.getElementById('root')
);
registerServiceWorker();
