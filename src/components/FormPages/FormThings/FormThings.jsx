import React from 'react';

import './FormThings.scss'

export class FormThings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodClothesChecked: false,
            badClothesChecked: false,
            toysChecked: false,
            booksChecked: false,
            otherChecked: false,
        };
    }

    handleCheckboxChange = (e) => {
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

    next = () => {
        const {goodClothesChecked, badClothesChecked, toysChecked, booksChecked, otherChecked} = this.state;
        this.props.gift.giftType = goodClothesChecked && 'goodClothes, ' + badClothesChecked && 'badClothes, ' + toysChecked && 'toys, ' + booksChecked && 'books, ' + otherChecked && 'other';
        if(typeof this.props.changePage === 'function') {
            this.props.changePage('next');
        }

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
                <form name='things'>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='goodClothes' name='goodClothes' value='goodClothes' checked={this.state.checked}
                                   onChange={this.handleCheckboxChange}/>
                            <label htmlFor='goodClothes'></label>
                        </div>
                        <label htmlFor='goodClothes'>ubrania, które nadają się do ponownego użytku</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='badClothes' name='badClothes' value='badClothes' checked={this.state.checked}
                                   onChange={this.handleCheckboxChange}/>
                            <label htmlFor='badClothes'></label>
                        </div>
                        <label htmlFor='badClothes'>ubrania, do wyrzucenia</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='toys' name='toys' value='toys' checked={this.state.checked} onChange={this.handleCheckboxChange}/>
                            <label htmlFor='toys'></label>
                        </div>
                        <label htmlFor='toys'>zabawki</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='books' name='books' value='books' checked={this.state.checked} onChange={this.handleCheckboxChange}/>
                            <label htmlFor='books'></label>
                        </div>
                        <label htmlFor='books'>książki</label>
                    </div>
                    <div className='things__container'>
                        <div className='things__checkbox'>
                            <input type='checkbox' id='other' name='other' value='other' checked={this.state.checked} onChange={this.handleCheckboxChange}/>
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