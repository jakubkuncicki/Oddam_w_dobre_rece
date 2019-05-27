import React from 'react';

import DecorationText from '../../components/DecorationText/DecorationText';

import './About.scss';

class About extends React.Component {
    render() {
        return (
            <section className='about'>
                <div className='about__text'>
                    <DecorationText texts={['O nas']}/>
                    <p>
                        Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.
                    </p>
                    <div className='signatureContainer'>
                        <div className='signature'></div>
                    </div>
                </div>
                <div className='aboutPicture'></div>
            </section>
        );
    }
}

export default About;