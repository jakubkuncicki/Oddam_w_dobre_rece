import React from 'react';
import {Element} from 'react-scroll/modules';
import {withRouter} from "react-router-dom";
import './FormGiveHeader.scss';
import {Redirect} from "react-router-dom";
import {UsersData} from "../../../services/usersData.service";
import DecorationText from "../../../components/DecorationText/DecorationText";

class FormGiveHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userMenuVisible: false,
            goToLandingPage: false,
        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        this.usersData.getCurrentUser().then((user) => {
            this.setState({
                user,
            })
        });
    }

    showUserMenu = () => {
        this.setState({
            userMenuVisible: true,
        });
    };

    logOut = () => {
        this.usersData.signOut().then(() => {
            this.setState({
                goToLandingPage: true,
            });
        });
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

        if(this.state.goToLandingPage) {
            return <Redirect to='/'/>;
        }

        return (
            <Element name='welcome'>
                <header className='FormGiveHeader' onClick={this.hideUserMenu}>
                    <nav className='nav'>
                        {!this.state.user &&
                        <ul className='menu upperMenu'>
                            <li><button onClick={this.login} className='a'>Zaloguj</button></li>
                            <li><button onClick={this.createAccount} className='a'>Załóż konto</button></li>
                        </ul>
                        }
                        {this.state.user &&
                        <ul className='menu upperMenu'>
                            <li className='userName'><button className='a'>Witaj {this.state.user.name}</button></li>
                            <li id='settings'>
                                <button className='a'><i onClick={this.showUserMenu} className="fas fa-cog"/></button>
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