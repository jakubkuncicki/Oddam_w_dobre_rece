import React from 'react';
import {Element} from 'react-scroll';
import {auth} from "../constants/authentication";
import {withRouter} from "react-router-dom";
import './FormGiveHeader.scss';
import DecorationText from "../components/DecorationText/DecorationText";

class FormGiveHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userMenuVisible: false,
        };
    }

    showUserMenu = () => {
        this.setState({
            userMenuVisible: true,
        });
    };

    logOut = () => {
        auth.signOut();
        this.props.history.push('/');
    };

    scrollTo = (name) => {
        if(typeof this.props.scrollTo === 'function') {
            this.props.scrollTo(name);
        }
    };

    hideUserMenu = (e) => {
        if(this.state.userMenuVisible && e.target.id !== 'userMenu') {
            this.setState({
                userMenuVisible: false,
            });
        }
    };

    render() {
        return (
            <Element name='welcome'>
                <header className='FormGiveHeader' onClick={this.hideUserMenu}>
                    <nav className='nav'>
                        {!this.props.logged &&
                        <ul className='menu upperMenu'>
                            <li><button onClick={this.login} className='a'>Zaloguj</button></li>
                            <li><button onClick={this.createAccount} className='a'>Załóż konto</button></li>
                        </ul>
                        }
                        {this.props.logged &&
                        <ul className='menu upperMenu'>
                            <li className='userName'>Witaj {this.props.user.name}</li>
                            <li id='settings'>
                                <i onClick={this.showUserMenu} className="fas fa-cog"/>
                                <ul id='userMenu' className={'drop-down-menu' + (this.state.userMenuVisible ? ' active' : '')}>
                                    <li className='drop-down-menu__item'>Profil</li>
                                    <li className='drop-down-menu__item'>Ustawienia</li>
                                    <li className='drop-down-menu__item'>Moje zbiórki</li>
                                    <li onClick={this.logOut} className='drop-down-menu__item'>Wyloguj</li>
                                </ul>
                            </li>
                        </ul>
                        }
                        <ul className='menu'>
                            <li><button className='a' onClick={() => this.scrollTo('welcome')}>Start</button></li>
                            <li><button className='a' onClick={() => this.scrollTo('fourSteps')}>O co chodzi?</button></li>
                            <li><button className='a' onClick={() => this.scrollTo('about')}>O nas</button></li>
                            <li><button className='a' onClick={() => this.scrollTo('institutions')}>Fundacje i organizacje</button></li>
                            <li><button className='a' onClick={() => this.scrollTo('contact')}>Kontakt</button></li>
                        </ul>
                    </nav>
                    <div className='FormGiveHeader__info-container'>
                        <DecorationText texts={['Oddaj rzeczy, których już nie chcesz', 'POTRZEBUJĄCYM']}/>
                        <h1>Wystarczą 4 proste kroki:</h1>
                        <div className='fourStepsFigure'>
                            <div className='leaningSquare'>
                                <div className='leaningSquare__container'>
                                    <span>1</span>
                                    <span>Wybierz rzeczy</span>
                                </div>
                            </div>
                            <div className='leaningSquare'>
                                <div className='leaningSquare__container'>
                                    <span>2</span>
                                    <span>Spakuj je w worki</span>
                                </div>
                            </div>
                            <div className='leaningSquare'>
                                <div className='leaningSquare__container'>
                                    <span>3</span>
                                    <span>Wybierz fundację</span>
                                </div>
                            </div>
                            <div className='leaningSquare'>
                                <div className='leaningSquare__container'>
                                    <span>4</span>
                                    <span>Zamów Kuriera</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </Element>
        );
    }
}

export default withRouter(FormGiveHeader);