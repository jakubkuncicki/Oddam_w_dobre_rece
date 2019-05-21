import React from 'react';
import FourStepsColumn from '../components/FourStepsColumn';
import '../components/FourSteps.scss';
import Btn from './Btn/Btn';
import DecorationText from "./DecorationText";

class FourSteps extends React.Component {
    render() {
        /**
         * Zastanów się, jak tu użyć map-a :)
         * const columnData = [{}, {}, {}, {}];
         * columnData.map();
         */
        return (
            <section className='fourSteps'>
                <DecorationText text1='Wystarczą 4 proste kroki' text2=''/>
                <div className='fourStepsCenter'>
                    <FourStepsColumn iconNumber='1' title='Wybierz rzeczy' description='ubrania, zabawki, sprzęt i inne'/>
                    <FourStepsColumn iconNumber='2' title='Spakuj je' description='skorzystaj z worków na śmieci'/>
                    <FourStepsColumn iconNumber='3' title='Zdecyduj komu chcesz pomóc' description='wybierz zaufane miejsce'/>
                    <FourStepsColumn iconNumber='4' title='Zamów kuriera' description='kurier przyjedzie w dogodnym terminie'/>
                </div>
                <Btn text='ZAŁÓŻ KONTO' specificWidth='21vw'/>
            </section>
        );
    }
}

export default FourSteps;
