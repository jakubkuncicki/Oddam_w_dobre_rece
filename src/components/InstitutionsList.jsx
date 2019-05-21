import React from 'react';
import '../components/InstitutionsList.scss';
import localforage from 'localforage';

const fundations = [];
fundations.push({name: 'Fundacja  “Dbam o Zdrowie”', goal: 'Cel i misja: Pomoc osobom znajdującym się w trudnej sytuacji życiowej.',
description: 'ubrania, jedzenie, sprzęt AGD, meble, zabawki'});
fundations.push({name: 'Fundacja  “Dla dzieci”', goal: 'Cel i misja: Pomoc zieciom z ubogich rodzin.', description: 'ubrania, meble, zabawki'});
fundations.push({name: 'Fundacja  “Bez domu” ', goal: 'Cel i misja: Pomoc dla osób nie posiadających miejsca zamieszkania', description: 'ubrania, jedzenie, ciepłe koce'});
fundations.push({name: 'Fundacja A', goal: 'Cel i misja: A', description: 'opis A'});
fundations.push({name: 'Fundacja B', goal: 'Cel i misja: B', description: 'opis B'});
fundations.push({name: 'Fundacja C', goal: 'Cel i misja: C', description: 'opis C'});
fundations.push({name: 'Fundacja D', goal: 'Cel i misja: D', description: 'opis D'});
fundations.push({name: 'Fundacja E', goal: 'Cel i misja: E', description: 'opis E'});

const organizations = [];
organizations.push({name: 'Organizacja A', goal: 'Cel i misja: A', description: 'opis A'});
organizations.push({name: 'Organizacja B', goal: 'Cel i misja: B', description: 'opis B'});
organizations.push({name: 'Organizacja C', goal: 'Cel i misja: C', description: 'opis C'});
organizations.push({name: 'Organizacja D', goal: 'Cel i misja: D', description: 'opis D'});

const collections = [];
collections.push({name: 'Zbiórka A', goal: 'Cel i misja: A', description: 'opis A'});
collections.push({name: 'Zbiórka B', goal: 'Cel i misja: B', description: 'opis B'});

localforage.setItem('fundations', fundations).then((value) => console.log(value));
localforage.setItem('organizations', organizations).then((value) => console.log(value));
localforage.setItem('collections', collections).then((value) => console.log(value));

localforage.config();
// localforage.config({
//     driver: [localforage.WEBSQL,
//         localforage.INDEXEDDB,
//         localforage.LOCALSTORAGE],
//     name: 'WebSQL-Rox'
// });

class InstitutionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    changePage = (number) => {
        this.setState({
            pageNumber: number,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.institutions !== this.props.institutions) {
            this.setState({
                pageNumber: 1,
            });
        }
    }

    render() {
        let institutions = this.props.institutions;
        let pagesNumber = Math.ceil(institutions.length / 3);

        let tab = [];

        for(let i = 0; i < pagesNumber; i++) {
            tab.push(i+1);
        }

        let pages = tab.map((number) => {
            return <span key={number} onClick={() => this.changePage(number)}>{number}</span>;
        });

        let institutionsElements = [];

        for(let i = 3*(this.state.pageNumber - 1); i < Math.min(3*(this.state.pageNumber - 1) + 3, institutions.length); i++) {
            institutionsElements.push(
                <div key={i} className='institutionRow'>
                    <div className='institutionName'>
                        <h3>{institutions[i].name}</h3>
                        <p>{institutions[i].goal}</p>
                        <div className='line'></div>
                    </div>
                    <div className='institutionDescription'>
                        <p>{institutions[i].description}</p>
                        <div className='line'></div>
                    </div>
                </div>
            );
        }

        return (
            <div className='institutions'>
                <div className='institutions__list'>
                    {institutionsElements}
                </div>
                <div className='pageNumbers'>
                    {pages}
                </div>
            </div>
        );
    }
}

export default InstitutionsList;