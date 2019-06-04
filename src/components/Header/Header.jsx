import React from 'react';
import {Element} from 'react-scroll';

import DecorationText from '../DecorationText/DecorationText.jsx';
import Btn from '../Btn/Btn.jsx';

import './Header.scss';
import {withRouter} from "react-router-dom";
import {auth} from "../../constants/authentication";
import {Redirect} from "react-router-dom";

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userMenuVisible: false,
            goToGiveForm: false,
        };
    }

    scrollTo = (name) => {
        if(typeof this.props.scrollTo === 'function') {
            this.props.scrollTo(name);
        }
    };

    login = () => {
        this.props.history.push('/login');
    };

    createAccount = () => {
        this.props.history.push('/register');
    };

    give = () => {
        this.setState({
            goToGiveForm: true,
        });
        // this.props.history.push('/form');
        // return <Redirect to={{pathname: '/form', state: {user: this.props.user}}}/>;

    };

    collect = () => {
        this.props.history.push('/collect');
    };

    showUserMenu = () => {
        this.setState({
            userMenuVisible: true,
        });
    };

    hideUserMenu = (e) => {
        if(this.state.userMenuVisible && e.target.id !== 'userMenu') {
            this.setState({
                userMenuVisible: false,
            });
        }
    };

    logOut = () => {
        auth.signOut();
        this.props.history.push('/');
    };

    render() {

        if(this.state.goToGiveForm) {
            return <Redirect to={{pathname: '/form', state: {user: this.props.user}}}/>;
        }

        return (
            <Element name='welcome'>
            <div onClick={this.hideUserMenu} className='headerSection'>
                <header>
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
                </header>
                <div className='headerStart'>
                    <DecorationText texts={['Zacznij pomagać!', 'Oddaj niechciane rzeczy w zaufane ręce']}/>
                    <div className='StartBtns'>
                        <Btn goTo={this.give} text='ODDAJ RZECZY'/>
                        <Btn goTo={this.collect} text='ZORGANIZUJ ZBIÓRKĘ'/>
                    </div>
                </div>
            </div>
            </Element>
        );
    }
}

export default withRouter(Header);