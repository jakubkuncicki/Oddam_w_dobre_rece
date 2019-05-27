import React from 'react';

import Header from './components/Header/Header';
import Stats from "./components/Stats/Stats";
import FourSteps from "./components/FourSteps/FourSteps";
import About from "./components/About/About";
import Institutions from "./components/Institutions/Institutions";
import Contact from "./components/Contact/Contact";
import {InstitutionsData} from "./services/institutions.service";

import './App.scss';
import {Events, scroller} from "react-scroll/modules";

export const institutions = new InstitutionsData();
institutions.init();

class App extends React.Component {

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

    }

    scrollTo = (name) => {
        scroller.scrollTo(name, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div className="App">
                <Header scrollTo={this.scrollTo} name='start'/>
                <Stats/>
                <FourSteps/>
                <About/>
                <Institutions name='instSection'/>
                <Contact name='contact'/>
            </div>
        );
    }
}

export default App;
