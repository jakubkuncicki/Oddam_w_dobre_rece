import React from 'react';
import '../components/FourStepsColumn.scss';

class FourStepsColumn extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const icon = 'icon' + this.props.iconNumber;

        return (
            <div className='fourStepsColumn'>
                <div className='fourStepsColumn__container'>
                    <div className={icon}></div>
                    <span>{this.props.title}</span>
                </div>
                <span>{this.props.description}</span>
            </div>
        );
    }
}

export default FourStepsColumn;