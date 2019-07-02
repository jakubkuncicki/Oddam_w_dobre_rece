import React from 'react';
import './FormAddress.scss';
import {UsersData} from "../../../services/usersData.service";

export class FormAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            street: '',
            city: '',
            postCode: '',
            tel: '',
            day: '',
            time: '',
            message: '',
        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                const {street, city, postCode, tel} = gift.address;
                const {day, time, message} = gift.date;

                this.setState({
                    street,
                    city,
                    postCode,
                    tel,
                    day,
                    time,
                    message,
                });
            }
        });
    }

    handleInputChange = (e) => {

        switch(e.target.id) {
            case 'street':
                this.setState({
                     street: e.target.value,
                });
                break;
            case 'city':
                this.setState({
                    city: e.target.value,
                });
                break;
            case 'post-code':
                this.setState({
                    postCode: e.target.value,
                });
                break;
            case 'tel':
                this.setState({
                    tel: e.target.value,
                });
                break;
            case 'date':
                this.setState({
                    day: e.target.value,
                });
                break;
            case 'time':
                this.setState({
                    time: e.target.value,
                });
                break;
            case 'message':
                this.setState({
                    message: e.target.value,
                });
                break;
            default:
                return;
        }
    };

    validate = (state) => {

        const {street, city, postCode, tel, day, time, message} = state;

        if(!(street && city && postCode && tel && day && time && message)) {
            alert('Wszystkie pola muszą być uzupełnione.');
            return false;
        }

        return true;
    };

    changePage = (nextOrPrevious) => {

        if(nextOrPrevious === 'next' && !this.validate(this.state)) {
            return;
        }

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                const {street, city, postCode, tel, day, time, message} = this.state;

                gift.address = {
                    street,
                    city,
                    postCode,
                    tel,
                };
                gift.date = {
                    day,
                    time,
                    message,
                };

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
            <div className='FormAddress'>
                <div className='FormAddress__info-bar'>
                    <h1 className='FormAddress__info-bar_text'>Ważne!</h1>
                    <p className='FormAddress__info-bar_text'>Podaj adres oraz termin odbioru rzeczy.</p>
                </div>
                <p className='FormAddress__step'>Krok 4/4</p>
                <h1 className='FormAddress__header'>Podaj adres oraz termin odbioru rzeczy przez kuriera</h1>
                <form className='FormAddress__form'>
                    <div className='FormAddress__form__container'>
                        <div className='FormAddress__form__container__address'>
                            <div className='header-container'>
                                <h3>Adres odbioru</h3>
                            </div>
                            <div  className='FormAddress__form__container__address__input-container'>
                                <label htmlFor='street'>Ulica</label>
                                <input id='street' name='street' type='text' value={this.state.street}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormAddress__form__container__address__input-container'>
                                <label htmlFor='city'>Miasto</label>
                                <input id='city' name='city' type='text' value={this.state.city}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormAddress__form__container__address__input-container'>
                                <label htmlFor='post-code'>Kod Pocztowy</label>
                                <input id='post-code' name='post-code' type='text' value={this.state.postCode}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormAddress__form__container__address__input-container'>
                                <label htmlFor='tel'>Numer telefonu</label>
                                <input id='tel' name='tel' type='tel' value={this.state.tel}
                                       onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className='FormAddress__form__container__date'>
                            <div className='header-container'>
                                <h3>Termin odbioru</h3>
                            </div>
                            <div  className='FormAddress__form__container__date__input-container'>
                                <label htmlFor='date'>Data</label>
                                <input id='date' name='date' type='date' value={this.state.day}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormAddress__form__container__date__input-container'>
                                <label htmlFor='time'>Godzina</label>
                                <input id='time' name='time' type='time' value={this.state.time}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormAddress__form__container__date__input-container'>
                                <label htmlFor='message'>Uwagi<p>dla kuriera</p></label>
                                <textarea id='message' name='message' value={this.state.message}
                                          onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className='FormAddress__form__btns'>
                        <button type='button' onClick={() => this.changePage('previous')}>Wstecz</button>
                        <input type='button' value='Dalej' onClick={() => this.changePage('next')}/>
                    </div>
                </form>
            </div>
        );
    }
}