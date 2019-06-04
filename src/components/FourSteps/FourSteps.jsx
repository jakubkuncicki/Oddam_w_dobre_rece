import React from 'react';
import {Element} from 'react-scroll';

import FourStepsColumn from '../FourStepsColumn/FourStepsColumn';
import Btn from '../Btn/Btn';
import DecorationText from "../DecorationText/DecorationText";

import './FourSteps.scss';
import {withRouter} from "react-router-dom";

class FourSteps extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    createAccount = () => {
        this.props.history.push('/register');
    };

    render() {

        const columnsData = [];
        columnsData.push({iconNumber:'1', title:'Wybierz rzeczy', description:'ubrania, zabawki, sprzęt i inne'});
        columnsData.push({iconNumber:'2', title:'Spakuj je', description:'skorzystaj z worków na śmieci'});
        columnsData.push({iconNumber:'3', title:'Zdecyduj komu chcesz pomóc', description:'wybierz zaufane miejsce'});
        columnsData.push({iconNumber:'4', title:'Zamów kuriera', description:'kurier przyjedzie w dogodnym terminie'});

        const fourStepsColumns = columnsData.map((column) => {
            let {iconNumber, title, description} = column;
            return <FourStepsColumn key={title} iconNumber={iconNumber} title={title} description={description}/>;
        });

        return (
            <Element name='fourSteps'>
            <section className='fourSteps'>
                <DecorationText texts={['Wystarczą 4 proste kroki']}/>
                <div className='fourStepsCenter'>
                    {fourStepsColumns}
                </div>
                {!this.props.logged &&
                < Btn goTo={this.createAccount} text='ZAŁÓŻ KONTO' specificWidth='21vw'/>
                }
            </section>
            </Element>
        );
    }
}

export default withRouter(FourSteps);