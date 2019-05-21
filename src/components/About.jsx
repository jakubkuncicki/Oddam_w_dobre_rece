import React from 'react';
import '../components/About.scss';
import DecorationText from '../components/DecorationText';

class About extends React.Component {
    render() {
        return (
            <section className='about'>
                <div className='about__text'>
                    <DecorationText text1='O nas' text2=''/>
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