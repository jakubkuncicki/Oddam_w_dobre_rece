import React from 'react';

import './About.scss';
import DecorationText from '../DecorationText';

class About extends React.Component {
    render() {
        return (
            <section className='About'>
                <div className='about__text'>
                    <DecorationText text1='O nas' text2=''/>  { /* text={['O nas']} */}
                    <p>
                        Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.
                    </p>
                    {/* Trzymaj się spójnych nazw stylów, np. about__signature-container i about__signature */}
                    <div className='signatureContainer'>
                        <div className='signature'></div>
                    </div>
                </div>

                {/* about__picture */}
                <div className='aboutPicture'></div>
            </section>
        );
    }
}

export default About;
