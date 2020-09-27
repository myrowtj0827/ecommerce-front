import React from 'react';
// import axios from "axios"

import { BrowserRouter, Route } from 'react-router-dom';

import SearchFilter from "./search/searchFilter";
import Home from "./home/home";


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="landing-body">
                    <switch>
                        <Route exact path="/" component={Home} key="home" />
                        <Route exact path="/searchFilter" component={SearchFilter} key="searchFilter" />
                    </switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
