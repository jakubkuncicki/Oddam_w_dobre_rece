import {Route,Redirect} from "react-router-dom";
import React from 'react';
import {auth} from "../constants/authentication";

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props =>
                auth.isLogged ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}