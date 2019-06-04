import React from 'react';
import {scroller} from "react-scroll/modules";
import { withRouter } from "react-router-dom";

import Header from "../components/Header/Header";
import Stats from "../components/Stats/Stats";
import FourSteps from "../components/FourSteps/FourSteps";
import About from "../components/About/About";
import Institutions from "../components/Institutions/Institutions";
import Contact from "../components/Contact/Contact";

class LandingPage extends React.Component {

    scrollTo = (name) => {

        this.props.history.push(name);

        scroller.scrollTo(name, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });

        console.log(this.props.history);
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
        return '/';

    };

    componentDidMount() {
        scroller.scrollTo(this.nameFromPath(this.props.history.location.pathname), {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    }

    render() {
        return (
            <div>
                <Header scrollTo={this.scrollTo} logged={false}/>
                <Stats/>
                <FourSteps logged={false}/>
                <About/>
                <Institutions/>
                <Contact/>
            </div>
        );
    }
}

export default withRouter(LandingPage);