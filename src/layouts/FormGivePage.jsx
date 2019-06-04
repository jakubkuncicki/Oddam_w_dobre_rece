import React from 'react';
import {FormThings} from "../components/FormPages/FormThings/FormThings";
import {FormAmount} from "../components/FormPages/FormAmount/FormAmount";
import {FormInstitutionParameters} from "../components/FormPages/FormInstitutionParameters/FormInstitutionParameters";
import {FormInstitutionSelection} from "../components/FormPages/FormInstitutionSelection/FormInstitutionSelection";
import {FormAddress} from "../components/FormPages/FormAddress/FormAddress";
import {FormSummary} from "../components/FormPages/FormSummary/FormSummary";
import {FormLastPage} from "../components/FormPages/FormLastPage/FormLastPage";
import './FormGivePage.scss';

export class FormGivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
        };
    }

    changePage = (nextOrPrevious) => {
        const pageNumber = this.state.pageNumber;
        if(nextOrPrevious === 'next') {
            this.setState({
                pageNumber: pageNumber + 1,
            });
        } else {
            this.setState({
                pageNumber: pageNumber - 1,
            });
        }
    };

    render() {

        const user = this.props.user, gift = this.props.gift;

        const pages = [
            <FormThings user={user} gift={gift} changePage={this.changePage}/>,
            <FormAmount user={user} gift={gift} changePage={this.changePage}/>,
            <FormInstitutionParameters user={user} gift={gift} changePage={this.changePage}/>,
            <FormInstitutionSelection user={user} gift={gift} changePage={this.changePage}/>,
            <FormAddress user={user} gift={gift} changePage={this.changePage}/>,
            <FormSummary user={user} gift={gift} changePage={this.changePage}/>,
            <FormLastPage user={user} gift={gift} changePage={this.changePage}/>
            ];

        let actualPage = pages[this.state.pageNumber];

        return (
            <section className='FormGivePage'>
                {actualPage}
            </section>
        );
    }
}