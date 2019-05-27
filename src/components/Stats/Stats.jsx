import React from 'react';

import StatsColumn from '../StatsColumn/StatsColumn';

import './Stats.scss';

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.description1 = 'Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma.' +
            ' Aliquam erat volutpat.';
        this.description2 = 'Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma.' +
            ' Aliquam erat volutpat.';
        this.description3 = 'Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma.' +
            ' Aliquam erat volutpat.';

    }

    render() {

        const statsData = [];

        let {description1, description2, description3} = this;

        statsData.push({statName:'ODDANYCH WORKÓW', quantity:'10', statDescription: description1});
        statsData.push({statName:'WSPARTYCH ORGANIZACJI', quantity:'5', statDescription: description2});
        statsData.push({statName:'ZORGANIZOWANYCH ZBIÓREK', quantity:'7', statDescription: description3});

        const statsColumns = statsData.map((column) => {
            let {statName, quantity, statDescription} = column;
            return <StatsColumn key={statName} statName={statName} quantity={quantity} statDescription={statDescription}/>
        });

        return (
            <section className='stats'>
                {statsColumns}
            </section>
        );
    }
}

export default Stats;