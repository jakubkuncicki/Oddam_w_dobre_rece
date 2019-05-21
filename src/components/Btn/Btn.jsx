import React from 'react';
import './Btn.scss';

// A może flex-grow w obrębie kontenera?
// Sprawdź sobie flex-basis

class Btn extends React.Component {
    render() {
        let myStyle;
        if(this.props.specificWidth !== null) {
            myStyle = {
                width: this.props.specificWidth
            };
        } else {
            myStyle = {};
        }
        return <button style={myStyle}>{this.props.text}</button>;
    }
}

export default Btn;
