import React from 'react';

import './FormThings.scss'
import {UsersData} from "../../../services/usersData.service";

export class FormThings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodClothesChecked: false,
            badClothesChecked: false,
            toysChecked: false,
            booksChecked: false,
            otherChecked: false,
            errorMessage: false,
        };

        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        this.usersData.getCurrentGift().then((gift) => {
            if(gift) {
                this.setState({
                    goodClothesChecked: (gift.giftType.indexOf('goodClothes') !== -1),
                    badClothesChecked: (gift.giftType.indexOf('badClothes') !== -1),
                    toysChecked: (gift.giftType.indexOf('toys') !== -1),
                    booksChecked: (gift.giftType.indexOf('books') !== -1),
                    otherChecked: (gift.giftType.indexOf('other') !== -1),
                });
            }
        });
    }

    handleCheckboxChange = (e) => {

        this.setState({
            errorMessage: false,
        });

        if(e.target.value === 'goodClothes') {
            this.setState({
                goodClothesChecked: e.target.checked,
            });
        }
        if(e.target.value === 'badClothes') {
            this.setState({
                badClothesChecked: e.target.checked,
            });
        }
        if(e.target.value === 'toys') {
            this.setState({
                toysChecked: e.target.checked,
            });
        }
        if(e.target.value === 'books') {
            this.setState({
                booksChecked: e.target.checked,
            });
        }
        if(e.target.value === 'other') {
            this.setState({
                otherChecked: e.target.checked,
            });
        }

    };

    makeGiftTypeString = () => {
        let giftTypeString = '';
        const types = ['goodClothes', 'badClothes', 'toys', 'books', 'other'];
        const checkedTypes = Object.values(this.state);
        for(let i = 0; i < checkedTypes.length; i++) {
            if(checkedTypes[i]) {
                giftTypeString += types[i] + ',';
            }
        }
        return giftTypeString;
    };

    next = () => {

        const type = this.makeGiftTypeString();

        if(type === '') {

            this.setState({
                errorMessage: true,
            });
            return;
        }

        this.usersData.getCurrentGift().then((gift) => {

            gift.giftType = type;

            this.usersData.savePartialGift(gift).then(() => {

                if(typeof this.props.changePage === 'function') {
                    this.props.changePage('next');
                }
            });

        });

    };

    render() {
        return (
            <div className='FormThings'>
                <div className='FormThings__info-bar'>
                    <h1 className='FormThings__info-bar_text'>Ważne!</h1>
                    <p className='FormThings__info-bar_text'>Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy wiedzieć komu najlepiej je przekazać.</p>
                </div>
                <p>Krok 1/4</p>
                <h1>Zaznacz, co chcesz oddać:</h1>
                <p className='error'>{this.state.errorMessage && 'Musisz zaznaczyć przynajmniej jedno pole.'}</p>
                <form name='things'>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='goodClothes' name='goodClothes' value='goodClothes' checked={this.state.goodClothesChecked}
                                   onChange={this.handleCheckboxChange}/>
                            <label htmlFor='goodClothes'></label>
                        </div>
                        <label htmlFor='goodClothes'>ubrania, które nadają się do ponownego użytku</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='badClothes' name='badClothes' value='badClothes' checked={this.state.badClothesChecked}
                                   onChange={this.handleCheckboxChange}/>
                            <label htmlFor='badClothes'></label>
                        </div>
                        <label htmlFor='badClothes'>ubrania, do wyrzucenia</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='toys' name='toys' value='toys' checked={this.state.toysChecked} onChange={this.handleCheckboxChange}/>
                            <label htmlFor='toys'></label>
                        </div>
                        <label htmlFor='toys'>zabawki</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='books' name='books' value='books' checked={this.state.booksChecked} onChange={this.handleCheckboxChange}/>
                            <label htmlFor='books'></label>
                        </div>
                        <label htmlFor='books'>książki</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='other' name='other' value='other' checked={this.state.otherChecked} onChange={this.handleCheckboxChange}/>
                            <label htmlFor='other'></label>
                        </div>
                        <label htmlFor='other'>inne</label>
                    </div>
                    <input type='button' value='Dalej' onClick={this.next}/>
                </form>
            </div>
        );
    }
}