import React from 'react';
import {Element} from 'react-scroll';

import InstitutionsList from '../InstitutionsList/InstitutionsList';
import DecorationText from "../DecorationText/DecorationText";
import { InstitutionsData } from "../../services/institutions.service";

import './Institutions.scss';

class Institutions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionType: 'foundations',
            institutionsTab: [],
        };
    }

    componentDidMount() {

        InstitutionsData.instance.getInstitutions(this.state.institutionType).then( (value) => {
            this.setState({
                institutionsTab: value,
            });
        }).catch((err) => console.log(err));
    }

    changeInstitutionType = (e) => {

        document.getElementById(this.state.institutionType).classList.remove('active');
        e.target.classList.add('active');

        const institutionsType = e.target.id;

        InstitutionsData.instance.getInstitutions(institutionsType).then( (value) => {

            this.setState({
                institutionType: institutionsType,
                institutionsTab: value
            });

        }).catch((err) => console.log(err));

    };

    render() {
        return (
            <Element name='institutions'>
            <section className='institutionsBg'>
                <DecorationText texts={['Komu pomagamy?']}/>
                <ul>
                    <li id="foundations" onClick={this.changeInstitutionType} className='active'>Fundacjom</li>
                    <li id="organizations" onClick={this.changeInstitutionType}>Organizacjom pozarządowym</li>
                    <li id="collections" onClick={this.changeInstitutionType}>Lokalnym zbiórkom</li>
                </ul>
                <p>
                    W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi współpracujemy. Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.
                </p>
                <InstitutionsList institutions={this.state.institutionsTab}/>
            </section>
            </Element>
        );
    }
}

export default Institutions;