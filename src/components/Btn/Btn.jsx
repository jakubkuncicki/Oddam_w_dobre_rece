import React from 'react';

import './Btn.scss';

class Btn extends React.Component {

    goTo = () => {
        if(typeof this.props.goTo === 'function') {
            this.props.goTo();
        }
    };

    render() {
        let myStyle;
        if(this.props.specificWidth !== null) {
            myStyle = {
                width: this.props.specificWidth
            };
        } else {
            myStyle = {};
        }
        return <button onClick={this.goTo} className='Btn' style={myStyle}>{this.props.text}</button>;
    }
}

export default Btn;