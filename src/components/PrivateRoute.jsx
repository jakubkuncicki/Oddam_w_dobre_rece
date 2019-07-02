import {Route, Redirect, withRouter} from "react-router-dom";
import React from 'react';
import { UsersData } from "../services/usersData.service";
import {Loader} from "./Loader/Loader";

export class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);

        const { component: Component, ...routeProps } = props;

        this.Component = Component;
        this.routeProps = routeProps;
        this.usersData = UsersData.instance;

        this.state = {
            userChecked: false,
            user: null,
            loadingTimeIsUp: false,
        };
    }

    componentDidMount() {

        this.timeoutId = setTimeout(() => {
            this.setState({
                loadingTimeIsUp: true,
            });
        }, 2000);

        this.usersData.getCurrentUser().then((user) => {
            this.setState({
                userChecked: true,
                user,
            });
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {


        // if(this.props.location.state && this.props.location.state.from.pathname === '/login' && (!this.state.userChecked || !this.state.loadingTimeIsUp)) {
        //     return <Loader/>;
        // }
        //
        // if(!this.state.userChecked) {
        //     if(this.props.location.state && this.props.location.state.from.pathname === '/login' && !this.state.loadingTimeIsUp) {
        //         return <Loader/>;
        //     }
        //
        // }
        if(this.props.location.state && this.props.location.state.from.pathname.indexOf('/start') !== -1) {
            return <Route { ...this.routeProps } render = { props => <this.Component {...props} />} />;
        }

        if(this.props.location.state && this.props.location.state.from.pathname === '/login') {
            if(!this.state.userChecked || !this.state.loadingTimeIsUp) {
                return <Loader/>;
            }
        } else {
            if(!this.state.userChecked) {
                return <Loader/>;
            }
        }

        const renderContent = props => (this.state.userChecked && this.state.user) ? (
            <this.Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: {from: props.location}
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

export default withRouter(PrivateRoute);
