import React from "react";
import './App.css';
import { renderRoutes } from "react-router-config";
import { routes } from "./routes";
import { Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers/history"
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/messages";
import {RoomList} from "./components/Rooms/Rooms";
import {AuthForm} from "./components/Auth/Authorization/AuthorizationForm";
import {RegForm} from "./components/Auth/Registration/RegistrationForm";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser: undefined
        };
        history.listen((location) => {
            props.dispatch(clearMessage())
        })
    }

    componentDidMount() {
        const user = this.props.user;
        if (user) {
            this.setState({
                currentUser: user,
            })
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={['/', '/rooms']} component={RoomList} />
                    <Route exact path="/login" component={AuthForm} />
                    <Route exact path="/reg" component={RegForm} />
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    }
}

export default connect(mapStateToProps)(App);
