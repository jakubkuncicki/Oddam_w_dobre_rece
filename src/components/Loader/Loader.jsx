import React from 'react';
import './Loader.scss';

export class Loader extends React.Component {
    render() {
        return(
            <div className='Loader'>
                <h1 className='Loader__text'>Ładowanie...</h1>
            </div>
        );
    }
}