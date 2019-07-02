import React from 'react';
import Contact from "../../components/Contact/Contact";
import {scroller} from "react-scroll/modules";
import {withRouter, Redirect} from "react-router-dom";
import FormGiveHeader from "./FormGiveHeader/FormGiveHeader";
import {FormGivePage} from "./FormGivePage/FormGivePage";
import {UsersData} from "../../services/usersData.service";

class FormGive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goToStartPage: false,
            sectionName: '',
        };
        this.usersData = UsersData.instance;
    }

    componentDidMount() {
        this.usersData.getCurrentGift().then((gift) => {
            if(!gift){
                this.usersData.setNewGift();
            }
        });
    }

    scrollTo = (name) => {
        if(['fourSteps','about','institutions'].indexOf(name) !== -1){
            // this.props.history.push('/start/' + name);
            this.setState({
                goToStartPage: true,
                sectionName: name,
            });
            // return <Redirect to={{pathname: '/start/' + name, state: {user: this.user}}}/>;
        } else {
            this.props.history.push('/form/' + name);
            scroller.scrollTo(name, {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
        }

    };

    render() {

        if(this.state.goToStartPage) {
            return <Redirect to={'/start/' + this.state.sectionName}/>;
        }

        return (
            <div>
                <FormGiveHeader scrollTo={this.scrollTo}/>
                <FormGivePage/>
                <Contact/>
            </div>
        );
    }
}

export default withRouter(FormGive);