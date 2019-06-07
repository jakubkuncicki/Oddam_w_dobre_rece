import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import DecorationText from "../components/DecorationText/DecorationText";
import { INVALID_USERNAME_PASSWORD, UsersData, validateEmail } from "../services/usersData.service";
import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErr: false,
            passwordErr: false,
            emailErrInfo: '',
            passwordErrInfo: '',
            user: {},
            userLoggedIn: false,
        };
        this.users = [];

        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        UsersData.instance.getUsers().then((result) => {
            this.users = result;
        });
    }

    goTo = (path) => {
        this.props.history.push('/' + path);
    };

    changeInput = (e) => {
        if(e.target.name === 'email') {
            this.setState({
                email: e.target.value,
            });
        } else {
            this.setState({
                password: e.target.value,
            });
        }
    };

    checkUserAndLogin() {
        let isErr = false;

        if (this.state.email === ''){
            this.setState({
                emailErr: true,
                emailErrInfo: 'To pole jest wymagane',
            });
            isErr = true;
        } else if(!validateEmail(this.state.email)) {
            this.setState({
                emailErr: true,
                emailErrInfo: 'Niepoprawny zapis adresu email'
            });
            isErr = true;
        } else {
            this.setState({
                emailErr: false,
            });
        }

        if (this.state.password === '') {
            this.setState({
                passwordErr: true,
                passwordErrInfo: 'To pole jest wymagane',
            });
            isErr = true;
        } else {
            this.setState({
                passwordErr: false,
            });
        }

        if (!isErr) {
            return this.usersData.signIn(this.state.email, this.state.password).then(() => {
                return false;
            }).catch((err) => {
                if (err.message === INVALID_USERNAME_PASSWORD) {
                    this.setState({
                        emailErr: true,
                        emailErrInfo: 'Nieprawidłowe hasło lub email',
                        passwordErr: true,
                        passwordErrInfo: 'Nieprawidłowe hasło lub email'
                    });

                    return true;
                } else {
                    //  Tu będzie generyczny błąd
                    // this.setState({
                    //     emailErr: true,
                    //     emailErrInfo: 'Nieprawidłowe hasło lub email',
                    //     passwordErr: true,
                    //     passwordErrInfo: 'Nieprawidłowe hasło lub email'
                    // });

                    return true;
                }
            });

            // if (UsersData.instance.hasUserAccount(this.state.email, this.state.password, this.users)) {
            //     auth.signIn();
            //     this.setState({
            //         emailErr: false,
            //         passwordErr: false,
            //     });
            // } else {
            //     e.preventDefault();
            //     this.setState({
            //         emailErr: true,
            //         emailErrInfo: 'Nieprawidłowe hasło lub email',
            //         passwordErr: true,
            //         passwordErrInfo: 'Nieprawidłowe hasło lub email'
            //     });
            // }

        } else {
            return Promise.resolve(isErr);
        }
    };

    checkLogin = (e) => {
        e.preventDefault();

        return this.checkUserAndLogin().then((errored) => {
           if (!errored) {
               this.setState({
                   userLoggedIn: true,
               });
           }
        });
    };

    render() {
        if (this.state.userLoggedIn) {
            if (this.props.location && this.props.location.state && this.props.location.state.from) {
                return <Redirect to={this.props.location.state.from.pathname}/>;
            }

            return <Redirect to='/start'/>;
        }

        return (
            <section className='Login'>
                <div className='nav-bar__container'>
                    <ul className='Login__nav-bar'>
                        <li><button className='Login__nav-bar_item' onClick={() => this.goTo('welcome')}>Start</button></li>
                        <li><button className='Login__nav-bar_item' onClick={() => this.goTo('fourSteps')}>O co chodzi?</button></li>
                        <li><button className='Login__nav-bar_item' onClick={() => this.goTo('about')}>O nas</button></li>
                        <li><button className='Login__nav-bar_item' onClick={() => this.goTo('institutions')}>Fundacje i organizacje</button></li>
                        <li><button className='Login__nav-bar_item' onClick={() => this.goTo('contact')}>Kontakt</button></li>
                    </ul>
                </div>
                <div className='Login__form-container'>
                    <DecorationText texts={['Zaloguj się']}/>
                    <form onSubmit={this.checkLogin}>
                        <div className='input-container'>
                            <input name='email' type='email' placeholder='Email' value={this.state.email} onChange={this.changeInput}/>
                            <p>{this.state.emailErr && this.state.emailErrInfo}</p>
                        </div>
                        <div className='input-container'>
                            <input name='password' type='password' placeholder='Hasło' value={this.state.password} onChange={this.changeInput}/>
                            <div className='info-container'>
                                <p>{this.state.passwordErr && this.state.passwordErrInfo}</p>
                                <p>Przypomnij hasło</p>
                            </div>
                        </div>
                        <div className='btns-container'>
                            <button>Załóż konto</button>
                            <input type='submit' value='Zaloguj się'/>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(Login);
