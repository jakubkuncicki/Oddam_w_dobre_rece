import React from 'react';
import './FormSummary.scss';
import {UsersData} from "../../../services/usersData.service";

export class FormSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            giftType: '',
            bagsNumber: 0,
            proteges: '',
            institutionName: '',
            street: '',
            city: '',
            postCode: '',
            tel: '',
            day: '',
            time: '',
            message: '',
            institutionText: '',

        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                const {giftType, bagsNumber, institution, address, date} = gift;
                const {name : institutionName, proteges} = institution;
                const {street, city, postCode, tel} = address;
                const {day, time, message} = date;

                let institutionText = '';

                const institutionWords = [['fundacja', 'Dla Fundacji'], ['organizacja', 'Dla Organizacji'], ['zbiórka', 'Dla Zbiórki']];

                for(let i = 0; i < 3; i++) {

                    if(institutionName.toLowerCase().indexOf(institutionWords[i][0]) !== -1) {

                        institutionText = institutionWords[i][1] + institutionName.slice(institutionWords[i][0].length);
                        break;
                    }
                }

                this.setState({
                    giftType,
                    bagsNumber,
                    proteges,
                    institutionName,
                    street,
                    city,
                    postCode,
                    tel,
                    day,
                    time,
                    message,
                    institutionText,
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

                if(nextOrPrevious === 'previous') {

                    this.usersData.savePartialGift(gift);
                } else {
                    this.usersData.saveGift(gift);
                }
            }
        }).then(() => {

            if (typeof this.props.changePage === 'function') {
                this.props.changePage(nextOrPrevious);
            }
        });
    };

    makeWord = (object, string) => {

        const types = Object.entries(object);
        let typeWord = '';
        let numberOfTypes = 0;

        for(let i = 0; i < string.length; i++) {
            if(string[i] === ',') {
                numberOfTypes++;
            }
        }

        let counter = 0;

        for(let i = 0; i < types.length; i++) {

            if(string.indexOf(types[i][0]) !== -1) {

                counter++;
                if(numberOfTypes > 1 && counter === numberOfTypes) {

                    typeWord += ' i ' + types[i][1];

                } else {

                    typeWord += typeWord === '' ? types[i][1] : ', ' + types[i][1];

                }
            }
        }

        return typeWord;
    };

    render() {

        let bagsWord = '';
        let giftTypeWords = {
            goodClothes: 'ubrań w dobrym stanie',
            badClothes: 'ubrań w złym stanie',
            toys: 'zabawek',
            books: 'książek',
            other: 'różnych rzeczy',
        };
        let protegesTypeWords = {
            singleMothers: 'samotnych matek',
            elderly: 'osób starszych',
            children: 'dzieci',
            disabled: 'niepełnosprawnych',
            homeless: 'bezdomnych',
        };

        if(this.state.bagsNumber === 1) {bagsWord = 'worek'}
        else if(this.state.bagsNumber === 5) {bagsWord = 'worków'}
        else {bagsWord = 'worki'}

        let giftWords = this.makeWord(giftTypeWords, this.state.giftType);
        let protegesWords = this.makeWord(protegesTypeWords, this.state.proteges);

        let giftText = this.state.bagsNumber + ' ' + bagsWord + ' ' + giftWords + ' dla ' + protegesWords;

        return (
            <div className='FormSummary'>
                <div className='FormSummary__info'>
                    <div className='FormSummary__info__container'>
                        <h1>Podsumowanie Twojej darowizny</h1>
                    </div>
                    <div className='FormSummary__info__container'>
                        <p>Oddajesz:</p>
                    </div>
                    <div className='FormSummary__info__container'>
                        <div className='FormSummary__info__container__img-bag'/>
                        <p className='FormSummary__info__container__gift'>
                            {giftText}
                        </p>
                    </div>
                    <div className='FormSummary__info__container'>
                        <div className='FormSummary__info__container__img-heart'/>
                        <p className='FormSummary__info__container__gift'>
                            {this.state.institutionText}
                        </p>
                    </div>
                </div>
                <form className='FormSummary__form'>
                    <div className='FormSummary__form__container'>
                        <div className='FormSummary__form__container__address'>
                            <div className='header-container'>
                                <h3>Adres odbioru</h3>
                            </div>
                            <div  className='FormSummary__form__container__address__input-container'>
                                <label htmlFor='street'>Ulica</label>
                                <input id='street' name='street' type='text' value={this.state.street}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormSummary__form__container__address__input-container'>
                                <label htmlFor='city'>Miasto</label>
                                <input id='city' name='city' type='text' value={this.state.city}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormSummary__form__container__address__input-container'>
                                <label htmlFor='post-code'>Kod Pocztowy</label>
                                <input id='post-code' name='post-code' type='text' value={this.state.postCode}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormSummary__form__container__address__input-container'>
                                <label htmlFor='tel'>Numer telefonu</label>
                                <input id='tel' name='tel' type='tel' value={this.state.tel}
                                       onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className='FormSummary__form__container__date'>
                            <div className='header-container'>
                                <h3>Termin odbioru</h3>
                            </div>
                            <div  className='FormSummary__form__container__date__input-container'>
                                <label htmlFor='date'>Data</label>
                                <input id='date' name='date' type='date' value={this.state.day}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormSummary__form__container__date__input-container'>
                                <label htmlFor='time'>Godzina</label>
                                <input id='time' name='time' type='time' value={this.state.time}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div  className='FormSummary__form__container__date__input-container'>
                                <label htmlFor='message'>Uwagi<p>dla kuriera</p></label>
                                <textarea id='message' name='message' value={this.state.message}
                                          onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className='FormSummary__form__btns'>
                        <button type='button' onClick={() => this.changePage('previous')}>Wstecz</button>
                        <input type='button' value='Potwierdzam' onClick={() => this.changePage('next')}/>
                    </div>
                </form>
            </div>
        );
    }
}