import React from 'react';
import './App.css';
import {HashRouter as Router, Route, withRouter} from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import UserPage from "./Components/UserPage";
import LoginPage from "./Components/LoginPage";
import cookie from 'react-cookies'
import SignUpPage from "./Components/SignUpPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ''
        }
    }

    componentDidMount() {
        if (cookie.load('token')) {
            const token = cookie.load('token')
            console.log(token)
            fetch('/api/login?token=' + token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(username => {
                    this.setState({
                        currentUser: username,
                        userToken: cookie.load('token')
                    })
                })
                .catch(console.log)
        }
    }

    loginUserAPI = async (username, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        // console.log(response)
        if (response.ok) {
            const data = await response.json()
            const msg = data.msg
            // console.log("data = ", data)
            if (msg === 'valid') {
                const token = data.token
                cookie.save('token', token, {path: '/'})
                this.setState({
                    currentUser: username,
                    userToken: token
                })
            } else if (msg === 'incorrect') {
                alert("Incorrect username or password")
            } else if (msg === 'Some error') {
                alert("Some error occured")
            }
        } else {
            console.log("Could not login")
        }
    }

    logoutUser = () => {
        this.setState({
            currentUser: '',
            userToken: ''
        })
        cookie.remove('token')
    }

    signUpAndSetUsernameToken = (username,token)=>{
        cookie.save('token', token, {path: '/'})
        this.setState({
            currentUser: username,
            userToken: token
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <NavBar currentUser={this.state.currentUser} logoutUser={this.logoutUser}/>
                    </div>
                    <div>
                        <Route exact path='/' component={HomePage}>
                            <HomePage/>
                        </Route>
                        <Route exact path='/me' component={UserPage}>
                            <UserPage/>
                        </Route>
                        <Route exact path='/login' component={LoginPage}>
                            <LoginPage loginUserAPI={this.loginUserAPI}/>
                        </Route>
                        <Route exact path='/signup' component={SignUpPage}>
                            <SignUpPage signUpAndSetUsernameToken={this.signUpAndSetUsernameToken}/>
                        </Route>
                    </div>
                </div>
            </Router>
        )
    }
}

export default withRouter(App);
