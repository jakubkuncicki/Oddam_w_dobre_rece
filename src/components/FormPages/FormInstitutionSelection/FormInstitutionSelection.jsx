import React from 'react';
import './FormInstitutionSelection.scss';
import {UsersData} from "../../../services/usersData.service";
import {Institution, InstitutionsData} from "../../../services/institutions.service";

export class FormInstitutionSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            firstPaginationNumber: 1,
            lastPaginationNumber: 3,
            institutionChecked: [],
            institutions: [],
            selectedInstitution: null,
            errorMessage: false,
            nextErrorMessage: false,
        };

        this.usersData = UsersData.instance;
        this.institutionsData = InstitutionsData.instance;
    };

    handleCheckboxChange = (e) => {

        if(this.state.errorMessage || this.state.nextErrorMessage) {
            this.setState({
                errorMessage: false,
                nextErrorMessage: false,
            });
        }

        let institutionChecked = [...this.state.institutionChecked];
        const institutions = this.state.institutions;

        if(institutionChecked[Number(e.target.value)]) {

            institutionChecked[Number(e.target.value)] = false;

        } else {

            for (let i = 0; i < institutions.length; i++) {

                institutionChecked[i] = (i === Number(e.target.value));
                if(institutionChecked[i]) {
                    this.setState({
                        selectedInstitution: {...institutions[i]},
                    });
                }
            }
        }

        this.setState({
            institutionChecked,
        });
    };

    hasCommonWord = (firstString, secondString) => {

        if(firstString === '' || secondString === '') {
            return false;
        }

        const tab = firstString.split(', ');

        for(let i = 0; i < tab.length; i++) {
            if(secondString.indexOf(tab[i]) !== -1) {
                return true;
            }
        }

        return false;
    };

    searchInstitutions = () => {

        return Promise.resolve(this.usersData.getCurrentGift().then((gift) => {

            const name = gift.institution.name.toLowerCase();

            let institutionsToShow = [];

            const institutionsToSearch = [];

            return Promise.resolve(this.institutionsData.getAllInstitutions().then((institutions) => {

                for(let j = 0; j < institutions.length; j++) {

                    for(let k = 0; k < institutions[j].collectedThings.length; k++) {

                        if(gift.giftType.indexOf(institutions[j].collectedThings[k]) !== -1) {

                            institutionsToSearch.push(institutions[j]);
                            break;
                        }
                    }

                }

                return institutionsToSearch;

            }).then((institutionsToSearch) => {

                let institutions = institutionsToSearch;

                for(let i = 0; i < institutions.length; i++) {

                    let wasPushed = false;

                    if(name !== '') {

                        if(name === institutions[i].name.toLowerCase()) {

                            institutionsToShow = [institutions[i]];
                            return institutionsToShow;

                        }

                        let keyWords = institutions[i].keyWords;

                        for (let k = 0; k < keyWords.length; k++) {

                            if (name.indexOf(keyWords[k]) !== -1) {

                                institutionsToShow.push(institutions[i]);
                                wasPushed = true;
                                break;
                            }
                        }
                    }

                    if(!wasPushed) {

                        if(gift.institution.localization === '' || gift.institution.proteges === '') {

                            if(institutions[i].localization === gift.institution.localization
                                || this.hasCommonWord(institutions[i].proteges, gift.institution.proteges)) {

                                institutionsToShow.push(institutions[i]);
                            }
                        } else if(institutions[i].localization === gift.institution.localization
                            && this.hasCommonWord(institutions[i].proteges, gift.institution.proteges)) {

                            institutionsToShow.push(institutions[i]);
                        }
                    }
                }

                if(institutionsToShow.length === 0) {

                    if(name !== '' || gift.institution.localization !== '' || gift.institution.proteges !== '') {

                        this.setState({
                            errorMessage: true,
                        });
                    }

                    institutionsToShow = institutions;
                }

                return institutionsToShow;

            }));

        }));

    };

    componentDidMount() {

        this.searchInstitutions().then((institutions) => {

            let institutionChecked = [];
            for(let i = 0; i < institutions.length; i++) {
                institutionChecked.push(false);
            }

            this.setState({
                institutions,
                institutionChecked,
                selectedInstitution: new Institution('','','','',''),
            });
        });



    }

    makePagination = (element, index, array) => {

        const pN = this.state.pageNumber;
        const lastPage = array.length;
        let min = 0, max = 0;

        if(pN === 1) {
            min = 1;
            max = 3;
        } else if(pN === lastPage) {
            min = lastPage - 2;
            max = lastPage;
        } else {
            min = this.state.firstPaginationNumber;
            max = this.state.lastPaginationNumber;
        }

        return (Number(element.key) >= min && Number(element.key ) <= max);
    };

    changePage = (newPageNumber, firstPaginationNumber) => {

        this.setState({
            pageNumber: newPageNumber,
            firstPaginationNumber,
            lastPaginationNumber: firstPaginationNumber + 2,
        });
    };

    makeFpN = (direction) => {
        if(direction === - 1) {
            if(this.state.pageNumber > this.state.firstPaginationNumber) {
                return this.state.firstPaginationNumber;
            }
            return Math.max(1, this.state.firstPaginationNumber - 2);
        }

        if(direction === 1) {
            if(this.state.pageNumber < this.state.lastPaginationNumber) {
                return this.state.lastPaginationNumber - 2;
            }
            return Math.min(Math.ceil(this.state.institutions.length/2) - 2, this.state.lastPaginationNumber);
        }
    };

    changeFormPage = (nextOrPrevious) => {

        if(nextOrPrevious === 'next') {

            let institutionIsSelected = false;

            for(let i = 0; i < this.state.institutionChecked.length; i++) {
                if(this.state.institutionChecked[i]) {
                    institutionIsSelected = true;
                    break;
                }
            }

            if(!institutionIsSelected) {
                this.setState({
                    errorMessage: false,
                    nextErrorMessage: true,
                });
                return;
            }
        }

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                gift.institution = {...this.state.selectedInstitution};

                this.usersData.savePartialGift(gift).then(() => {});
            }

        }).then(() => {

            if (typeof this.props.changePage === 'function') {
                this.props.changePage(nextOrPrevious);
            }

        });

    };

    render() {

        const pageNumber = this.state.pageNumber;

        let tab = [];

        for(let i = 0; i < this.state.institutions.length; i++) {
            tab.push({...this.state.institutions[i]});
        }

        let institutionsElements = tab.map((institution, index) => {
            return (
                <div key={institution.name} className='FormInstitutionSelection__form__container'>
                    <div className='FormInstitutionSelection__form__container__checkbox'>
                        <input type='checkbox' id={institution.name} name={institution.name} value={index}
                               checked={this.state.institutionChecked[index]}
                               onChange={this.handleCheckboxChange}/>
                        <label className='to-style-label' htmlFor={institution.name}></label>
                    </div>
                    <label className='real-label' htmlFor={institution.name}>
                        <h3 className='real-label__name'>{institution.name}</h3>
                        <p className='real-label__goal'>{institution.goal}</p>
                    </label>
                </div>
            );
        });

        institutionsElements = institutionsElements.filter((institution, index) => {
            return (index === 2 * pageNumber - 1 || index === 2 * pageNumber - 2);
        });

        const institutionsNumber = this.state.institutions.length;
        let pagination = [];
        const numberOfPages = Math.ceil(institutionsNumber/2);
        if(institutionsNumber <= 2) {
            pagination = null;
        } else {
            for(let i = 0; i < numberOfPages; i++) {
                pagination.push(<span key={i+1} onClick={() => this.changePage(i+1, this.state.firstPaginationNumber)}
                                      className={'pagination-number' + ((pageNumber === i+1) ? ' active' : '')}>{i+1}</span>);
            }

            pagination = pagination.filter(this.makePagination);
            pagination.sort((a,b) => Number(a.key) - Number(b.key));
        }

        const fPn = this.state.firstPaginationNumber;
        const lPn = this.state.lastPaginationNumber;

        return (
            <div className='FormInstitutionSelection'>
                <div className='FormInstitutionSelection__info-bar'>
                    <h1 className='FormInstitutionSelection__info-bar__text'>Ważne!</h1>
                    <p className='FormInstitutionSelection__info-bar__text'>Na podstawie Twoich kryteriów oraz rzeczy, które masz do oddania wybraliśmy organizacje, którym możesz pomóc. Wybierz jedną, do której trafi Twoja przesyłka.</p>
                </div>
                <p className='FormInstitutionSelection__step'>Krok 3/4</p>
                <p className='error'>{this.state.errorMessage &&
                    'Niestety żadna organizacja nie spełnia Twoich kryteriów. Oto pełna lista organizacji, którym możesz oddać wybrane przez Ciebie rzeczy.'}
                    {this.state.nextErrorMessage &&
                        'Musisz wybrać organizację. Zaznacz jedną z listy poniżej.'}</p>
                <h1 className='FormInstitutionSelection__form-header'>Wybierz organizację, której chcesz pomóc:</h1>
                <div className='FormInstitutionSelection__line'></div>
                <form className='FormInstitutionSelection__form'>
                    {institutionsElements}
                    <div className='FormInstitutionSelection__form__pagination'>

                        {(this.state.firstPaginationNumber > 1) &&
                            <span className='to-begining'>
                                <i onClick={() => this.changePage(1, 1, 3)}
                                   className="fas fa-arrow-left"/>
                            </span>}

                        {(this.state.firstPaginationNumber  > 2) &&
                            <span className='double-left'>
                                <i onClick={() => this.changePage(pageNumber - 1, this.makeFpN(-1))}
                                   className="fas fa-angle-double-left"/>
                            </span>}

                        {(this.state.firstPaginationNumber > 1) &&
                            <span onClick={() => this.changePage(fPn - 1, fPn - 1)}>...</span>}

                        {pagination}

                        {(this.state.lastPaginationNumber < numberOfPages) &&
                            <span onClick={() => this.changePage(lPn + 1, lPn - 1)}>...</span>}

                        {(this.state.lastPaginationNumber < numberOfPages - 1) &&
                            <span className='double-right'>
                                <i onClick={() => this.changePage(pageNumber + 1, this.makeFpN(1))}
                                   className="fas fa-angle-double-right"/>
                            </span>}

                        {(this.state.lastPaginationNumber < numberOfPages) &&
                            <span className='to-end'>
                                <i onClick={() => this.changePage(numberOfPages, numberOfPages - 2)}
                                   className="fas fa-arrow-right"/>
                            </span>}

                    </div>
                    <div className='FormInstitutionSelection__form__btns'>
                        <button type='button' onClick={() => this.changeFormPage('previous')}>Wstecz</button>
                        <input type='button' value='Dalej' onClick={() => this.changeFormPage('next')}/>
                    </div>
                </form>
            </div>
        );
    }
}