import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header';
import Home from '../home';


class Login extends Component {
    constructor(props){
        super(props);
        // initialize state
        this.state = {
            email: '',
            password: ''
        }
        // bind methods to super
        this.handleLogin = this.handleLogin.bind(this);
        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
        this.onPassChangeHandler = this.onPassChangeHandler.bind(this)

    }
   
    // check if there exist token
    componentDidMount (){
        try {
            if (window.localStorage.getItem('token')) {
                this.props.history.push('/dashboard');
            }
            else if (window.localStorage.getItem('msg')) {
                toast.success(window.localStorage.getItem('msg'))
                window.localStorage.clear('msg')
            }
        }
        catch (e) { }        
    }
    // create a login function and pass it to form
    handleLogin(e){
       
        e.preventDefault();
        const LoginData = new FormData();
        LoginData.set('email', this.state.email)
        LoginData.set('password', this.state.password)
        axios.post('/login', LoginData, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded' }
            })
        .then((response) => {
            localStorage.setItem('token',"Bearer " +response.data.token);
            localStorage.setItem('message', response.data.message);
            this.props.history.push('/dashboard')
        })
        .catch((error) => {
            if(error.response){
                toast.error(error.response.data.error)
            }
            else {
                console.log(error.request);
                
            }
            
        });
    }

    onEmailChangeHandler = (e) => {
        this.setState({
           [e.target.name]: e.target.value,
        })
    } 
    onPassChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    } 
    render() {
        return (
                <div className="home">
                {/* add a header */}
                    <Header />
                    <ToastContainer hideProgressBar={true} />
                    <div className="container">
                        <Home />
                        <div className="col-md-4 home-login">
                            <div >
                                <p className="text-center"><i className="fa fa-user-circle user" /></p>
                                <h1 className="text-center">User Login</h1>
                                <form method="post" className="login" onSubmit={this.handleLogin}>
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                        <input type="email" required onChange={this.onEmailChangeHandler} id="email" name="email" value={this.state.email} className="form-control" placeholder="Enter your email as username" />
                                    </div>
                                    <br />
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                                        <input type="password" required id="password" name="password" value={this.state.password} onChange={this.onPassChangeHandler} className="form-control" placeholder="Enter password" />
                                    </div>
                                    <br />
                                <input type="submit" value="Submit" className="btn col-md-5 btn-primary" />
                                <input type="reset" value="Cancel" className="btn col-md-5 btn-danger pull-right" />
                                    <br />
                                </form>
                                <p className="text-center">Don't have an account? <Link to={`/register`} className="btn-link">Click here to Register</Link></p>

                            </div>
                        </div>

                    </div>
                </div>
            
        );

    }
}
export default Login