import React from 'react';
import '../components/DecorationText.scss';

class DecorationText extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='decorationTextBox'>
                <h1>{this.props.text1}</h1>
                {this.props.text2 !== '' && <h1>{this.props.text2}</h1>}
                <div className='decoration'></div>
            </div>
        );
    }
}

export default DecorationText;