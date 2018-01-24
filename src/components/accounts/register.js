import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header';
import { ToastContainer, toast } from 'react-toastify';
import Home from '../home'


class Register extends Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm: ''
        }
        // bind the methods to the main React component
        this.handleRegister = this.handleRegister.bind(this)
        this.onChangeInputs = this.onChangeInputs.bind(this)
    }
    // prevent access to registration page if already logged in
    componentDidMount() {
        try{
            if (window.localStorage.getItem('token')) {
                this.props.history.push('/dashboard');
            }
        }
        catch (e ){}
       
    }
    // handle user registration
    handleRegister = (e) => {
        e.preventDefault();
        let RegisterData = new FormData();
        RegisterData.set("username", this.state.username);
        RegisterData.set("email", this.state.email);
        RegisterData.set("password", this.state.password);
        RegisterData.set("confirm", this.state.confirm);

        axios.post('/register', RegisterData, {
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
            .then(res => {
                window.localStorage.setItem('msg', res.data.message);
                this.props.history.push('/')
            })
            .catch(error => {
                toast.error(error.response.data.error)

            })
    };
    // set state to the value being entered
    onChangeInputs = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        let details = {};
        details[key] = value;
        this.setState(details);


    }
    render() {
        return (
            <div className="home">
                <Header />
                <div className="container">
                    <Home />
                    <div className="col-md-4 home-login">
                        <div >
                            <p className="text-center"><i className="fa fa-user-circle user" /></p>
                            <h1 className="text-center">User Registration </h1>
                            <form method="post" className="login" onSubmit={this.handleRegister}>
                                <ToastContainer hideProgressBar={true} />
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                    <input type="text" required onChange={this.onChangeInputs} name="username" className="form-control" placeholder="Enter Username" />
                                </div>
                                <br />
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                    <input type="text" required onChange={this.onChangeInputs} name="email" className="form-control" placeholder="Enter Email" />
                                </div>
                                <br />
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                                    <input type="text" required onChange={this.onChangeInputs} name="password" className="form-control" placeholder="Enter Password" />
                                </div>
                                <br />
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                                    <input type="text" required onChange={this.onChangeInputs} name="confirm" className="form-control" placeholder="Confirm Password" />
                                </div>
                                <br />
                                <input type="submit" value="Submit" className="btn col-md-5 btn-primary" />
                                <input type="reset" value="Cancel" className="btn col-md-5 btn-danger pull-right" />
                                <br />
                            </form>
                            <p className="text-center">Have an account already? <Link to={`/`} className="btn-link">Click here to Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}
export default Register