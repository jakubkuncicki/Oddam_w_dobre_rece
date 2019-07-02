import React from 'react';
import {scroller} from "react-scroll/modules";

import Header from "../../components/Header/Header";
import Stats from "../../components/Stats/Stats";
import FourSteps from "../../components/FourSteps/FourSteps";
import About from "../../components/About/About";
import Institutions from "../../components/Institutions/Institutions";
import Contact from "../../components/Contact/Contact";
import {withRouter} from "react-router-dom";
import {Redirect} from "react-router-dom";
// import {UsersData} from "../services/usersData.service";
// import {Redirect} from "react-router-dom";

class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            sectionName: '',
        };
    }


    scrollTo = (name) => {
        // this.props.history.push('/start/' + name);
        //
        // scroller.scrollTo(name, {
        //     duration: 800,
        //     delay: 0,
        //     smooth: 'easeInOutQuart'
        // });

        this.setState({
            sectionName: name,
        });

    };

    nameFromPath = (path) => {
        if(path.indexOf('welcome') !== -1) {
            return 'welcome';
        }
        if(path.indexOf('fourSteps') !== -1) {
            return 'fourSteps';
        }
        if(path.indexOf('about') !== -1) {
            return 'about';
        }
        if(path.indexOf('institutions') !== -1) {
            return 'institutions';
        }
        if(path.indexOf('contact') !== -1) {
            return 'contact';
        }
        return 'welcome';

    };

    componentDidMount() {
        //
        // UsersData.instance.getCurrentUser().then((user) => {
        //
        //     this.setState({
        //         user,
        //     })
        // });

        scroller.scrollTo(this.nameFromPath(this.props.history.location.pathname), {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    }

    render() {

        // if(!this.state.user) {
        //     return <Redirect to='/'/>;
        // }

        if(this.state.sectionName !== '') {
            return <Redirect to={{pathname: '/start/' + this.state.sectionName, state: {from: this.props.location}}}/>
        }

        return (
            <div>
                <Header scrollTo={this.scrollTo}/>
                <Stats/>
                <FourSteps logged={true}/>
                <About/>
                <Institutions/>
                <Contact/>
            </div>
        );
    }
}

export default withRouter(StartPage);