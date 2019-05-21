import React from 'react';
import '../components/Header.scss';
import DecorationText from '../components/DecorationText.jsx';
import Btn from './Btn/Btn.jsx';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='headerSection'>
                <header>
                    <nav className='nav'>
                        <ul className='menu upperMenu'>
                            <li><a>Zaloguj</a></li>
                            <li><a>Załóż konto</a></li>
                        </ul>
                        <ul className='menu'>
                            <li><a>Start</a></li>
                            <li><a>O co chodzi?</a></li>
                            <li><a>O nas</a></li>
                            <li><a>Fundacje i organizacje</a></li>
                            <li><a>Kontakt</a></li>
                        </ul>
                    </nav>
                </header>
                <div className='headerStart'>
                    <DecorationText text1='Zacznij pomagać!' text2='Oddaj niechciane rzeczy w zaufane ręce'/>
                    <div className='StartBtns'>
                        <Btn text='ODDAJ RZECZY'/>
                        <Btn text='ZORGANIZUJ ZBIÓRKĘ'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
