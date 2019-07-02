import React from 'react';
import DecorationText from "../../components/DecorationText/DecorationText";
import {UsersData, validateEmail} from "../../services/usersData.service";
import {Redirect, withRouter} from "react-router-dom";
import './Register.scss';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeatedPassword: '',
            userChecked: false,
            emailError: '',
            nameError: '',
            passwordError: '',
            RepeatedPasswordError: '',
        };

        this.usersData = UsersData.instance;
    }

    goTo = (path) => {
        this.props.history.push('/' + path);
    };

    checkData = (e) => {
        console.log('submituje jednak');
        e.preventDefault();

        let isError = false;

        if(this.state.name === '') {
            this.setState({
                nameError: 'To pole jest wymagane',
            });
            isError = true;
        }

        if(this.state.email === '') {
            this.setState({
                emailError: 'To pole jest wymagane',
            });
            isError = true;
        } else if(!validateEmail(this.state.email)) {
            this.setState({
                emailError: 'Nieprawidłowy email',
            });
            isError = true;
        }

        if(this.state.password === '') {
            this.setState({
                passwordError: 'To pole jest wymagane',
            });
            isError = true;
        }

        if(this.state.repeatedPassword === '') {
            this.setState({
                RepeatedPasswordError: 'To pole jest wymagane',
            });
            isError = true;
        } else if(this.state.password === '') {
            this.setState({
                repeatedPasswordError: 'Aby powtórzyć hasło, najpierw musisz je podać :)',
            });
            isError = true;
        } else if(this.state.password !== this.state.repeatedPassword) {
            this.setState({
                repeatedPasswordError: 'Nieprawidłowe hasło',
            });
            isError = true;
        }

        if(!isError) {
            this.usersData.getUsers().then((users) => {
                for(let i = 0; i < users.length; i++) {
                    if(users[i].email === this.state.email) {
                        throw new Error('Nieprawidłowy email');
                    }
                }

                this.usersData.saveNewUser(this.state.name, this.state.email, this.state.password).then(() => {
                    this.setState({
                        userChecked: true,
                    });
                });

            });
        } else {
            return Promise.resolve(isError);
        }
    };

    changeInput = (e) => {
        if(e.target.name === 'email') {
            this.setState({
                email: e.target.value,
            });
        } else if(e.target.name === 'name') {
            this.setState({
                name: e.target.value,
            });
        } else if(e.target.name === 'password') {
            this.setState({
                password: e.target.value,
            });
        } else {
            this.setState({
                repeatedPassword: e.target.value,
            });
        }
    };

    render() {

        if(this.state.userChecked) {
            return <Redirect to={{pathname: '/start', state: {from: this.props.location}}}/>;
        }

        return (
            <section className='Register'>
                <div className='Register__container'>
                    <ul className='Register__nav-bar'>
                        <li><button className='Register__nav-bar_item' onClick={() => this.goTo('welcome')}>Start</button></li>
                        <li><button className='Register__nav-bar_item' onClick={() => this.goTo('fourSteps')}>O co chodzi?</button></li>
                        <li><button className='Register__nav-bar_item' onClick={() => this.goTo('about')}>O nas</button></li>
                        <li><button className='Register__nav-bar_item' onClick={() => this.goTo('institutions')}>Fundacje i organizacje</button></li>
                        <li><button className='Register__nav-bar_item' onClick={() => this.goTo('contact')}>Kontakt</button></li>
                    </ul>
                </div>
                <div className='Register__form-container'>
                    <DecorationText texts={['Zarejestruj się']}/>
                    <form onSubmit={this.checkData}>
                        <div className='input-container'>
                            <input name='name' type='text' placeholder='Imię' value={this.state.name} onChange={this.changeInput}/>
                        </div>
                        <div className='input-container'>
                            <input name='email' type='email' placeholder='Email' value={this.state.email} onChange={this.changeInput}/>
                            <p>{this.state.emailErr && this.state.emailErrInfo}</p>
                        </div>
                        <div className='input-container'>
                            <input name='password' type='password' placeholder='Hasło' value={this.state.password} onChange={this.changeInput}/>
                        </div>
                        <div className='input-container'>
                            <input name='Reapeted-password' type='password' placeholder='Powtórz hasło' value={this.state.repeatedPassword} onChange={this.changeInput}/>
                        </div>
                        <div className='btns-container'>
                            <button type='button' onClick={() => this.goTo('login')}>Zaloguj się</button>
                            <input type='submit' value='Zarejestruj się'/>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(Register);