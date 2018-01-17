import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const LoginHeader = () => {
    return (
        <h2 className="text-center">User Login</h2>
    );
}
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        // bind methods to super
        this.handleLogin = this.handleLogin.bind(this);
        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);

    }

    // create a login function and pass it to form
    handleLogin = (e)=>{
        e.preventDefault();
        const LoginData = new FormData();
        LoginData.set('email', this.state.email)
        LoginData.set('password', this.state.password)
        axios.post('/login', LoginData, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded' }
            })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem('token',"Bearer " +response.data.token)
            this.props.history.push('/dashboard')
        })
        .catch((error) => {
           console.log(error.response);
        });
    }
    onEmailChangeHandler = (e) => {
        this.setState({
            email: e.target.value,
        })
    } 
    onPassChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    } 
    render() {
        return (
            <div className="form">
                <form method="post" onSubmit={this.handleLogin}>
                    <LoginHeader />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                        <input type="email" onChange={this.onEmailChangeHandler} name="email" value={this.state.email} className="form-control" placeholder="Enter your email as username"/>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                        <input type="password" name="password" value={this.state.password} onChange={this.onPassChangeHandler} className="form-control"  placeholder="Enter password" />
                    </div>
                    <br />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    <input type="reset" value="Cancel" className="btn btn-danger pull-right" />
                    <br />
                </form>
                <p className="text-center">Have an account already? <Link to={`/register`} className="btn-link">Click here to Login</Link></p>
                
            </div> 
        );

    }
}
export default Login