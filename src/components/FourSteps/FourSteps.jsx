import React from 'react';
import { Element } from 'react-scroll';

import FourStepsColumn from '../FourStepsColumn/FourStepsColumn';
import Btn from '../Btn/Btn';
import DecorationText from "../DecorationText/DecorationText";

import './FourSteps.scss';

class FourSteps extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        const columnsData = [];
        columnsData.push({ iconNumber: '1', title: 'Wybierz rzeczy', description: 'ubrania, zabawki, sprzęt i inne' });
        columnsData.push({ iconNumber: '2', title: 'Spakuj je', description: 'skorzystaj z worków na śmieci' });
        columnsData.push({
            iconNumber: '3',
            title: 'Zdecyduj komu chcesz pomóc',
            description: 'wybierz zaufane miejsce'
        });
        columnsData.push({
            iconNumber: '4',
            title: 'Zamów kuriera',
            description: 'kurier przyjedzie w dogodnym terminie'
        });

        const fourStepsColumns = columnsData.map((column) => {
            let { iconNumber, title, description } = column;
            return <FourStepsColumn key={title} iconNumber={iconNumber} title={title} description={description}/>;
        });

        return (
            <Element className='fourSteps' name="testScroll">
                <DecorationText texts={['Wystarczą 4 proste kroki']}/>
                <div className='fourStepsCenter'>
                    {fourStepsColumns}
                </div>
                <Btn text='ZAŁÓŻ KONTO' specificWidth='21vw'/>
            </Element>
        );
    }
}

export default FourSteps;
