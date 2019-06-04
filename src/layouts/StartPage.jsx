import React from 'react';
import {scroller} from "react-scroll/modules";

import Header from "../components/Header/Header";
import Stats from "../components/Stats/Stats";
import FourSteps from "../components/FourSteps/FourSteps";
import About from "../components/About/About";
import Institutions from "../components/Institutions/Institutions";
import Contact from "../components/Contact/Contact";
import {withRouter} from "react-router-dom";

class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.user = {};
    }

    scrollTo = (name) => {
        this.props.history.push('/start/' + name);

        scroller.scrollTo(name, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
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

        scroller.scrollTo(this.nameFromPath(this.props.history.location.pathname), {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    }

    render() {
        this.user = this.props.location.state !== undefined ? this.props.location.state.user : this.user;
        return (
            <div>
                <Header scrollTo={this.scrollTo} logged={true} user={this.user}/>
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