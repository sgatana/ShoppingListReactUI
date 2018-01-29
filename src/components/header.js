import React, { Component } from  'react';
import {Link } from 'react-router-dom';

import axios from 'axios'
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: ""
        }
    }

    // add user logout functionality
    onUserLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.setItem('msg', 'You have successfully logged out!');
        window.location.reload();
    }
    // get user details 
    getUserDetails = () => {
        axios.get('/user', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            this.setState({name: response.data.user.name })
        })
        .catch(error => {

        })
        
    }
    // load user 
    componentDidMount () {
        this.getUserDetails();
    }
    render(){
        let nav;
        if (!localStorage.getItem("token")){
            nav = <span>
                <Link type="button" className="btn btn-primary " to="/">Sign in</Link>
                <Link type="button" className="btn btn-success button" to="/register">Sign Up</Link>
            </span>
        }
        else {
            nav = <span>
                <button type="button" className="btn btn-link "><i className="fa fa-user-circle" />{this.state.name}</button>
                <button type="button" onClick={this.onUserLogout} className="btn btn-link "><i className="glyphicon glyphicon-log-out" />Logout</button>
            </span>
        }
        return (
            <nav className="navbar navbar-inverse ">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Epic Shoppinglist</Link>
                    </div>
                    <ul id="navbar" className="navbar-collapse collapse">
                        <div className="navbar-right links ">
                            {nav}
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}