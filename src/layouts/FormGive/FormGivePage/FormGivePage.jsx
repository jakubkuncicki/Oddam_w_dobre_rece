import React from 'react';
import {FormThings} from "../../../components/FormPages/FormThings/FormThings";
import {FormAmount} from "../../../components/FormPages/FormAmount/FormAmount";
import {FormInstitutionParameters} from "../../../components/FormPages/FormInstitutionParameters/FormInstitutionParameters";
import {FormInstitutionSelection} from "../../../components/FormPages/FormInstitutionSelection/FormInstitutionSelection";
import {FormAddress} from "../../../components/FormPages/FormAddress/FormAddress";
import {FormSummary} from "../../../components/FormPages/FormSummary/FormSummary";
import {FormLastPage} from "../../../components/FormPages/FormLastPage/FormLastPage";
import './FormGivePage.scss';
import {scroller} from "react-scroll/modules";
import {Element} from "react-scroll";

export class FormGivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            institutionsToShow: [],
        };
    }

    changePage = (nextOrPrevious) => {
        const pageNumber = this.state.pageNumber;
        if(nextOrPrevious === 'next') {
            this.setState({
                pageNumber: pageNumber + 1,
            }, () => {
                scroller.scrollTo('formGivePage', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                });
            });
        } else {
            this.setState({
                pageNumber: pageNumber - 1,
            }, () => {
                console.log('w change page previous, setstate callback scroll');
                scroller.scrollTo('formGivePage', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                });
            });
        }
    };

    passInstitutions = (institutionsToShow) => {
        this.setState({
            institutionsToShow,
        });
    };

    render() {

        console.log('render w FormGivePage, institutionsToShow', this.state.institutionsToShow);

        const pages = [
            <FormThings changePage={this.changePage}/>,
            <FormAmount changePage={this.changePage}/>,
            <FormInstitutionParameters passInstitutions={this.passInstitutions} changePage={this.changePage}/>,
            <FormInstitutionSelection institutionsToShow={this.state.institutionsToShow} changePage={this.changePage}/>,
            <FormAddress changePage={this.changePage}/>,
            <FormSummary changePage={this.changePage}/>,
            <FormLastPage changePage={this.changePage}/>
            ];

        let actualPage = pages[this.state.pageNumber];

        return (
            <Element name='formGivePage'>
            <section className='FormGivePage'>
                {actualPage}
            </section>
            </Element>
        );
    }
}