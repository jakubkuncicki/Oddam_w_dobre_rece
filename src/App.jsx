import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import {createHashHistory} from "history";

import {InstitutionsData} from "./services/institutions.service";

import './App.scss';
import {pageRoutes, sectionRoutes} from "./constants/routes";
import LandingPage from "./layouts/LandingPage/LandingPage";
import StartPage from "./layouts/StartPage/StartPage";
import {PrivateRoute} from "./components/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
import {UsersData} from "./services/usersData.service";

// const history = createHashHistory({basename: "/Oddam_w_dobre_rece"});

// export const institutions = new InstitutionsData();
InstitutionsData.instance.init();
UsersData.instance.init();

class App extends React.Component {

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    {
                        pageRoutes.map((page) => {
                            if(page.title === 'Form') {
                                return <PrivateRoute path={'/' + page.route} component={page.component} key={page.title}/>;
                            }
                            return <Route path={'/' + page.route} component={page.component} key={page.title}/>;
                        })
                    }
                    {
                        sectionRoutes.map((section) => {
                            return <Route path={'/' + section.route} component={LandingPage} key={section.title}/>
                        })
                    }
                    <PrivateRoute exact path='/start' component={StartPage}/>
                    {
                        sectionRoutes.map((section) => {
                            return <PrivateRoute path={'/start/' + section.route} component={StartPage} key={section.title}/>
                        })
                    }
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
