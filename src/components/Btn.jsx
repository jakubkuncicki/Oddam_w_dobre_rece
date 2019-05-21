import React from 'react';
import '../components/Btn.scss';

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