import React from 'react';

import './InstitutionsList.scss';

class InstitutionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    changePage = (number) => {
        document.getElementById(`pageNumber${this.state.pageNumber}`).classList.remove('active');
        this.setState({
            pageNumber: number,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.institutions !== this.props.institutions) {

            const pageSpan = document.getElementById(`pageNumber${this.state.pageNumber}`);

            if(pageSpan !== null){
                pageSpan.classList.remove('active');
            }

            this.setState({
                pageNumber: 1,
            }, () => {
                document.getElementById(`pageNumber${this.state.pageNumber}`).classList.add('active');
            });
        } else {
            document.getElementById(`pageNumber${this.state.pageNumber}`).classList.add('active');
        }
    }

    render() {

        let institutions = this.props.institutions;
        let pagesNumber = Math.ceil(institutions.length / 3);

        let tab = [];

        for(let i = 0; i < pagesNumber; i++) {
            tab.push(i+1);
        }

        let pages = tab.map((number) => {
            return <span id={`pageNumber${number}`} key={number} onClick={() => this.changePage(number)}>{number}</span>;
        });

        let institutionsElements = [];

        for(let i = 3*(this.state.pageNumber - 1); i < Math.min(3*(this.state.pageNumber - 1) + 3, institutions.length); i++) {
            institutionsElements.push(
                <div key={i} className='institutionRow'>
                    <div className='institutionName'>
                        <h3>{institutions[i].name}</h3>
                        <p>{institutions[i].goal}</p>
                        <div className='line'></div>
                    </div>
                    <div className='institutionDescription'>
                        <p>{institutions[i].description}</p>
                        <div className='line'></div>
                    </div>
                </div>
            );
        }

        return (
            <div className='institutions'>
                <div className='institutions__list'>
                    {institutionsElements}
                </div>
                <div className='pageNumbers'>
                    {pages}
                </div>
            </div>
        );
    }
}

export default InstitutionsList;