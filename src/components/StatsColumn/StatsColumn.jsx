import React from 'react';

import './StatsColumn.scss';

class StatsColumn extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
            <div className='stats__column'>
                <span>{this.props.quantity}</span>
                <h3>{this.props.statName}</h3>
                <p>{this.props.statDescription}</p>
            </div>
        );
    }
}

export default StatsColumn;