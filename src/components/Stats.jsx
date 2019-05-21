import React from 'react';
import StatsColumn from '../components/StatsColumn';
import '../components/Stats.scss';

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
        return (
            <section className='stats'>
                <StatsColumn statName='ODDANYCH WORKÓW' quantity='10' statDescription={this.description1}/>
                <StatsColumn statName='WSPARTYCH ORGANIZACJI' quantity='5' statDescription={this.description2}/>
                <StatsColumn statName='ZORGANIZOWANYCH ZBIÓREK' quantity='7' statDescription={this.description3}/>
            </section>
        );
    }
}

export default Stats;