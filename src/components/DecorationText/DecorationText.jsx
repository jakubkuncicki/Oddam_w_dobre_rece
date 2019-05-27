import React from 'react';

import './DecorationText.scss';

class DecorationText extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render() {

        const textLines = this.props.texts.map((text) => <h1 key={text}>{text}</h1>);

        return (
            <div className='decorationTextBox'>
                {textLines}
                <div className='decoration'></div>
            </div>
        );
    }
}

export default DecorationText;