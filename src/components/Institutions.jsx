import React from 'react';
import InstitutionsList from '../components/InstitutionsList';
import '../components/Institutions.scss';
import DecorationText from "./DecorationText";
import localforage from 'localforage';

class Institutions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            institutionType: 'fundations',
            institutionsTab: [],
        };
    }

    componentDidMount() {
        localforage.getItem(this.state.institutionType).then( (value) => {
            this.setState({
                institutionsTab: value,
            });
        }).catch((err) => console.log(err));
    }

    changeInstitutionType = (e) => {
        if(e.target.innerText === 'Fundacjom') {

            localforage.getItem('fundations').then( (value) => {
                this.setState({
                    institutionType: 'fundations',
                    institutionsTab: value,
                });
            }).catch((err) => console.log(err));

        } else if(e.target.innerText === 'Organizacjom pozarządowym') {

            localforage.getItem('organizations').then( (value) => {
                this.setState({
                    institutionType: 'organizations',
                    institutionsTab: value,
                });
            }).catch((err) => console.log(err));

        } else {

            localforage.getItem('collections').then( (value) => {
                this.setState({
                    institutionType: 'collections',
                    institutionsTab: value,
                });
            }).catch((err) => console.log(err));

        }
    };

    render() {
        return (
            <section className='institutionsBg'>
                <DecorationText text1='Komu pomagamy?' text2=''/>
                <ul>
                    <li onClick={this.changeInstitutionType}>Fundacjom</li>
                    <li onClick={this.changeInstitutionType}>Organizacjom pozarządowym</li>
                    <li onClick={this.changeInstitutionType}>Lokalnym zbiórkom</li>
                </ul>
                <p>
                    W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi współpracujemy. Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.
                </p>
                <InstitutionsList institutions={this.state.institutionsTab}/>
            </section>
        );
    }
}

export default Institutions;