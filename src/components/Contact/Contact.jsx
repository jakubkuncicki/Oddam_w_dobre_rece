import React from 'react';
import {Element} from 'react-scroll';

import DecorationText from '../../components/DecorationText/DecorationText';

import './Contact.scss';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            nameErr: false,
            emailErr: false,
            messageErr: false,
            nameErrInf: '',
            emailErrInf: '',
            messageErrInf: '',
        };
    }

    changeInput = (e) => {
        switch (e.target.name) {
            case 'name':
                this.setState({
                    name: e.target.value,
                });
                break;
            case 'email':
                this.setState({
                    email: e.target.value,
                });
                break;
            case 'message':
                this.setState({
                    message: e.target.value,
                });
                break;
            default:
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                });
        }
    };

    validation = (e) => {

        let isError = 0;

        if(this.state.name === '') {
            this.setState({
                nameErr: true,
                nameErrInf: 'To pole jest wymagane',
            });
            isError++;
        } else {
            this.setState({
                nameErr: false,
            });
        }

        if(this.state.email === '') {
            this.setState({
                emailErr: true,
                emailErrInf: 'To pole jest wymagane',
            });
            isError++;
        } else if(this.state.email.indexOf('@') === -1) {
            this.setState({
                emailErr: true,
                emailErrInf: 'Niepoprawny adres email',
            });
            isError++;
        } else {
            this.setState({
                emailErr: false,
            });
        }

        if(this.state.message === '') {
            this.setState({
                messageErr: true,
                messageErrInf: 'To pole jest wymagane',
            });
            isError++;
        } else {
            this.setState({
                messageErr: false,
            });
        }

        if(isError > 0) {
            e.preventDefault();
        }
    };

    render() {
        return (
            <Element name='contact'>
            <section className='Contact'>
                <div className='Contact__main'>
                    <div className='Contact__main_box'>
                        <DecorationText texts={['Skontaktuj się z nami']}/>
                        <form className='Contact__main_form'>
                            <p>FORMULARZ KONTAKTOWY</p>
                            <div className='inputs_container'>
                                <div>
                                    <input type='text' name='name' placeholder='Imię' value={this.state.name} onChange={this.changeInput}/>
                                    {this.state.nameErr && <p className='error_info'>{this.state.nameErrInf}</p>}
                                </div>
                                <div>
                                    <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.changeInput}/>
                                    {this.state.emailErr && <p className='error_info'>{this.state.emailErrInf}</p>}
                                </div>
                            </div>
                            <div className='textarea_container'>
                                <input type='textarea' name='message' placeholder='Wiadomość' value={this.state.message} onChange={this.changeInput}/>
                                {this.state.messageErr && <p className='error_info'>{this.state.messageErrInf}</p>}
                            </div>
                            <div className='submit_container'>
                                <input type='submit' value='Wyślij' onClick={this.validation}/>
                            </div>
                        </form>
                    </div>
                </div>
                <footer className='Contact__footer'>
                    <p className='Contact__footer_text'>Copyright 2015 &copy; by Anna Dadej</p>
                    <div className='Contact__footer_icons'>
                        <i className="fab fa-facebook-f"/>
                        <i className="fas fa-camera-retro"/>
                    </div>
                </footer>
            </section>
            </Element>
        );
    }
}

export default Contact;