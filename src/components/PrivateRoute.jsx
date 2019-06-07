import {Route,Redirect} from "react-router-dom";
import React from 'react';
import { UsersData } from "../services/usersData.service";

export class PrivateRoute extends React.Component {
    constructor({ component: Component, ...routeProps }) {
        super(routeProps);

        this.Component = Component;
        this.routeProps = routeProps;
        this.usersData = UsersData.instance;

        this.state = {
            userChecked: false,
            user: null,
        };
    }

    componentDidMount() {
        this.usersData.getCurrentUser().then((user) => {
            this.setState({
                userChecked: true,
                user,
            });
        });
    }

    render() {
        const renderContent = props =>  (!this.state.userChecked || (this.state.userChecked && this.state.user)) ? (
            <this.Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
            />
        );

        return (
            <Route
                { ...this.routeProps }
                render = { renderContent }
            />
        );
    }
}
