import React from 'react';
import './App.css';
import {HashRouter as Router, Route, withRouter} from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import UserPage from "./Components/UserPage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <NavBar/>
                    </div>
                    <div>
                        <Route exact path='/' component={HomePage}>
                            <HomePage/>
                        </Route>
                        <Route exact path='/me' component={UserPage}>
                            <UserPage/>
                        </Route>
                        React App
                    </div>
                </div>
            </Router>
        )
    }
}

export default withRouter(App);
