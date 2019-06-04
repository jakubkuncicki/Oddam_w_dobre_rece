import React from 'react';
import Contact from "../components/Contact/Contact";
import {scroller} from "react-scroll/modules";
import {withRouter, Redirect} from "react-router-dom";
import FormGiveHeader from "./FormGiveHeader";
import {FormGivePage} from "./FormGivePage";
import {Gift} from "../services/usersData.service";

class FormGive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            goToStartPage: false,
            sectionName: '',
        };
        this.user = {};
        this.gift = new Gift();
    }

    scrollTo = (name) => {
        if(['fourSteps','about','institutions'].indexOf(name) !== -1){
            // this.props.history.push('/start/' + name);
            this.setState({
                goToStartPage: true,
                sectionName: name,
            });
            // return <Redirect to={{pathname: '/start/' + name, state: {user: this.user}}}/>;
        } else {
            this.props.history.push('/form/' + name);
        }
        scroller.scrollTo(name, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });

    };

    render() {

        if(this.state.goToStartPage) {
            return <Redirect to={{pathname: '/start/' + this.state.sectionName, state: {user: this.user}}}/>;
        }

        this.user = this.props.location.state !== undefined ? this.props.location.state.user : this.user;

        return (
            <div>
                <FormGiveHeader scrollTo={this.scrollTo} logged={true} user={this.user}/>
                <FormGivePage pageNumber={this.state.pageNumber} user={this.user} gift={this.gift}/>
                <Contact/>
            </div>
        );
    }
}

export default withRouter(FormGive);