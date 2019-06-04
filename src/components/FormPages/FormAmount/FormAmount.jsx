import React from 'react';
import {auth} from "../../../constants/authentication";

export class FormAmount extends React.Component {

    componentWillUnmount() {
        auth.signOut();
    }

    render() {
        return (
            <div className='FormAmount'>
                FormAmount
            </div>
        );
    }
}