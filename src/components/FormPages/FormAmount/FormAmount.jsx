import React from 'react';

import './FormAmount.scss'
import {UsersData} from "../../../services/usersData.service";

export class FormAmount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            errorMessage: false,
        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        this.usersData.getCurrentGift().then((gift) => {
            this.setState({
                quantity: gift.bagsNumber,
            });
        });
    }

    next = () => {

        if(this.state.quantity === 0) {
            this.setState({
                errorMessage: true,
            });
            return;
        }

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                gift.bagsNumber = this.state.quantity;

                this.usersData.savePartialGift(gift).then(() => {

                    if (typeof this.props.changePage === 'function') {
                        this.props.changePage('next');
                    }
                });
            }

        });
    };

    previous = () => {

        this.usersData.getCurrentGift().then((gift) => {

            if(gift) {

                gift.bagsNumber = this.state.quantity;

                this.usersData.savePartialGift(gift).then(() => {

                    if (typeof this.props.changePage === 'function') {
                        this.props.changePage('previous');
                    }
                });
            }

        });
    };

    handleSelectChange = (e) => {
        this.setState({
            errorMessage: false,
            quantity: Number(e.target.value),
        });
    };

    render() {
        return (
            <div className='FormAmount'>
                <div className='FormAmount__info-bar'>
                    <h1 className='FormAmount__info-bar_text'>Ważne!</h1>
                    <p className='FormAmount__info-bar_text'>Wszystkie rzeczy do oddania zapakuj w 60 l worki.  Dokładną instrukcję jak poprawnie spakować rzeczy znajdziesz <button>TUTAJ</button></p>
                </div>
                <p>Krok 2/4</p>
                <p className='error'>{this.state.errorMessage && 'Musisz wybrać liczbę worków.'}</p>
                <h1>Podaj liczbę 60 l worków, w które spakowałeś/aś rzeczy:</h1>
                <form name='amount'>
                    <label htmlFor='quantity'>Liczba 60l worków:</label>
                    <select name='quantity' id='quantity' onChange={this.handleSelectChange} value={String(this.state.quantity)}>
                        <option value='0'>- wybierz -</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    <div className='FormAmount__btns'>
                        <button type='button' onClick={this.previous}>Wstecz</button>
                        <input type='button' value='Dalej' onClick={this.next}/>
                    </div>
                </form>
            </div>
        );
    }
}