import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterHeader = () => {
    return (
        <h2 className="text-center">User Registration</h2>
    );
}

class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:'',
            confirm: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.onChangeInputs = this.onChangeInputs.bind(this)
    }

    handleRegister=(e)=>{
        e.preventDefault();
        let RegisterData = new FormData();
        RegisterData.set("username", this.state.username);
        RegisterData.set("email", this.state.email);
        RegisterData.set("password", this.state.password);
        RegisterData.set("confirm", this.state.confirm);
        
        axios.post('/register', RegisterData,{
            headers:{'Content-type': 'application/x-www-form-urlencoded'}
        })
        .then(res => {
            console.log(res.data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error.response)
        })
    };
    onChangeInputs = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        let details = {};
        details[key] = value;
        this.setState(details);
        

    }
    render() {
        return (
            <div className="form" onSubmit={this.handleRegister}>
                <form method="post">
                    <RegisterHeader />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                        <input type="text" onChange={this.onChangeInputs} name="username" className="form-control" placeholder="Enter Username"/>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                        <input type="text" onChange={this.onChangeInputs} name="email" className="form-control" placeholder="Enter Email"/>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                        <input type="text" onChange={this.onChangeInputs} name="password" className="form-control" placeholder="Enter Password"/>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                        <input type="text" onChange={this.onChangeInputs} name="confirm" className="form-control" placeholder="Confirm Password" />
                    </div>
                    <br />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    <input type="reset" value="Cancel" className="btn btn-danger pull-right" />
                    <br />
                </form>
                <p className="text-center">Have an account already? <Link to={`/`} className="btn-link">Click here to Login</Link></p>
            </div>
        
        );

    }
}
export default Register