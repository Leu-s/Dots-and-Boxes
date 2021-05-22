import React, {useState} from "react";
import styles from './RegForm.module.scss';
import {RegAuthLinks} from "../AuthRegLinks/Links";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { register } from "../../../actions/auth";
import { connect } from "react-redux";

import { AuthForm } from "../Authorization/AuthorizationForm";


const Success = (props) => {
    return (
        <div className="alert alert-success" role="alert">
            {props.message}
        </div>
    )
}

const Alert = (props) => {
    return (
        <div className="alert alert-warning" role="alert">
            {props.message}
        </div>
    )
}


export class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username: '',
            password: '',
            messages : {
                clear: true,
                usernameMessage: [],
                passwordMessage: [],
            },
            registered: false,
        }
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
                [name]: value
            }
        );

        axios.get('http://localhost:5000/api/reg', {
            params: {
                [name]: value,
            }
        })
            .then((request) => {
                let message = [];
                if (name === "username") {
                    if (request.data['username_db'] === true) {
                        message.push('This user name is already in use')
                    }
                    if (request.data['username'] === false) {
                        message.push('Username is not correct')
                    }

                    if (message) {
                        this.setState({messages: {usernameMessage: message, clear: false}})
                    } else {
                        this.setState({messages: {usernameMessage: [], clear: false}})
                    }

                } else {
                    if (request.data['password'] === false) {
                        message.push('Password is not correct (6-24+A-z+0-9)')
                        this.setState({messages: {passwordMessage: message, clear: false}})
                    } else {
                        this.setState({messages: {passwordMessage: []}})
                    }
                }

                if (message.length === 0) {
                    this.setState({messages: {clear: true}})
                    console.log(this.state.messages.clear)
                }
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.dispatch)
        this.setState({registered: false})
        if (this.state.messages.clear && this.state.username && this.state.password){
            console.log('qweqwe')
            this.props
                .dispatch(
                    register(this.state.username, this.state.password)
                )
                .then(() => {
                    this.setState({registered: true});
                })
                .catch(() => {
                    this.setState({registered: false});
                });
        }

        // event.preventDefault();
        // const json = JSON.stringify({username: this.state.username ,password: this.state.password})
        // this.setState({redirect: true})
        // axios.post('http://localhost:5000/api/reg', json)
        //     .then((res)=> {
        //         if (res.data['result'] === true){
        //             this.setState({registered: true})
        //         }
        //     })
    }

    render() {
        const { registered } = this.state;

        if (registered) {
            // return <Redirect to="/auth/login" />
            return (
                <div>
                    <Success message="User was registered successfully" />
                    <AuthForm />
                </div>
            )
        }

        return (
            <div className="row justify-content-center">
                <div className="row">
                    <div className="col-form-label">

                        { this.state.messages.usernameMessage ?
                            this.state.messages.usernameMessage.map((msg) => {
                                return <Alert key={Math.random() * 5} message={msg}/>}): <div/>
                        }
                        { this.state.messages.passwordMessage ?
                            this.state.messages.passwordMessage.map((msg) => {
                                return <Alert key={Math.random() * 5} message={msg}/>}): <div/>
                        }

                        <form className="form-horizontal">
                            <h2>Registration</h2>

                            <div className="form-group">
                                <input type="text" className="form-control"  placeholder="Login"
                                       name="username"
                                       onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group help">
                                <input type="password" className="form-control" placeholder="Password"
                                       name="password"
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary"
                                        onClick={this.handleSubmit}>
                                    Sing in
                                </button>
                            </div>
                            <RegAuthLinks />
                        </form>
                    </div>

                </div>

            </div>
        )
    };
}



function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(RegForm);


