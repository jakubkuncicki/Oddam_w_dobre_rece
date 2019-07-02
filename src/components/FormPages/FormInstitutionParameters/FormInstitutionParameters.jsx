import React from 'react';
import './FormInstitutionParameters.scss';
import {UsersData} from "../../../services/usersData.service";

export class FormInstitutionParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localization: '',
            proteges: '',
            name: '',
            children: false,
            singleMothers: false,
            homeless: false,
            elderly: false,
            disabled: false,
        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        this.usersData.getCurrentGift().then((gift) => {
            if(gift) {

                const {name, localization, proteges} = gift.institution;

                this.setState({
                    localization,
                    proteges,
                    name,
                    children: (proteges.indexOf('children') !== -1),
                    singleMothers: (proteges.indexOf('singleMothers') !== -1),
                    homeless: (proteges.indexOf('homeless') !== -1),
                    elderly: (proteges.indexOf('elderly') !== -1),
                    disabled: (proteges.indexOf('disabled') !== -1),
                });
            }
        });
    }

    handleSelectChange = (e) => {
        this.setState({
            localization: e.target.value,
        });
    };

    handleInputChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    makeProtegesString = () => {
        const protegesNames = ['children', 'singleMothers', 'homeless', 'elderly', 'disabled'];
        const {children, singleMothers, homeless, elderly, disabled} = this.state;
        const isProteges = [children, singleMothers, homeless, elderly, disabled];
        const protegesTab = protegesNames.filter( (name,index) => isProteges[index] );
        return protegesTab.join(', ');
    };

    selectProteges = (protegesName) => {

        const {children, singleMothers, homeless, elderly, disabled} = this.state;

        switch (protegesName) {
            case 'children':
                this.setState({
                    children: !children,
                }, () => {
                    this.setState({
                        proteges: this.makeProtegesString(),
                    });
                });
                break;
            case 'singleMothers':
                this.setState({
                    singleMothers: !singleMothers,
                }, () => {
                    this.setState({
                        proteges: this.makeProtegesString(),
                    });
                });
                break;
            case 'homeless':
                this.setState({
                    homeless: !homeless,
                }, () => {
                    this.setState({
                        proteges: this.makeProtegesString(),
                    });
                });
                break;
            case 'elderly':
                this.setState({
                    elderly: !elderly,
                }, () => {
                    this.setState({
                        proteges: this.makeProtegesString(),
                    });
                });
                break;
            case 'disabled':
                this.setState({
                    disabled: !disabled,
                }, () => {
                    this.setState({
                        proteges: this.makeProtegesString(),
                    });
                });
                break;
            default :
                this.setState({
                    children,
                    singleMothers,
                    homeless,
                    elderly,
                    disabled,
                });
        }

    };

    changePage = (nextOrPrevious) => {

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                gift.institution.localization = this.state.localization;
                gift.institution.proteges = this.state.proteges;
                gift.institution.name = this.state.name;

                this.usersData.savePartialGift(gift);
            }

        }).then(() => {

            if (typeof this.props.changePage === 'function') {
                this.props.changePage(nextOrPrevious);
            }

        });

    };

    render() {
        return (
            <div className='FormInstitutionParameters'>
                <div className='FormInstitutionParameters__info-bar'>
                    <h1 className='FormInstitutionParameters__info-bar_text'>Ważne!</h1>
                    <p className='FormInstitutionParameters__info-bar_text'>Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę tej organizacji w wyszukiwarce. Możesz też filtrować organizacje
                        po ich lokalizacji bądź celu ich pomocy.</p>
                </div>
                <p className='FormInstitutionParameters__step'>Krok 3/4</p>
                <h1 className='FormInstitutionParameters__form-header'>Lokalizacja:</h1>
                <form name='institution-parameters' className='institution-parameters'>
                    <select name='localization' onChange={this.handleSelectChange} value={this.state.localization}>
                        <option value=''>- wybierz -</option>
                        <option value='Gdańsk'>Gdańsk</option>
                        <option value='Kraków'>Kraków</option>
                        <option value='Poznań'>Poznań</option>
                        <option value='Warszawa'>Warszawa</option>
                        <option value='Wrocław'>Wrocław</option>
                    </select>
                    <p className='institution-parameters__header'>Komu chcesz pomóc?</p>
                    <div className='institution-parameters__proteges'>
                        <button
                            type='button' className={'institution-parameters__proteges_btn' + (this.state.children ? ' active' : '')}
                            onClick={() => this.selectProteges('children')}
                        >dzieciom</button>
                        <button
                            type='button' className={'institution-parameters__proteges_btn' + (this.state.singleMothers ? ' active' : '')}
                            onClick={() => this.selectProteges('singleMothers')}
                        >samotnym matkom</button>
                        <button
                            type='button' className={'institution-parameters__proteges_btn' + (this.state.homeless ? ' active' : '')}
                            onClick={() => this.selectProteges('homeless')}
                        >bezdomnym</button>
                        <button
                            type='button' className={'institution-parameters__proteges_btn' + (this.state.disabled ? ' active' : '')}
                            onClick={() => this.selectProteges('disabled')}
                        >niepełnosprawnym</button>
                        <button
                            type='button' className={'institution-parameters__proteges_btn' + (this.state.elderly ? ' active' : '')}
                            onClick={() => this.selectProteges('elderly')}
                        >osobom starszym</button>
                    </div>
                    <p className='institution-parameters__header'>Wpisz nazwę konkretnej organizacji (opcjonalnie)</p>
                    <input type='text' name='institution-name' value={this.state.name} onChange={this.handleInputChange}/>
                    <div className='institution-parameters__btns'>
                        <button type='button' onClick={() => this.changePage('previous')}>Wstecz</button>
                        <input type='button' value='Szukaj' onClick={() => this.changePage('next')}/>
                    </div>
                </form>
            </div>
        );
    }
}