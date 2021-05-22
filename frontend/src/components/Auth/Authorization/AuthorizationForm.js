import React from "react";
import { RegAuthLinks } from "../AuthRegLinks/Links";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { login } from "../../../actions/auth";


export class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
            }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch, history } = this.props;
        dispatch(login(this.state.username, this.state.password))
            .then(() => {
                history.push('/rooms');
                window.location.reload();
            })
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/rooms" />;
        }

        return (
            <div className="row justify-content-center">
                <div className="row">
                    <div className="col-form-label">
                        <form className="form-horizontal">
                            <h2>Authorization</h2>
                            <div className="form-group">
                                <input type="text" className="form-control"  placeholder="Login"
                                       name="login"
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
                                    Log in
                                </button>
                            </div>
                            <RegAuthLinks />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(AuthForm)


