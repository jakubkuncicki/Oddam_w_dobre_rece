import React from 'react';
import './FormLastPage.scss';

export class FormLastPage extends React.Component {
    render() {
        return (
            <div className='FormLastPage'>
                <div className='FormLastPage__container'>
                    <p className='FormLastPage__container__text-line'>Dziękujemy za przesłanie formularza.</p>
                    <p className='FormLastPage__container__text-line'>Na maila prześlemy wszelkie</p>
                    <p className='FormLastPage__container__text-line'>informacje o odbiorze.</p>
                    <div className='FormLastPage__container__decoration'></div>
                </div>
            </div>
        );
    }
}